import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "BuyNest – Online Grocery & Essentials",
  description: "Smart online shopping for groceries and daily essentials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* ✅ SINGLE HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t mt-10">
          <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold mb-2">BuyNest</h4>
              <p>
                Your trusted partner for groceries and daily essentials at
                smart prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Useful Links</h4>
              <p>About · Help · Privacy · Terms</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customer Support</h4>
              <p>Mon–Sun, 7 AM – 10 PM</p>
              <p>Email: support@buynest.local</p>
            </div>
          </div>
          <div className="border-t py-3 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} BuyNest
          </div>
        </footer>
      </body>
    </html>
  );
}
