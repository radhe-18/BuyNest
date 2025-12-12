"use client";
import { useEffect, useState } from "react";
import OfferSmallBanner from "@/components/home/OfferSmallBanner";


const ads = [
  "/ad/ad.jpg",
  "/ad/ad1.png",
  "/ad/ad2.png",
  "/ad/ad3.jpg",
];

export default function RightPromo() {
  const [index, setIndex] = useState(0);

  // Auto change every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-56 shrink-0 space-y-4">
      {/* Delivery Slot Box */}
      <div className="bg-yellow-50 rounded-xl p-4 border shadow-sm">
        <p className="text-xs font-semibold text-yellow-700">Delivery Slot</p>
        <p className="mt-1 text-sm text-gray-800">Today · 30–45 mins</p>
      </div>

      {/* AUTO CHANGING SLIDER */}
      <div className="rounded-xl overflow-hidden border shadow-md h-48">
        <img
          key={ads[index]}
          src={ads[index]}
          alt="Promo Banner"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>
    </aside>
  );
}
