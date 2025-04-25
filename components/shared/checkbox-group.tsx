"use client";

import * as motion from "motion/react-client";
import React, { FC, useEffect, useRef, useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { cn } from "@/lib/utils";

type Item = FilterChecboxProps;

interface CheckboxGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string[]) => void;
  selectedIds?: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  title,
  items,
  limit = 5,
  loading,
  searchInputPlaceholder = "Поиск...",
  className,
  onClickCheckbox,
  name,
  selectedIds,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (value: string) => {
    onClickCheckbox?.([value]);
  };

  useEffect(() => {
    if (!showAll && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [showAll]);

  // Process items outside of conditional rendering
  const list = loading
    ? []
    : showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : items.slice(0, items.length);

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <div className="flex" key={index}>
              <Skeleton className="w-9 h-8 mb-2 mr-2" />
              <Skeleton className="w-full h-8 mb-2" />
            </div>
          ))}
        <Skeleton className="w-32 h-6 mb-2 mr-2" />
      </div>
    );
  }

  return (
    <div className={className}>
      {showAll && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { visualDuration: 0.4 },
          }}
        >
          <div className="mb-5">
            <Input
              onChange={(e) => onChangeSearchInput(e.target.value)}
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
              value={searchValue}
            />
          </div>
        </motion.div>
      )}
      <p className="font-bold mb-3">{title}</p>

      <div
        ref={containerRef}
        className={cn(
          `flex flex-col gap-2 pr-2 overflow-hidden scrollbar transition-all duration-300`,
          showAll && "max-h-90 overflow-auto"
        )}
        style={{ maxHeight: showAll ? `320px` : `${limit * 40}px` }}
      >
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedIds ? selectedIds.has(item.value) : false}
            onCheckedChange={() => handleCheckboxChange(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > 6 && (
        <div>
          <button onClick={() => setShowAll(!showAll)} className="text-primary">
            {showAll ? "- Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
