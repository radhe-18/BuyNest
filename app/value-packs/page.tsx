import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";

export default function ValuePacksPage() {
  const packs = products.filter(
    (p) => p.isValuePack
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Value Packs</h1>
      <ProductGrid products={packs} />
    </div>
  );
}
