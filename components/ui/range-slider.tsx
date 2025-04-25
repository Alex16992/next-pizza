"use client";

import React, { useCallback } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
  debounceTime?: number;
};

const RangeSlider = React.memo(
  React.forwardRef(
    (
      {
        className,
        min,
        max,
        step,
        formatLabel,
        value,
        onValueChange,
        debounceTime = 300,
        ...props
      }: SliderProps,
      ref
    ) => {
      // Внешние значения (из пропсов)
      const externalValue = React.useMemo(
        () => (Array.isArray(value) ? value : [min, max]),
        [value, min, max]
      );

      // Локальное состояние для мгновенного отображения при перемещении
      const [localValues, setLocalValues] = React.useState(externalValue);

      // Флаг для отслеживания, зажата ли кнопка мыши
      const isDraggingRef = React.useRef(false);

      // Сохраняем последние изменённые значения для отправки при отпускании мыши
      const lastValuesRef = React.useRef(externalValue);

      // Ссылка на функцию cleanup от предыдущего onValueChange вызова
      const cleanupRef = React.useRef<(() => void) | null>(null);

      // Обновляем локальное состояние, когда внешние значения изменились
      // но только если мы не находимся в процессе перетаскивания
      React.useEffect(() => {
        if (!isDraggingRef.current) {
          setLocalValues(externalValue);
          lastValuesRef.current = externalValue;
        }
      }, [externalValue]);

      // Обработчик изменения значения при перетаскивании
      const handleValueChange = useCallback(
        (newValues: number[]) => {
          // Немедленно обновляем локальное состояние для визуальной отзывчивости
          setLocalValues(newValues);
          // Сохраняем последние значения
          lastValuesRef.current = newValues;

          // Отправляем изменения, только если не в процессе перетаскивания
          // (т.е. если изменение пришло не от пользовательского перетаскивания)
          if (!isDraggingRef.current && onValueChange) {
            // Очищаем предыдущий запрос если он был
            if (cleanupRef.current) {
              cleanupRef.current();
              cleanupRef.current = null;
            }

            const cleanup = onValueChange(newValues);
            if (typeof cleanup === "function") {
              cleanupRef.current = cleanup;
            }
          }
        },
        [onValueChange]
      );

      // Обработчик нажатия кнопки мыши
      const handlePointerDown = useCallback(() => {
        // Отменяем предыдущий запрос при начале нового перемещения
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }
        isDraggingRef.current = true;
      }, []);

      // Обработчик отпускания кнопки мыши
      const handlePointerUp = useCallback(() => {
        // Если была нажата кнопка мыши и были изменения
        if (isDraggingRef.current && onValueChange) {
          // Отменяем предыдущий запрос если он был
          if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
          }

          // Отправляем последние значения и сохраняем возвращаемую функцию очистки
          const cleanup = onValueChange(lastValuesRef.current);
          if (typeof cleanup === "function") {
            cleanupRef.current = cleanup;
          }

          // Сбрасываем флаг перетаскивания
          isDraggingRef.current = false;
        }
      }, [onValueChange]);

      // Очистка при размонтировании
      React.useEffect(() => {
        return () => {
          if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
          }
        };
      }, []);

      return (
        <SliderPrimitive.Root
          ref={ref as React.RefObject<HTMLDivElement>}
          min={min}
          max={max}
          step={step}
          value={localValues}
          onValueChange={handleValueChange}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className={cn(
            "relative flex w-full touch-none select-none mb-6 items-center",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {localValues.map((value, index) => (
            <React.Fragment key={index}>
              <div
                className="absolute text-center"
                style={{
                  left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
                  top: `10px`,
                }}
              >
                <span className="text-sm">
                  {formatLabel ? formatLabel(value) : value}
                </span>
              </div>
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:h-5 hover:w-5 cursor-pointer duration-200 active:bg-primary" />
            </React.Fragment>
          ))}
        </SliderPrimitive.Root>
      );
    }
  )
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
