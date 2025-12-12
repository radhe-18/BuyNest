export default function HeroBanner() {
  return (
    <section className="flex-1 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl px-8 py-6 border shadow-sm">
      <p className="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2">
        Smart Savings · Everyday low prices · No minimum order for store pickup
      </p>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        BuyNest – Everyday Essentials at Best Prices
      </h1>

      <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl">
        Shop groceries, personal care and household needs – all in one place.
      </p>

      {/* big banner block */}
      <div className="mt-5 h-32 md:h-40 rounded-lg bg-white border border-dashed border-green-200 flex items-center justify-between px-6">
        
        {/* LEFT TEXT */}
        <div>
          <p className="text-sm font-semibold text-green-700">
            Winter Sale · Up to 40% OFF
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Best deals on daily essentials, snacks & beverages.
          </p>
        </div>

        {/* RIGHT SMALL OFFER CARD */}
        <div className="hidden md:flex flex-col items-center justify-center
            h-20 w-32 rounded-lg bg-green-100 border border-green-300 shadow-sm p-2">

          <p className="text-[10px] font-semibold text-green-700 tracking-wide">
            SPECIAL OFFER
          </p>

          <h3 className="text-lg font-extrabold text-green-800 leading-tight">
            40% OFF
          </h3>

          <p className="text-[9px] text-green-700 mt-1 text-center">
            Groceries & essentials
          </p>
        </div>
      </div>
    </section>
  );
}
