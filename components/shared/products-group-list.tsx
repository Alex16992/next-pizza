"use client";

import React, { FC } from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store/category";
import { cn } from "@/lib/utils";

interface ProductsGroupListProps {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: FC<ProductsGroupListProps> = ({
  title,
  items,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div
      className={cn("scroll-mt-30", className)}
      id={title}
      ref={intersectionRef}
    >
      <Title text={title} size="md" className="font-bold mb-5" />
      <div className="grid grid-cols-3 gap-[50px] mb-14">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
