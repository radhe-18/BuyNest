"use client";

import { useCart } from "@/store/cart";

export default function QuantityButton({ id }: { id: number }) {
  const { increase, decrease } = useCart();

  return (
    <div className="flex items-center border rounded">
      <button
        onClick={() => decrease(id)}
        className="px-2 text-sm"
      >
        −
      </button>
      <span className="px-3 text-xs">Qty</span>
      <button
        onClick={() => increase(id)}
        className="px-2 text-sm"
      >
        +
      </button>
    </div>
  );
}
