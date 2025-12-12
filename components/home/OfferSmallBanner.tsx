export default function OfferSmallBanner() {
  return (
    <div className="rounded-xl p-4 h-32 bg-gradient-to-br from-green-100 to-green-200 border shadow-sm flex flex-col justify-center">
      <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wide">
        Special Offer
      </p>

      <p className="text-lg font-bold text-green-900 leading-tight mt-1">
        Up to 40% OFF
      </p>

      <p className="text-[11px] text-gray-600 mt-1">
        Best deals on groceries & essentials
      </p>
    </div>
  );
}
