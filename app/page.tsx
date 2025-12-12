import HomeTop from "@/components/home/HomeTop";
import CategorySection from "@/components/home/CategorySection";
import { products } from "@/data/products";

const CATEGORY_CONFIG = [
  { title: "Grocery & Staples", slug: "grocery-staples" as const },
  { title: "Fruits & Vegetables", slug: "fruits-vegetables" as const },
  { title: "Dairy & Bakery", slug: "dairy-bakery" as const },
  { title: "Beverages", slug: "beverages" as const },
  { title: "Snacks & Branded Foods", slug: "snacks-branded" as const },
  { title: "Personal Care", slug: "personal-care" as const },
  { title: "Home Care", slug: "home-care" as const },
  { title: "Baby & Kids", slug: "baby-kids" as const },
  { title: "Household & Kitchen", slug: "household-kitchen" as const },
];

export default function HomePage() {
  return (
    <main className="px-4 md:px-8 py-6 bg-gray-50 min-h-screen">
      {/* TOP: sidebar + hero + right promo */}
      <HomeTop />

      {/* CATEGORY SECTIONS – Blinkit / DMart style */}
      <div className="space-y-8">
        {CATEGORY_CONFIG.map((cat) => {
          const list = products.filter((p) => p.category === cat.slug);
          return (
            <CategorySection
              key={cat.slug}
              title={cat.title}
              slug={cat.slug}
              products={list}
            />
          );
        })}
      </div>
    </main>
  );
}
