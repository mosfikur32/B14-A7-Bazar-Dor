import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import heroImg from "../public/assets/bazar-hero.png";

export default async function HeroPage() {
  const products = await getProducts();
  const risers = [...products].filter((p) => p.change > 0);
  const fallers = [...products].filter((p) => p.change < 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans">
      {/* হিরো সেকশন */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 to-emerald-700 text-white p-8 md:p-12 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl z-10">
          <span className="bg-emerald-500/30 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            সঠিক বাজার দর
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
            নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও আপডেট বাজার দর
          </h1>
          <p className="text-emerald-100 mt-4 text-base md:text-lg">
            আজকের কাওরান বাজার, নিউ মার্কেট ও পাইকারি বাজারের সেরা দামের তুলনা এক পলকে দেখে নিন।
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/category/chal"
              className="bg-white text-emerald-800 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition shadow-sm"
            >
              বাজার দর দেখুন
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-0 relative w-full md:w-[420px] h-[260px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={heroImg}
            alt="Bazar Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* দাম বাড়া পণ্য */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            📈 দাম বেড়েছে যে পণ্যগুলোর
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {risers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* দাম কমা পণ্য */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            📉 দাম কমেছে যে পণ্যগুলোর
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fallers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}