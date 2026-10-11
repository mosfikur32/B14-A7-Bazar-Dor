"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ProfileUpdatePage() {
  const router = useRouter();

  // useSyncExternalStore ব্যবহার করে হাইড্রেশন ও লিন্ট ওয়ার্নিং ছাড়াই লোকালস্টোরেজ থেকে ডেটা রিড করা
  const savedName = useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem("bazar_user_name") || "",
    () => ""
  );

  const savedEmail = useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem("bazar_user_email") || "",
    () => ""
  );

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // ইনিশিয়াল ভ্যালু সেট করার জন্য
  const currentName = name !== null ? name : savedName;
  const currentEmail = email !== null ? email : savedEmail;

  // ফর্ম সাবমিট বা আপডেট করার হ্যান্ডলার
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // ১. লোকালস্টোরেজে নতুন নাম ও ইমেইল সেভ করা
    localStorage.setItem("bazar_user_name", currentName);
    localStorage.setItem("bazar_user_email", currentEmail);

    // ২. ন্যাপবারকে সাথে সাথে সিগন্যাল পাঠানো যাতে পেজ রিফ্রেশ ছাড়াই নাম আপডেট হয়ে যায়
    window.dispatchEvent(new Event("bazar_user_updated"));

    // ৩. প্রোফাইল পেজে রিডাইরেক্ট করা
    router.push("/profile");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 min-h-[70vh] font-sans">
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
        <Link href="/profile" className="hover:text-white transition">প্রোফাইল</Link>
        <span>›</span>
        <span className="text-emerald-400 font-medium">তথ্য আপডেট</span>
      </div>

      <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">প্রোফাইল তথ্য আপডেট করুন</h1>
        <p className="text-xs text-zinc-400 mb-6">আপনার নাম বা ইমেইল পরিবর্তন করুন, যা ন্যাপবারে সাথে সাথে আপডেট হয়ে যাবে।</p>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">আপনার নাম</label>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#202431] border border-zinc-700/60 rounded-xl px-4 py-2.5 text-sm text-zinc-100 outline-none focus:border-emerald-500 transition"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">ইমেইল ঠিকানা</label>
            <input
              type="email"
              value={currentEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#202431] border border-zinc-700/60 rounded-xl px-4 py-2.5 text-sm text-zinc-100 outline-none focus:border-emerald-500 transition"
              placeholder="আপনার ইমেইল লিখুন"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-3 rounded-xl transition shadow-md"
            >
              পরিবর্তনগুলো সেভ করুন
            </button>
            <Link
              href="/profile"
              className="px-5 py-3 bg-[#202431] hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl transition border border-zinc-700/60 text-center"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}