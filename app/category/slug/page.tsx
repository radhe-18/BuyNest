import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({ params }: Props) {
  const categoryProducts = products.filter(
    (p) => p.category === params.slug
  );

  if (categoryProducts.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">No products found</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {params.slug.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
async function getCategoryProducts(slug: string) {
  const base = process.env.NEXT_PUBLIC_API;
  const res = await fetch(`${base}/api/products?category=${slug}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function CategoryPage({ params }) {
  const products = await getCategoryProducts(params.slug);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {params.slug.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
