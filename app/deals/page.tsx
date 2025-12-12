import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";

export default function DealsPage() {
  const deals = products.filter(
    (p) => p.mrp - p.price >= 50
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Deals</h1>
      <ProductGrid products={deals} />
    </div>
  );
}
