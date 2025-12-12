"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import LocationSelector from "@/components/location/LocationSelector";
import ProfileDropdown from "@/components/UI/ProfileDropdown";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const totalQty = useCart((s) => s.totalQty());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    function onStorage(e: StorageEvent) {
      if (e.key === "user") setUser(e.newValue ? JSON.parse(e.newValue) : null);
      if (e.key === "buynest_logout") setUser(null);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <header className="bg-white border-b sticky top-0 z-50">

      {/* ---------------- ROW 1 ---------------- */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between text-sm">

        {/* LEFT — LOGO + LOCATION */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-extrabold text-green-600">
            BuyNest
          </Link>

          <div className="ml-4">
            <LocationSelector />
          </div>
        </div>

        {/* CENTER — SEARCH BAR */}
        <div className="flex-1 mx-10 hidden md:block">
          <SearchBar />
        </div>

        {/* RIGHT — LOGIN / PROFILE + ORDERS + CART */}
        <div className="flex items-center gap-6 font-medium">

          {user ? (
            <ProfileDropdown />
          ) : (
            <Link href="/auth/login" className="flex items-center gap-2 hover:text-green-600">
              <LogIn size={20} /> Sign In
            </Link>
          )}

          <Link href="/orders" className="hover:text-green-600">
            My Orders
          </Link>

          <Link
            href="/cart"
            className="relative px-4 py-1 rounded-full border border-green-600 text-green-700"
          >
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ---------------- ROW 2 — CATEGORY STRIP ---------------- */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center gap-5 overflow-x-auto text-xs font-medium text-gray-700">
          <Link href="/grocery-staples">Grocery & Staples</Link>
          <Link href="/fruits-vegetables">Fruits & Vegetables</Link>
          <Link href="/dairy-bakery">Dairy & Bakery</Link>
          <Link href="/beverages">Beverages</Link>
          <Link href="/snacks-branded">Snacks & Branded Foods</Link>
          <Link href="/personal-care">Personal Care</Link>
          <Link href="/home-care">Home Care</Link>
          <Link href="/baby-kids">Baby & Kids</Link>
          <Link href="/household-kitchen">Household & Kitchen</Link>
        </div>
      </div>

    </header>
  );
}
