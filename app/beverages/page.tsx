import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function BeveragesPage() {
  const list = products.filter(p => p.category === "beverages");

  return (
    <section className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-1">Beverages</h1>
      <p className="text-gray-600 mb-6">
        Refreshing drinks & healthy beverages
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {list.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
