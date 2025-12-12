import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function GroceryStaplesPage() {
  const categoryProducts = products.filter(
    (p) => p.category === "grocery-staples"
  );

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-2">Grocery & Staples</h1>
      <p className="text-gray-600 mb-6">
        Daily essentials at best prices
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
