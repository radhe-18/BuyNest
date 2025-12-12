import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/data/products";

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
