"use client";

import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import React, { FC } from "react";
import { Title } from "../title";

interface ChooseProductModalProps {
  className?: string;
  product: Product;
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({
  className,
  product,
}) => {
  return (
    <Dialog open={Boolean(product)}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] bg-white overflow-hidden",
          className
        )}
      >
        <Title text={product.name} size="md" />
      </DialogContent>
    </Dialog>
  );
};
