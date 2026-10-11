"use client";

import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const session = false;

  const categories = [
    { name: "চাল", slug: "chal", emoji: "🍚" },
    { name: "ডাল", slug: "lentil", emoji: "🫘" },
    { name: "তেল", slug: "oil", emoji: "🫙" },
    { name: "সবজি", slug: "vegetable", emoji: "🥔" },
    { name: "মাংস", slug: "meat", emoji: "🥩" },
    { name: "মাছ", slug: "fish", emoji: "🐟" },
    { name: "ডিম-দুধ", slug: "egg-milk", emoji: "🥚" },
    { name: "মসলা", slug: "spice", emoji: "🧄" },
  ];

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2 rounded-xl text-xl flex items-center justify-center shadow-sm">
            🛒
          </div>
          <div>
            <span className="text-xl font-bold text-zinc-900 tracking-tight">বাজার দর</span>
            <p className="text-xs text-zinc-500 font-medium">রবিবার, ১১ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <User size={18} /> প্রোফাইল
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin" className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-emerald-600">
                সাইন ইন
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-700">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="border-t border-zinc-100 hidden md:block bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white text-zinc-700 border border-zinc-200 hover:border-emerald-500 transition shadow-sm"
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* চলমান প্রাইজ টিক্কার */}
      <div className="bg-emerald-50 border-t border-emerald-100 py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-xs font-medium text-zinc-700">
          <span className="mx-6">🍚 স্বর্ণমাছি চাল ৪৮ টাকা/কেজি ▲ ২.১%</span>
          <span className="mx-6">🥔 আলু ৫৫ টাকা/কেজি ▼ ১.৫%</span>
          <span className="mx-6">🧅 পেঁয়াজ ৭০ টাকা/কেজি ▲ ৩.০%</span>
          <span className="mx-6">🧄 রসুন ১৮০ টাকা/কেজি — ০.০%</span>
          <span className="mx-6">🫘 মসুর ডাল ১৩০ টাকা/কেজি ▲ ০.৫%</span>
          <span className="mx-6">🐟 ইলিশ মাছ ১৮৫০ টাকা/কেজি ▲ ০.৮%</span>
        </div>
      </div>
    </header>
  );
}