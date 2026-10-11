"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

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

// সেন্ট্রাল প্রোডাক্ট রেজিস্ট্রি
const allProducts: Record<
  string,
  {
    name: string;
    categoryName: string;
    categorySlug: string;
    unit: string;
    price: string;
    change: string;
    isUp: boolean;
    marketSummary: { karwan: string; newMarket: string; wholesale: string };
    marketPrices: Array<{ bazar: string; determinant: string; min: string; max: string }>;
  }
> = {
  "bottom-size-chal": {
    name: "বাটম সাইজ চাল",
    categoryName: "চাল",
    categorySlug: "chal",
    unit: "প্রতি কেজি",
    price: "৬৬ টাকা",
    change: "▲ ১ টাকা",
    isUp: true,
    marketSummary: { karwan: "৬৫ টাকা", newMarket: "৭৩ টাকা", wholesale: "৬২ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার থেকে সংগৃহীত", min: "৬৪ টাকা", max: "৬৬ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার দর", min: "৭২ টাকা", max: "৭৪ টাকা" },
      { bazar: "মোহাম্মদপুর বাজার", determinant: "সাধারণ খুচরা মূল্য", min: "৬৫ টাকা", max: "৬৮ টাকা" }
    ]
  },
  "najir-chal": {
    name: "নাজির চাল",
    categoryName: "চাল",
    categorySlug: "chal",
    unit: "প্রতি কেজি",
    price: "৭৪ টাকা",
    change: "▲ ০%",
    isUp: true,
    marketSummary: { karwan: "৭২ টাকা", newMarket: "৭৬ টাকা", wholesale: "৭০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৭১ টাকা", max: "৭৩ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৭৫ টাকা", max: "৭৭ টাকা" }
    ]
  },
  "miniket-chal": {
    name: "মিনিকেট চাল",
    categoryName: "চাল",
    categorySlug: "chal",
    unit: "প্রতি কেজি",
    price: "৯৯ টাকা",
    change: "▼ ২.৯%",
    isUp: false,
    marketSummary: { karwan: "৯৬ টাকা", newMarket: "১০২ টাকা", wholesale: "৯৪ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৯৫ টাকা", max: "৯৮ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১০১ টাকা", max: "১০৪ টাকা" }
    ]
  },
  "swarna-chal": {
    name: "স্বর্ণা চাল",
    categoryName: "চাল",
    categorySlug: "chal",
    unit: "প্রতি কেজি",
    price: "১৪৮ টাকা",
    change: "▲ ২.১%",
    isUp: true,
    marketSummary: { karwan: "১৪৫ টাকা", newMarket: "১৫২ টাকা", wholesale: "১৪২ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১৪৪ টাকা", max: "১৪৯ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৫০ টাকা", max: "১৫৪ টাকা" }
    ]
  },
  "chhola": {
    name: "ছোলা",
    categoryName: "ডাল",
    categorySlug: "lentil",
    unit: "প্রতি কেজি",
    price: "১২০ টাকা",
    change: "▲ ১.৮%",
    isUp: true,
    marketSummary: { karwan: "১১৫ টাকা", newMarket: "১২৫ টাকা", wholesale: "১১০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১১৩ টাকা", max: "১২১ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১২৩ টাকা", max: "১২৭ টাকা" }
    ]
  },
  "mosur-dal": {
    name: "মসুর ডাল",
    categoryName: "ডাল",
    categorySlug: "lentil",
    unit: "প্রতি কেজি",
    price: "১৩০ টাকা",
    change: "▲ ০.৫%",
    isUp: true,
    marketSummary: { karwan: "১২৫ টাকা", newMarket: "১৩৫ টাকা", wholesale: "১২০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১২৮ টাকা", max: "১৩২ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৩৩ টাকা", max: "১৩৭ টাকা" }
    ]
  },
  "mug-dal": {
    name: "মুগ ডাল",
    categoryName: "ডাল",
    categorySlug: "lentil",
    unit: "প্রতি কেজি",
    price: "১৫৫ টাকা",
    change: "▼ ১.২%",
    isUp: false,
    marketSummary: { karwan: "১৫০ টাকা", newMarket: "১৬০ টাকা", wholesale: "১৪৫ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১৫২ টাকা", max: "১৫৭ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৫৮ টাকা", max: "১৬৩ টাকা" }
    ]
  },
  "mustard-oil": {
    name: "সরিষার তেল",
    categoryName: "তেল",
    categorySlug: "oil",
    unit: "প্রতি লিটার",
    price: "১৯০ টাকা",
    change: "▼ ০.৩%",
    isUp: false,
    marketSummary: { karwan: "১৮৫ টাকা", newMarket: "১৯৫ টাকা", wholesale: "১৮০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১৮৮ টাকা", max: "১৯২ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৯৩ টাকা", max: "১৯৭ টাকা" }
    ]
  },
  "soybean-oil": {
    name: "সয়াবিন তেল (৫ লিটার)",
    categoryName: "তেল",
    categorySlug: "oil",
    unit: "প্রতি বোতল",
    price: "৮৩০ টাকা",
    change: "▲ ০.৮%",
    isUp: true,
    marketSummary: { karwan: "৮১৫ টাকা", newMarket: "৮৪৫ টাকা", wholesale: "৮০০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৮২৫ টাকা", max: "৮৩৫ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৮৪০ টাকা", max: "৮৫০ টাকা" }
    ]
  },
  "potato": {
    name: "আলু",
    categoryName: "সবজি",
    categorySlug: "vegetable",
    unit: "প্রতি কেজি",
    price: "৩০ টাকা",
    change: "▼ ১.৫%",
    isUp: false,
    marketSummary: { karwan: "২৬ টাকা", newMarket: "৩২ টাকা", wholesale: "২৪ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "২৮ টাকা", max: "৩১ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৩৩ টাকা", max: "৩৫ টাকা" }
    ]
  },
  "brinjal": {
    name: "বেগুন",
    categoryName: "সবজি",
    categorySlug: "vegetable",
    unit: "প্রতি কেজি",
    price: "৫৫ টাকা",
    change: "▲ ১.২%",
    isUp: true,
    marketSummary: { karwan: "৫০ টাকা", newMarket: "৬০ টাকা", wholesale: "৪৫ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৫৩ টাকা", max: "৫৭ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৫৮ টাকা", max: "৬২ টাকা" }
    ]
  },
  "onion": {
    name: "পেঁয়াজ",
    categoryName: "সবজি",
    categorySlug: "vegetable",
    unit: "প্রতি কেজি",
    price: "৭০ টাকা",
    change: "▲ ২.০%",
    isUp: true,
    marketSummary: { karwan: "৬৫ টাকা", newMarket: "৭৫ টাকা", wholesale: "৬০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৬৮ টাকা", max: "৭২ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৭৩ টাকা", max: "৭৭ টাকা" }
    ]
  },
  "broiler-chicken": {
    name: "ব্রয়লার মুরগি",
    categoryName: "মাংস",
    categorySlug: "meat",
    unit: "প্রতি কেজি",
    price: "২২৫ টাকা",
    change: "▲ ১.১%",
    isUp: true,
    marketSummary: { karwan: "২১৫ টাকা", newMarket: "২৩৫ টাকা", wholesale: "২০৫ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "২২০ টাকা", max: "২৩০ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "২৩২ টাকা", max: "২৪০ টাকা" }
    ]
  },
  "beef": {
    name: "গরুর মাংস",
    categoryName: "মাংস",
    categorySlug: "meat",
    unit: "প্রতি কেজি",
    price: "৭৮০ টাকা",
    change: "▼ ০.৫%",
    isUp: false,
    marketSummary: { karwan: "৭৫০ টাকা", newMarket: "৮০০ টাকা", wholesale: "৭৩০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৭৭০ টাকা", max: "৭৯০ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৭৯৫ টাকা", max: "৮১০ টাকা" }
    ]
  },
  "rui-fish": {
    name: "রুই মাছ",
    categoryName: "মাছ",
    categorySlug: "fish",
    unit: "প্রতি কেজি",
    price: "৪৫০ টাকা",
    change: "▲ ১.৫%",
    isUp: true,
    marketSummary: { karwan: "৪৩০ টাকা", newMarket: "৪৭০ টাকা", wholesale: "৪১০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৪৪0 টাকা", max: "৪৬০ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৪৬৫ টাকা", max: "৪৮০ টাকা" }
    ]
  },
  "ilish-fish": {
    name: "ইলিশ মাছ",
    categoryName: "মাছ",
    categorySlug: "fish",
    unit: "প্রতি কেজি",
    price: "১৮৫০ টাকা",
    change: "▲ ০.৪%",
    isUp: true,
    marketSummary: { karwan: "১৭৫০ টাকা", newMarket: "১৯৫০ টাকা", wholesale: "১৬৫০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১৮০০ টাকা", max: "১৯০০ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৯১০ টাকা", max: "২০০০ টাকা" }
    ]
  },
  "milk": {
    name: "দুধ",
    categoryName: "ডিম-দুধ",
    categorySlug: "dairy",
    unit: "প্রতি লিটার",
    price: "১০০ টাকা",
    change: "▲ ০.৩%",
    isUp: true,
    marketSummary: { karwan: "৯৫ টাকা", newMarket: "১০৫ টাকা", wholesale: "৯০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৯৮ টাকা", max: "১০২ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১০৩ টাকা", max: "১০৮ টাকা" }
    ]
  },
  "egg": {
    name: "ডিম",
    categoryName: "ডিম-দুধ",
    categorySlug: "dairy",
    unit: "প্রতি ডজন",
    price: "১৫০ টাকা",
    change: "▲ ১.৫%",
    isUp: true,
    marketSummary: { karwan: "১৪0 টাকা", newMarket: "১৬0 টাকা", wholesale: "১৩5 টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১৪৫ টাকা", max: "১৫৫ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৫৬ টাকা", max: "১৬২ টাকা" }
    ]
  },
  "ginger": {
    name: "আদা",
    categoryName: "মসলা",
    categorySlug: "spice",
    unit: "প্রতি কেজি",
    price: "৮৫ টাকা",
    change: "▲ ২.১%",
    isUp: true,
    marketSummary: { karwan: "৮0 টাকা", newMarket: "৯০ টাকা", wholesale: "৭৫ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "৮২ টাকা", max: "৮৮ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "৯০ টাকা", max: "৯৫ টাকা" }
    ]
  },
  "garlic": {
    name: "রসুন",
    categoryName: "মসলা",
    categorySlug: "spice",
    unit: "প্রতি কেজি",
    price: "১২৫ টাকা",
    change: "▲ ১.৪%",
    isUp: true,
    marketSummary: { karwan: "১২0 টাকা", newMarket: "১৩০ টাকা", wholesale: "১১০ টাকা" },
    marketPrices: [
      { bazar: "কাওরান বাজার", determinant: "পাইকারি বাজার", min: "১২২ টাকা", max: "১২৮ টাকা" },
      { bazar: "নিউ মার্কেট", determinant: "খুচরা বাজার", min: "১৩০ টাকা", max: "১৩৫ টাকা" }
    ]
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const rawId = (params?.slug as string) || (params?.id as string) || "";
  const decodedId = decodeURIComponent(rawId);

  const product = allProducts[decodedId] || allProducts["bottom-size-chal"];

  return (
    <div className="min-h-screen bg-[#0f1117] text-zinc-100 font-sans pb-16">
      {/* ওপরের ক্যাটাগরি ট্যাব বার (যা এখন প্রোডাক্ট পেজেও দেখা যাবে) */}
      <div className="bg-[#161922] border-b border-zinc-800/80 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = product.categorySlug === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-[#202431] text-zinc-300 hover:bg-[#2a2f40] hover:text-white border border-zinc-700/40"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6">
        {/* হোম / ক্যাটাগরি / প্রোডাক্ট নেভিগেশন পাথ */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-white transition">
            {product.categoryName}
          </Link>
          <span>›</span>
          <span className="text-emerald-400 font-medium">{product.name}</span>
        </div>

        {/* মূল ব্যানার হেডার */}
        <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-xs text-zinc-400">
                {product.unit} - {product.categoryName} - কাওরান বাজারের তুলনায় আজ দাম পরিবর্তন হয়েছে
              </p>
            </div>
            <div className={`self-start md:self-auto text-xs font-semibold px-3.5 py-1.5 rounded-lg ${product.isUp ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-rose-400 bg-rose-500/10 border border-rose-500/20"}`}>
              {product.change}
            </div>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-5 shadow-md">
            <div className="text-xs text-zinc-400 mb-1">কাওরান বাজার</div>
            <div className="text-xl font-bold text-emerald-400">{product.marketSummary.karwan}</div>
            <div className="text-[10px] text-zinc-500 mt-1">পাইকারি বাজার থেকে সংগৃহীত</div>
          </div>
          <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-5 shadow-md">
            <div className="text-xs text-zinc-400 mb-1">নিউ মার্কেট</div>
            <div className="text-xl font-bold text-white">{product.marketSummary.newMarket}</div>
            <div className="text-[10px] text-zinc-500 mt-1">খুচরা বাজার দর</div>
          </div>
          <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-5 shadow-md">
            <div className="text-xs text-zinc-400 mb-1">পাইকারি গড় মূল্য</div>
            <div className="text-xl font-bold text-zinc-200">{product.marketSummary.wholesale}</div>
            <div className="text-[10px] text-zinc-500 mt-1">সরাসরি উৎস থেকে</div>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম টেবিল */}
        <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-6 mt-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3 px-4 font-medium">বাজার</th>
                  <th className="py-3 px-4 font-medium">নির্ধারক</th>
                  <th className="py-3 px-4 font-medium">সর্বনিম্ন</th>
                  <th className="py-3 px-4 font-medium">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                {product.marketPrices.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">{row.bazar}</td>
                    <td className="py-3 px-4 text-zinc-400">{row.determinant}</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">{row.min}</td>
                    <td className="py-3 px-4 text-white font-bold">{row.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}