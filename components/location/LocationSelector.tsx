"use client";

import { useState } from "react";

export default function LocationSelector() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("Jaipur");

  const cities = [
    "Jaipur",
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Surat",
    "Ahmedabad",
  ];

  return (
    <div className="relative">
      {/* Display Selected City */}
      <div
        className="flex items-center gap-2 text-gray-800 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        {/* Location Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8.5A2.5 2.5 0 1110 5a2.5 2.5 0 010 5z" />
        </svg>

        <span className="font-semibold">{city}</span>

        {/* Dropdown Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* DROPDOWN LIST */}
      {open && (
        <div className="absolute mt-2 w-40 bg-white shadow-lg border rounded-md z-50">
          {cities.map((c) => (
            <div
              key={c}
              onClick={() => {
                setCity(c);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                c === city ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
