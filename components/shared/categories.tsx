import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface CategoriesProps {
  className?: string;
}

const cats = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
  "Десерты",
];
const activeIndex = 0;

export const Categories: FC<CategoriesProps> = ({ className }) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map((cat, index) => (
        <a
          href="#"
          className={cn(
            "flex item-center font-bold h-11 rounded-2xl py-2 px-6",
            activeIndex === index &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
        >
          <button>{cat}</button>
        </a>
      ))}
    </div>
  );
};
