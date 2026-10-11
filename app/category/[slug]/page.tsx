"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";
import { ChevronDown } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const cats = await getCategories();
        const currentCat = cats.find((c: { slug: string; name: string }) => c.slug === slug);
        setCategoryName(currentCat ? currentCat.name : slug);

        const data = await getProductsByCategory(slug);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-medium text-zinc-500 animate-pulse">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-zinc-200">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-zinc-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই।</p>
        <Link
          href="/"
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-700 transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-zinc-800 p-6 rounded-2xl border border-zinc-700 text-white">
        <div>
          <span className="text-sm text-emerald-400 font-semibold uppercase tracking-wider">ক্যাটাগরি</span>
          <h1 className="text-3xl font-bold mt-1">{categoryName}</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-300 font-medium">সাজান:</span>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-zinc-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">কম থেকে বেশি</option>
              <option value="high-to-low">বেশি থেকে কম</option>
            </select>
            <ChevronDown size={16} className="absolute right-2.5 top-3 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}