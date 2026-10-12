"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";

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

// ক্যাটাগরি অনুযায়ী প্রোডাক্টের তালিকা ও সর্টিংয়ের জন্য সঠিক ডেটা স্ট্রাকচার
const categoryProducts: Record<
  string,
  Array<{ id: string; name: string; unit: string; priceNum: number; price: string; change: string; isUp: boolean }>
> = {
  chal: [
    { id: "bottom-size-chal", name: "বাটম সাইজ চাল", unit: "প্রতি কেজি", priceNum: 66, price: "৬৬ টাকা", change: "▲ ৩.১%", isUp: true },
    { id: "najir-chal", name: "নাজির চাল", unit: "প্রতি কেজি", priceNum: 74, price: "৭৪ টাকা", change: "▲ ০%", isUp: true },
    { id: "miniket-chal", name: "মিনিকেট চাল", unit: "প্রতি কেজি", priceNum: 99, price: "৯৯ টাকা", change: "▼ ২.৯%", isUp: false },
    { id: "swarna-chal", name: "স্বর্ণা চাল", unit: "প্রতি কেজি", priceNum: 148, price: "১৪৮ টাকা", change: "▲ ২.১%", isUp: true },
  ],
  lentil: [
    { id: "chhola", name: "ছোলা", unit: "প্রতি কেজি", priceNum: 120, price: "১২০ টাকা", change: "▲ ১.৮%", isUp: true },
    { id: "mosur-dal", name: "মসুর ডাল", unit: "প্রতি কেজি", priceNum: 130, price: "১৩০ টাকা", change: "▲ ০.৫%", isUp: true },
    { id: "mug-dal", name: "মুগ ডাল", unit: "প্রতি কেজি", priceNum: 155, price: "১৫৫ টাকা", change: "▼ ১.২%", isUp: false },
  ],
  oil: [
    { id: "mustard-oil", name: "সরিষার তেল", unit: "প্রতি লিটার", priceNum: 190, price: "১৯০ টাকা", change: "▼ ০.৩%", isUp: false },
    { id: "soybean-oil", name: "সয়াবিন তেল (৫ লিটার)", unit: "প্রতি বোতল", priceNum: 830, price: "৮৩০ টাকা", change: "▲ ০.৮%", isUp: true },
  ],
  vegetable: [
    { id: "potato", name: "আলু", unit: "প্রতি কেজি", priceNum: 30, price: "৩০ টাকা", change: "▼ ১.৫%", isUp: false },
    { id: "brinjal", name: "বেগুন", unit: "প্রতি কেজি", priceNum: 55, price: "৫৫ টাকা", change: "▲ ১.২%", isUp: true },
    { id: "onion", name: "পেঁয়াজ", unit: "প্রতি কেজি", priceNum: 70, price: "৭০ টাকা", change: "▲ ২.০%", isUp: true },
  ],
  meat: [
    { id: "broiler-chicken", name: "ব্রয়লার মুরগি", unit: "প্রতি কেজি", priceNum: 225, price: "২২৫ টাকা", change: "▲ ১.১%", isUp: true },
    { id: "beef", name: "গরুর মাংস", unit: "প্রতি কেজি", priceNum: 780, price: "৭৮০ টাকা", change: "▼ ০.৫%", isUp: false },
  ],
  fish: [
    { id: "rui-fish", name: "রুই মাছ", unit: "প্রতি কেজি", priceNum: 450, price: "৪৫০ টাকা", change: "▲ ১.৫%", isUp: true },
    { id: "ilish-fish", name: "ইলিশ মাছ", unit: "প্রতি কেজি", priceNum: 1850, price: "১৮৫০ টাকা", change: "▲ ০.৪%", isUp: true },
  ],
  dairy: [
    { id: "milk", name: "দুধ", unit: "প্রতি লিটার", priceNum: 100, price: "১০০ টাকা", change: "▲ ০.৩%", isUp: true },
    { id: "egg", name: "ডিম", unit: "প্রতি ডজন", priceNum: 150, price: "১৫০ টাকা", change: "▲ ১.৫%", isUp: true },
  ],
  spice: [
    { id: "ginger", name: "আদা", unit: "প্রতি কেজি", priceNum: 85, price: "৮৫ টাকা", change: "▲ ২.১%", isUp: true },
    { id: "garlic", name: "রসুন", unit: "প্রতি কেজি", priceNum: 125, price: "১২৫ টাকা", change: "▲ ১.৪%", isUp: true },
  ],
};

function CategoryContent() {
  const params = useParams();
  const currentSlug = (params?.slug as string) || "chal";
  const [sortOrder, setSortOrder] = useState("default");

  const currentCategory = categories.find((c) => c.slug === currentSlug) || categories[0];
  const rawProducts = categoryProducts[currentSlug] || categoryProducts["chal"];

  // দাম অনুযায়ী ফিল্টার বা সর্ট করার নিখুঁত লজিক
  const products = [...rawProducts].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.priceNum - b.priceNum;
    } else if (sortOrder === "high-low") {
      return b.priceNum - a.priceNum;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0f1117] text-zinc-100 font-sans pb-12">
      {/* ক্যাটাগরি ট্যাব বার */}
      <div className="bg-[#161922] border-b border-zinc-800/80 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = currentSlug === cat.slug;
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

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* ক্যাটাগরি শিরোনাম ও সোর্টিং ড্রপডাউন */}
        <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-6 flex items-center justify-between shadow-lg">
          <div>
            <div className="text-xs text-emerald-500 font-medium mb-1">ক্যাটাগরি</div>
            <h1 className="text-2xl font-bold text-white">
              {currentCategory.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>সাজান:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-[#202431] border border-zinc-700/60 rounded-lg px-3 py-1.5 text-zinc-200 outline-none cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">কম দাম</option>
              <option value="high-low">বেশি দাম</option>
            </select>
          </div>
        </div>

        {/* প্রোডাক্ট কার্ডস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="bg-[#161922] border border-zinc-800/80 hover:border-emerald-500/50 rounded-2xl p-5 shadow-lg transition duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-xs mb-3 group-hover:scale-110 transition">
                  🌸
                </div>
                <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-emerald-400 transition">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 mb-6">{item.unit}</p>
              </div>

              <div className="border-t border-zinc-800/80 pt-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 mb-0.5">আজকের দাম</div>
                  <div className="text-base font-bold text-white">{item.price}</div>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-md ${
                    item.isUp
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-rose-400 bg-rose-500/10"
                  }`}
                >
                  {item.change}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1117] text-white p-8">লোড হচ্ছে...</div>}>
      <CategoryContent />
    </Suspense>
  );
}