export default async function ProductPage({ params }: any) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/products/slug/${slug}`,
    { cache: "no-store" }
  );

  const product = await res.json();

  if (!product?._id) {
    return (
      <div className="p-6 text-center text-xl text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md rounded-lg shadow"
      />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="mt-4 text-2xl font-bold text-green-600">
          ₹{product.price}
        </p>

        <p className="text-gray-400 mt-1">
          Category: {product.category?.name || "—"}
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full text-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
