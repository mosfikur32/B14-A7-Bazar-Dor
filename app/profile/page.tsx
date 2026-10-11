"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  
  // হাইড্রেশন এরর এড়াতে প্রথমে ডিফল্ট ভ্যালু দিয়ে স্টেট শুরু করা
  const [userName, setUserName] = useState("Mosfikur Rahman");
  const [userEmail, setUserEmail] = useState("mosfikurrahman32@gmail.com");

  // পেজ লোড হওয়ার পর ক্লায়েন্ট সাইডে লোকালস্টোরেজ থেকে ডেটা লোড করা
  useEffect(() => {
    const loadUserData = () => {
      const savedName = localStorage.getItem("bazar_user_name");
      const savedEmail = localStorage.getItem("bazar_user_email");
      if (savedName) setUserName(savedName);
      if (savedEmail) setUserEmail(savedEmail);
    };

    loadUserData();

    window.addEventListener("storage", loadUserData);
    window.addEventListener("userProfileUpdated", loadUserData as EventListener);

    return () => {
      window.removeEventListener("storage", loadUserData);
      window.removeEventListener("userProfileUpdated", loadUserData as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bazar_user_name");
    localStorage.removeItem("bazar_user_email");
    window.dispatchEvent(new Event("userProfileUpdated"));
    router.push("/signin");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh] font-sans">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">আমার প্রোফাইল</h1>
      <p className="text-xs text-zinc-500 mb-8">বাজারদরে নিবন্ধিত আপনার ব্যক্তিগত অ্যাকাউন্ট তথ্য</p>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{userName}</h2>
            <p className="text-sm text-zinc-500">{userEmail}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/profile/update"
            className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            প্রোফাইল আপডেট
          </Link>
          <button
            onClick={handleLogout}
            className="border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/30 text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            লগআউট
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">একাউন্ট তথ্য</h3>
        <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
          <div>
            <span className="block font-medium mb-1">নাম:</span>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 text-zinc-100 font-medium">
              {userName}
            </div>
          </div>
          <div>
            <span className="block font-medium mb-1">ইমেইল:</span>
            <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 text-zinc-100 font-medium">
              {userEmail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}