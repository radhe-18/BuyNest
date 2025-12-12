import Link from "next/link";
import { HOME_CATEGORIES } from "@/data/categories";



export default function CategoriesBar() {
  return (
    <div className="border-b bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm py-3 overflow-x-auto">
        {HOME_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="whitespace-nowrap hover:text-green-600"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
