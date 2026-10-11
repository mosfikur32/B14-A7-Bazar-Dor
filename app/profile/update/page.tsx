"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [name, setName] = useState("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("দয়া করে নাম লিখুন!");
      return;
    }
    toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">প্রোফাইল আপডেট করুন</h1>
        <p className="text-sm text-zinc-500 mb-6">আপনার ব্যক্তিগত তথ্য পরিবর্তন করুন</p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="নতুন নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition"
          >
            আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
}