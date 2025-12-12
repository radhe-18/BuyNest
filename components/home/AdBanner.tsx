export default function AdBanner() {
  return (
    <div className="w-full h-40 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 shadow-sm flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-green-700 font-semibold">Special Offer</p>
        <h2 className="text-xl font-bold text-green-800">Flat 40% OFF</h2>
        <p className="text-xs text-gray-600 mt-1">
          On groceries, daily essentials & beverages
        </p>
      </div>
    </div>
  );
}
