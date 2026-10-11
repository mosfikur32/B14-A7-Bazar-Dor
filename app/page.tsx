import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

interface CatItem {
  id?: string | number;
  name: string;
  slug: string;
  emoji: string;
}

export default async function Home() {
  const categories: CatItem[] = await getCategories();
  const products: Product[] = await getProducts();

  const risers = [...products].sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left z-10">
            <span className="bg-emerald-700 text-emerald-100 text-xs px-3 py-1 rounded-full font-medium">
              রবিবার, ১১ অক্টোবর, ২০২৬
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাস্তবভিত্তিক বিজ্ঞাপিত দর, সর্বোচ্চ-সর্বনিম্ন বাজার দামের পরিবর্তন এক-আন্দাজায়।
            </p>
            <Link
              href="#all-products"
              className="inline-block bg-white text-emerald-700 font-medium px-6 py-3 rounded-full shadow hover:bg-zinc-100 transition"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
          
          {/* Hero Image from public/assets/bazar-hero.png */}
          <div className="w-full md:w-auto flex justify-center z-10">
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <Image
                src="/assets/bazar-hero.png"
                alt="বাজারের ফলমূলের ঝুড়ি"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat: CatItem) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center justify-center p-3 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-emerald-500 transition text-center"
            >
              <span className="text-2xl mb-1">{cat.emoji}</span>
              <span className="text-xs font-medium text-zinc-800">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section A: আজ দাম বেড়েছে */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-bold mb-6 text-red-600 flex items-center gap-2">
          ▲ আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {risers.map((product) => (
            <ProductCard key={`riser-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* Section B: আজ দাম কমেছে */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-bold mb-6 text-emerald-600 flex items-center gap-2">
          ▼ আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {fallers.map((product) => (
            <ProductCard key={`faller-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* Section C: সব পণ্য */}
      <section id="all-products" className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-zinc-200">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900">সব পণ্য</h2>
          <p className="text-zinc-500 text-sm mt-1">তালিকাভুক্ত সমস্ত পণ্যের হালনাগাদ দাম</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}