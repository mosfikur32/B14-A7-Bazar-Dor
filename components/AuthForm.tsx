"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupMode = mode === "signup";

  const handleLoginSuccess = (userName: string, userEmail: string) => {
    localStorage.setItem("bazar_user_name", userName || "Mosfikur Rahman");
    localStorage.setItem("bazar_user_email", userEmail || "mosfikurrahman32@gmail.com");
    
    // রাউটার পুশ করার পর পেজ রিলোড দিলে কোনো ওয়ার্নিং থাকবে না এবং ন্যাপবার সাথে সাথে আপডেট হয়ে যাবে
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (signupMode && !name)) {
      alert("দয়া করে সব তথ্য দিন।");
      return;
    }
    handleLoginSuccess(name || "Mosfikur Rahman", email);
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-900 text-zinc-100 p-8 rounded-2xl shadow-2xl border border-zinc-800 my-10 font-sans">
      <h2 className="text-2xl font-bold mb-1 text-center">
        {signupMode ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
      </h2>
      <p className="text-xs text-zinc-400 text-center mb-6">
        {signupMode ? "বাজার দর সেবা উপভোগ করতে রেজিস্টার করুন" : "নিত্যপ্রয়োজনীয় বাজার দরের আপডেট পেতে লগইন করুন"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {signupMode && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500 placeholder-zinc-500"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500 placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৬ অক্ষর"
            className="w-full px-4 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500 placeholder-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm mt-2"
        >
          {signupMode ? "রেজিস্ট্রেশন করুন" : "সাইন ইন"}
        </button>
      </form>

      {/* সোশাল লগইন সেকশন */}
      <div className="mt-6">
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink mx-3 text-xs text-zinc-500">অথবা</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={() => handleLoginSuccess("Mosfikur Rahman", "mosfikurrahman32@gmail.com")}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-2.5 px-3 rounded-lg text-xs font-medium text-zinc-200 transition"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google দিয়ে লগইন
          </button>

          <button
            type="button"
            onClick={() => handleLoginSuccess("Mosfikur Rahman", "mosfikurrahman32@gmail.com")}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-2.5 px-3 rounded-lg text-xs font-medium text-zinc-200 transition"
          >
            <svg className="w-4 h-4 shrink-0 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub দিয়ে লগইন
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-zinc-400 mt-6">
        {signupMode ? "ইতিমধ্যে অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
        <Link
          href={signupMode ? "/signin" : "/signup"}
          className="text-emerald-400 font-semibold hover:underline"
        >
          {signupMode ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
        </Link>
      </p>
    </div>
  );
}