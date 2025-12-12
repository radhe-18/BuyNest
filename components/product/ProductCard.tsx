"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/store/cart";
import QuantityButton from "./QuantityButton";

export default function ProductCard({ product }: { product: Product }) {
  const { add, items } = useCart();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <div className="bg-white border rounded-md p-3 flex flex-col">

      {/* ✅ CLICKABLE AREA */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-28 mb-2 cursor-pointer">
       <Image
  src={product.image}
  alt={product.name}
  fill
  className="object-contain"
  unoptimized
  priority={false}
/>

        </div>

        <div className="text-xs font-medium line-clamp-2">
          {product.name}
        </div>
        <div className="text-[11px] text-gray-500">{product.pack}</div>
      </Link>

      {/* PRICE */}
      <div className="flex gap-2 items-center mt-1">
        <span className="font-semibold text-sm">₹{product.price}</span>
        <span className="line-through text-xs text-gray-400">
          ₹{product.mrp}
        </span>
      </div>

      {/* CART ACTION */}
      {!inCart ? (
        <button
          onClick={() => add(product)}
          className="mt-2 border border-green-600 text-green-700 text-xs py-1 rounded hover:bg-green-50"
        >
          ADD
        </button>
      ) : (
        <div className="mt-2 flex justify-between items-center">
          <QuantityButton id={product.id} />
          <span className="text-xs text-gray-600">
            {inCart.qty} in cart
          </span>
        </div>
      )}
    </div>
  );
}
