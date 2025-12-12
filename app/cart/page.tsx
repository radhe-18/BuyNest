"use client";

import { useCart } from "@/store/cart";

export default function CartPage() {
 const items = useCart((s) => s.items);
const increase = useCart((s) => s.increase);
const decrease = useCart((s) => s.decrease);
const remove = useCart((s) => s.remove);
const totalAmount = useCart((s) => s.totalAmount);


  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-sm">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-lg font-semibold mb-4">
        Shopping Cart
      </h1>

      <div className="bg-white border rounded-md">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center px-4 py-3 border-b text-sm"
          >
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">
                {item.pack}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => decrease(item.id)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => increase(item.id)}>+</button>
            </div>

            <div className="font-medium">
              ₹{item.qty * item.price}
            </div>

            <button
              onClick={() => remove(item.id)}
              className="text-xs text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right font-semibold">
        Total: ₹{totalAmount()}
      </div>

      <button className="mt-4 px-6 py-2 bg-green-600 text-white text-sm rounded">
        Proceed to Checkout
      </button>
    </div>
  );
}
