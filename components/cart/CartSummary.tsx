"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartSummary() {
  const { items } = useCart();

  const totalMRP = items.reduce((a, i) => a + i.mrp * i.qty, 0);
  const totalPrice = items.reduce((a, i) => a + i.price * i.qty, 0);
  const savings = totalMRP - totalPrice;

  return (
    <div className="bg-white border rounded-md p-4 sticky top-20 h-fit">
      <h3 className="font-semibold mb-4">Price Details</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>You Save</span>
          <span>- ₹{savings}</span>
        </div>

        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block mt-4 bg-green-600 text-white text-center py-2 rounded"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
