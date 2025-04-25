import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useSet } from 'react-use';
import React, { useCallback, useEffect, useState, useRef } from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (values: string[]) => void;
  setSizes: (values: string[]) => void;
  setSelectedIngredients: (values: string[]) => void;
}

export const useFilters = (): ReturnProps => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Создаем начальные значения из URL параметров
  const initialIngredients = searchParams.get('ingredients')?.split(',').filter(Boolean) || [];
  const initialSizes = searchParams.has('sizes') ? searchParams.get('sizes')?.split(',').filter(Boolean) || [] : [];
  const initialPizzaTypes = searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',').filter(Boolean) || [] : [];

  const [selectedIngredients, setSelectedIngredientsState] = React.useState<Set<string>>(
    new Set<string>(initialIngredients)
  );

  const [sizes, setSizesState] = React.useState<Set<string>>(
    new Set<string>(initialSizes)
  );

  const [pizzaTypes, setPizzaTypesState] = React.useState<Set<string>>(
    new Set<string>(initialPizzaTypes)
  );

  const [prices, setPricesData] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  // Ссылка на текущий AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  // Функция для создания строки запроса
  const createQueryString = useCallback(
    (params: Record<string, any>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
          currentParams.delete(key);
        } else if (value instanceof Set) {
          const setValues = Array.from(value);
          if (setValues.length > 0) {
            currentParams.set(key, setValues.join(','));
          } else {
            currentParams.delete(key);
          }
        } else if (Array.isArray(value)) {
          if (value.length > 0) {
            currentParams.set(key, value.join(','));
          } else {
            currentParams.delete(key);
          }
        } else {
          currentParams.set(key, String(value));
        }
      });
      
      return currentParams.toString();
    },
    [searchParams]
  );

  const setPrices = useCallback(
    (name: keyof PriceProps, value: number) => {
      setPricesData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Отменяем предыдущий запрос, если он еще выполняется
      if (abortControllerRef.current) {
        abortControllerRef.current.abort('User started new interaction');
      }

      // Создаем новый AbortController для текущего запроса
      const newController = new AbortController();
      abortControllerRef.current = newController;

      // Подготовка данных для запроса
      const pizzaTypesArr = Array.from(pizzaTypes);
      const sizesArr = Array.from(sizes);
      const selectedIngredientsArr = Array.from(selectedIngredients);
      
      const updatedPrices = {
        ...prices,
        [name]: value
      };

      // Строим запрос с сигналом для возможной отмены
      router.push(
        `${pathname}?${createQueryString({
          priceFrom: updatedPrices.priceFrom,
          priceTo: updatedPrices.priceTo,
          pizzaTypes: pizzaTypesArr.length > 0 ? pizzaTypesArr : undefined,
          sizes: sizesArr.length > 0 ? sizesArr : undefined,
          ingredients: selectedIngredientsArr.length > 0 ? selectedIngredientsArr : undefined
        })}`,
        { 
          scroll: false 
        }
      );

      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          abortControllerRef.current = null;
        }
      };
    },
    [
      pathname,
      router,
      createQueryString,
      prices,
      pizzaTypes,
      sizes,
      selectedIngredients
    ]
  );

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  // Новые функции для обработки изменений фильтров
  const setPizzaTypes = (values: string[]) => {
    if (!values || values.length === 0) return;
    
    const newSet = new Set(pizzaTypes);
    values.forEach(value => {
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
    });
    
    setPizzaTypesState(newSet);
  };

  const setSizes = (values: string[]) => {
    if (!values || values.length === 0) return;
    
    const newSet = new Set(sizes);
    values.forEach(value => {
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
    });
    
    setSizesState(newSet);
  };

  const setSelectedIngredients = (values: string[]) => {
    if (!values || values.length === 0) return;
    
    const newSet = new Set(selectedIngredients);
    values.forEach(value => {
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
    });
    
    setSelectedIngredientsState(newSet);
  };

  return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices,
      setPizzaTypes,
      setSizes,
      setSelectedIngredients,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices, setPrices],
  );
};
