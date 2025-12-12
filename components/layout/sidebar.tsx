"use client";

import Link from "next/link";

const CATEGORIES = [
  { name: "Grocery & Staples", slug: "grocery-staples" },
  { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
  { name: "Dairy & Bakery", slug: "dairy-bakery" },
  { name: "Beverages", slug: "beverages" },
  { name: "Snacks & Branded Foods", slug: "snacks-branded" },
  { name: "Personal Care", slug: "personal-care" },
  { name: "Home Care", slug: "home-care" },
  { name: "Baby & Kids", slug: "baby-kids" },
  { name: "Household & Kitchen", slug: "household-kitchen" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold mb-3 text-gray-800">All Categories</h2>
      <ul className="space-y-1 text-sm">
        {CATEGORIES.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              className="block px-2 py-1.5 rounded-lg hover:bg-green-50 hover:text-green-700 transition"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
