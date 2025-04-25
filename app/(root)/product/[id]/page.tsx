import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const { id } = params;
  return <div>Страница товара: {id}</div>;
}
