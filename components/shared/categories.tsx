"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import { motion } from "framer-motion";
import React, { FC, useRef } from "react";

interface CategoriesProps {
  items: Category[];
  className?: string;
}

export const Categories: FC<CategoriesProps> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
        className
      )}
    >
      {items.map(({ name, id }) => {
        const isActive = categoryActiveId === id;

        return (
          <a key={id} href={`#${name}`}>
            <div className="relative">
              {categoryActiveId === id && (
                <motion.div
                  layoutId="category-highlight"
                  className="absolute inset-0 z-0 bg-white shadow-md shadow-gray-200 rounded-2xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <button
                className={cn(
                  "relative z-10 flex cursor-pointer items-center font-bold h-11 rounded-2xl py-2 px-6 transition-colors",
                  isActive ? "text-primary" : "text-gray-500"
                )}
              >
                {name}
              </button>
            </div>
          </a>
        );
      })}
    </div>
  );
};
