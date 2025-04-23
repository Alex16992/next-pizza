import React from "react";

import { Input } from "@/components/ui/input";
import { Title } from "./title";
import { RangeSlider } from "../ui/range-slider";
import { CheckboxGroup } from "./checkbox-group";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <CheckboxGroup
          title="Тип теста"
          className="border-y border-y-neutral-100 py-6"
          items={[
            { text: "Тонкое", value: "1" },
            { text: "Традиционное", value: "2" },
          ]}
        />

        <CheckboxGroup
          title="Размеры"
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
        />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={2000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={2000} placeholder="2000" />
        </div>

        <RangeSlider min={0} max={2000} step={10} value={[0, 500]} />
      </div>

      <CheckboxGroup
        title="Ингридиенты"
        className="mt-5"
        limit={5}
        items={[
          {
            text: "Сырный соус",
            value: "1",
          },
          {
            text: "Моццарелла",
            value: "2",
          },
          {
            text: "Чеснок",
            value: "3",
          },
          {
            text: "Солённые огурчики",
            value: "4",
          },
          {
            text: "Красный лук",
            value: "5",
          },
          {
            text: "Томаты",
            value: "6",
          },
          {
            text: "Сырный соус",
            value: "7",
          },
          {
            text: "Моццарелла",
            value: "8",
          },
          {
            text: "Чеснок",
            value: "9",
          },
          {
            text: "Солённые огурчики",
            value: "10",
          },
          {
            text: "Красный лук",
            value: "11",
          },
          {
            text: "Томаты",
            value: "12",
          },
        ]}
      />
    </div>
  );
};
