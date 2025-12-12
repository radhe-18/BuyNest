"use client";

import Image from "next/image";
import { useCart } from "@/store/cart";
import QuantityButton from "@/components/product/QuantityButton";

export default function CartItem({ item }: any) {
  const { remove } = useCart();

  return (
    <div className="bg-white border rounded-md p-4 flex gap-4">

      <div className="relative h-20 w-20">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-medium">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.pack}</p>

        <div className="flex items-center justify-between mt-3">
          <QuantityButton id={item.id} />

          <button
            onClick={() => remove(item.id)}
            className="text-xs text-red-500"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right">
        <div className="font-semibold">₹{item.price * item.qty}</div>
        <div className="text-xs line-through text-gray-400">
          ₹{item.mrp * item.qty}
        </div>
      </div>
    </div>
  );
}
