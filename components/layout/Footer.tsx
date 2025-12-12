export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-600 grid gap-6 md:grid-cols-4">
        <div>
          <h4 className="font-semibold mb-2">BuyNest</h4>
          <p className="text-xs">
            Smart grocery and essentials shopping. Timely delivery, trusted quality and everyday savings.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-xs">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Help</h4>
          <ul className="space-y-1 text-xs">
            <li>FAQs</li>
            <li>Payments</li>
            <li>Shipping & Returns</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Download App</h4>
          <div className="flex flex-col gap-2 text-xs">
            <div className="border rounded-md px-3 py-2 inline-block">
              Google Play (mock)
            </div>
            <div className="border rounded-md px-3 py-2 inline-block">
              App Store (mock)
            </div>
          </div>
        </div>
      </div>
      <div className="border-t text-xs text-gray-500 py-3 text-center">
        © {new Date().getFullYear()} BuyNest. All rights reserved.
      </div>
    </footer>
  );
}
