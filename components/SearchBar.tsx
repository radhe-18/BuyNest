"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Fetch search results
  async function fetchResults(q: string) {
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API;
      const res = await fetch(`${base}/api/products/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
      setOpen(true);
    } catch (e) {
      console.log("Search error", e);
    } finally {
      setLoading(false);
    }
  }

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => fetchResults(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown by clicking outside
  useEffect(() => {
    function onDoc(e: any) {
      if (
        listRef.current &&
        !listRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center bg-white border rounded-full px-3 py-2 shadow-sm">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none text-sm"
          placeholder="Search for products…"
        />

        <button
          onClick={() => router.push(`/search?q=${query}`)}
          className="text-sm text-green-600 font-medium px-2"
        >
          Search
        </button>
      </div>

      {/* Dropdown Results */}
      {open && results.length > 0 && (
        <div
          ref={listRef}
          className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg"
        >
          {results.map((p) => (
            <div
              key={p._id}
              onClick={() => router.push(`/product/${p.slug}`)}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
            >
              <img
                src={p.image || "/placeholder.png"}
                className="h-10 w-10 object-cover rounded"
                alt={p.name}
              />
              <div className="text-sm">
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">₹{p.price}</p>
              </div>
            </div>
          ))}

          <div
            className="px-3 py-2 text-xs text-gray-600 border-t cursor-pointer hover:bg-gray-50"
            onClick={() => router.push(`/search?q=${query}`)}
          >
            View all results for “{query}”
          </div>
        </div>
      )}
    </div>
  );
}
