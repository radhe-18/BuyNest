import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function SnacksPage() {
  const list = products.filter(p => p.category === "snacks-branded");

  return (
    <section className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-1">Snacks & Branded Foods</h1>
      <p className="text-gray-600 mb-6">
        Snacks, biscuits & instant foods
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {list.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
