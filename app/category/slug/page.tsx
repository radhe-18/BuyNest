import ProductCard from "@/components/product/ProductCard";

type Props = {
  params: {
    slug: string;
  };
};

async function getCategoryProducts(slug: string) {
  const base = process.env.NEXT_PUBLIC_API;

  try {
    const res = await fetch(`${base}/api/products?category=${slug}`, {
      cache: "no-store",
    });

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {
  const products = await getCategoryProducts(params.slug);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">No products found</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {params?.slug?.replace?.("-", " ") ?? ""}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
