"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Package, MapPin } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // read user from localStorage (safe in client)
  const userRaw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Notify other tabs
    try { localStorage.setItem("buynest_logout", Date.now().toString()); } catch {}
    router.push("/auth/login");
  }

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-100 transition"
      >
        <User size={20} className="text-green-600" />
        <span className="font-medium">{user.name.split(" ")[0]}</span>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-1 z-50">
          <Link href="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50" role="menuitem">
            <User size={16} /> My Profile
          </Link>
          <Link href="/orders" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50" role="menuitem">
            <Package size={16} /> My Orders
          </Link>
          <Link href="/addresses" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50" role="menuitem">
            <MapPin size={16} /> Saved Addresses
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50"
            role="menuitem"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
