"use client";

import { useCart } from "@/store/cart";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Link from "next/link";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link href="/" className="text-green-600 mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT: ITEMS */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* RIGHT: SUMMARY */}
      <CartSummary />

    </div>
  );
}
