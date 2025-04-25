import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link
        href={`/product/${id}`}
        scroll={false}
        className="flex flex-col h-full"
      >
        <div className="flex justify-center p-6 bg-secondary/20 rounded-lg h-[260px]">
          <Image width={215} height={215} src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
          альфредо, чеснок
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-[20px] mt-4">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="mt-4">
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
