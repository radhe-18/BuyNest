"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const base = process.env.NEXT_PUBLIC_API;
      const res = await fetch(
        `${base}/api/search?q=${encodeURIComponent(q)}&limit=24`
      );
      setResults((await res.json()).results || []);
    }
    load();
  }, [q]);

  return (
    <div>
      <h2 className="text-xl font-semibold my-4">Results for “{q}”</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((p) => (
          <div key={p._id} className="bg-white p-3 rounded shadow">
            <img
              src={p.image || "/placeholder.png"}
              className="h-36 w-full object-cover rounded"
            />
            <div className="mt-2 text-sm font-medium">{p.name}</div>
            <div className="text-xs text-gray-500">₹{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
