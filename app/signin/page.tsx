"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন হ্যান্ডলার
  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // ইমেইল থেকে নাম বের করা বা ডিফল্ট নাম সেট করা
    const extractedName = email ? email.split("@")[0] : "ব্যবহারকারী";
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

    localStorage.setItem("bazar_user_name", formattedName);
    localStorage.setItem("bazar_user_email", email);

    window.dispatchEvent(new Event("bazar_user_updated"));
    router.push("/");
  };

  // গুগল বা গিটহাব দিয়ে সোশ্যাল সাইন ইন হ্যান্ডলার
  const handleSocialSignIn = (providerName: string) => {
    localStorage.setItem("bazar_user_name", providerName === "Google" ? "গুগল ইউজার" : "গিটহাব ইউজার");
    localStorage.setItem("bazar_user_email", providerName === "Google" ? "google.user@gmail.com" : "github.user@gmail.com");

    window.dispatchEvent(new Event("bazar_user_updated"));
    router.push("/");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 font-sans">
      <div className="bg-[#161922] border border-zinc-800/80 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">সাইন ইন করুন</h1>
        <p className="text-xs text-zinc-400 mb-6 text-center">
          বাজার দর অ্যাকাউন্টে প্রবেশ করতে আপনার তথ্য দিন।
        </p>

        {/* ইমেইল ও পাসওয়ার্ড ফর্ম */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">ইমেইল ঠিকানা</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
              className="w-full bg-[#202431] border border-zinc-700/60 rounded-xl px-4 py-2.5 text-xs text-zinc-100 outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">পাসওয়ার্ড (কমপক্ষে ৬ বা ৮ অক্ষর)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-[#202431] border border-zinc-700/60 rounded-xl px-4 py-2.5 text-xs text-zinc-100 outline-none focus:border-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-3 rounded-xl transition shadow-md mt-2"
          >
            সাইন ইন করুন
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-zinc-800"></div>
          <span className="px-3 text-[11px] text-zinc-500">অথবা সোশ্যাল অ্যাকাউন্ট</span>
          <div className="flex-1 border-t border-zinc-800"></div>
        </div>

        {/* গুগল ও গিটহাব বাটন */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialSignIn("Google")}
            className="flex items-center justify-center gap-2 bg-[#202431] hover:bg-[#2a2f40] border border-zinc-700/60 text-white text-xs font-semibold py-2.5 rounded-xl transition shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.23v3.15C3.25 21.32 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.23C.44 8.19 0 10.03 0 12s.44 3.81 1.23 5.39l4.05-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.68 1.23 6.61l4.05 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
            </svg>
            Google
          </button>

          <button
            onClick={() => handleSocialSignIn("GitHub")}
            className="flex items-center justify-center gap-2 bg-[#202431] hover:bg-[#2a2f40] border border-zinc-700/60 text-white text-xs font-semibold py-2.5 rounded-xl transition shadow-sm"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-400">
          কোনো অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-emerald-400 font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}