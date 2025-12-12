import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function DairyBakeryPage() {
  const list = products.filter(p => p.category === "dairy-bakery");

  return (
    <section className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-1">Dairy & Bakery</h1>
      <p className="text-gray-600 mb-6">
        Milk, bread, butter & bakery items
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {list.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
