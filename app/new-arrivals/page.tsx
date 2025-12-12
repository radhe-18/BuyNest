import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";

export default function NewArrivalsPage() {
  const latest = products.slice(-8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">New Arrivals</h1>
      <ProductGrid products={latest} />
    </div>
  );
}
