"use client";

import * as motion from "motion/react-client";
import React, { FC, useEffect, useRef } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { cn } from "@/lib/utils";

type Item = FilterChecboxProps;

interface CheckboxGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  onChange,
  defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : items.slice(0, items.length);

  const containerRef = useRef<HTMLDivElement>(null);

  // Сброс прокрутки
  useEffect(() => {
    if (!showAll && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [showAll]);

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
          `flex flex-col gap-4 pr-2 overflow-hidden scrollbar transition-all duration-300`,
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
            checked={false}
          />
        ))}
        {list.length === 0 && <p>Ничего не найдено</p>}
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
