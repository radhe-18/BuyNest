import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { Product } from "@/data/products";

type Props = {
  title: string;
  slug: string;
  products: Product[];
};

export default function Section({ title, slug, products }: Props) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-semibold">
          {title}
        </h2>

        {/* FIXED: same route as top navbar */}
        <Link
          href={`/${slug}`}
          className="text-[11px] text-green-700 font-medium hover:underline"
        >
          View all &gt;
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
