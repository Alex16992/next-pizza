import { Container, Filters, Title } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">Список товаров</div>
            <ProductsGroupList
              title="Пиццы"
              categoryId={1}
              items={[
                {
                  id: 1,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 2,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 3,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 4,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 5,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
              ]}
            />
            <ProductsGroupList
              title="Комбо"
              categoryId={2}
              items={[
                {
                  id: 1,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 2,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 3,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 4,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
                {
                  id: 5,
                  name: "Дачная",
                  price: 390,
                  imageUrl:
                    "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
