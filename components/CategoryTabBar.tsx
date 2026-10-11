"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "lentil", icon: "🫘" },
  { name: "তেল", slug: "oil", icon: "🛢️" },
  { name: "সবজি", slug: "vegetable", icon: "🥔" },
  { name: "মাংস", slug: "meat", icon: "🥩" },
  { name: "মাছ", slug: "fish", icon: "🐟" },
  { name: "ডিম-দুধ", slug: "dairy", icon: "🥚" },
  { name: "মসলা", slug: "spice", icon: "🧄" },
];

export default function CategoryTabBar() {
  const pathname = usePathname();

  if (pathname === "/signin" || pathname === "/signup") {
    return null;
  }

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center gap-2.5 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = pathname === `/category/${cat.slug}`;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700/50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}