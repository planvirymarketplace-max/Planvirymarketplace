import Link from "next/link";
import { TAXONOMY_CATEGORIES } from "@/data/taxonomy";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Explore Categories</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Discover curated categories across live shows, things to do, food & drink, and more.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TAXONOMY_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={category.route}
                className="border border-neutral-200 rounded-lg p-6 hover:border-neutral-400 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-neutral-600 mb-4">{category.desc}</p>
                <div className="text-xs text-neutral-500">
                  {category.subcategories.length} subcategories
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
