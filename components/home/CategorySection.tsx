import Link from "next/link";
import { Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

type Props = {
  title: string;
  slug: string;
  products: Product[];
};

export default function CategorySection({ title, slug, products }: Props) {
  if (!products.length) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <Link
          href={`/category/${slug}`}
          className="text-sm text-green-600 hover:text-green-700"
        >
          View all &gt;
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
