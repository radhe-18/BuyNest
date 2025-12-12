"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  amount: number;
  status: string;
  items: {
    id: number;
    title: string;
    qty: number;
    price: number;
    image: string;
  }[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Dummy sample orders — you can replace with API call
    setOrders([
      {
        id: "ORD-987654",
        date: "10 Dec 2025",
        amount: 560,
        status: "Delivered",
        items: [
          {
            id: 1,
            title: "Grocery Item 3",
            qty: 2,
            price: 120,
            image: "/products/grocery/item3.webp",
          },
          {
            id: 2,
            title: "Fruit / Vegetable 5",
            qty: 1,
            price: 80,
            image: "/products/fruits-vegetables/item5.webp",
          },
        ],
      },
      {
        id: "ORD-765432",
        date: "08 Dec 2025",
        amount: 310,
        status: "Shipped",
        items: [
          {
            id: 5,
            title: "Beverage Pack 2",
            qty: 3,
            price: 90,
            image: "/products/beverages/item2.webp",
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-5">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-3">No orders yet!</p>
          <Link
            href="/"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-lg shadow-sm p-5"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h2 className="font-medium">{item.title}</h2>
                      <p className="text-sm text-gray-600">
                        Qty: {item.qty} × ₹{item.price}
                      </p>
                    </div>

                    <p className="font-semibold">₹{item.qty * item.price}</p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="text-right mt-4 font-semibold">
                Total Paid: ₹{order.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
