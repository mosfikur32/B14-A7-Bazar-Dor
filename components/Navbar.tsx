"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";

// লোকালস্টোরেজ এবং রিয়েল-টাইম ইভেন্ট ট্র্যাক করার সাবস্ক্রাইবার
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("bazar_user_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bazar_user_updated", callback);
  };
};

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ইউজারের নাম রিয়েল-টাইমে রিড করা
  const userName = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("bazar_user_name"),
    () => null
  );

  // ড্রপডাউনের বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাওয়া
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bazar_user_name");
    localStorage.removeItem("bazar_user_email");
    setDropdownOpen(false);
    window.dispatchEvent(new Event("bazar_user_updated"));
    router.push("/");
  };

  return (
    <header className="bg-[#161922] border-b border-zinc-800/80 px-6 py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* লোগো ও ব্র্যান্ড নাম */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg relative overflow-hidden flex items-center justify-center bg-emerald-600/20 border border-emerald-500/30 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-icon.png"
              alt="বাজার দর লোগো"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div>
            <div className="text-base font-bold text-white leading-none">বাজার দর</div>
            <div className="text-[10px] text-zinc-400 mt-1">রবিবার, ১১ অক্টোবর, ২০২৬</div>
          </div>
        </Link>

        {/* ডানপাশের অংশ */}
        <div className="flex items-center gap-3">
          {userName ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-[#202431] hover:bg-[#2a2f40] border border-zinc-700/60 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white transition outline-none"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  {userName.slice(0, 2)}
                </div>
                <span>{userName}</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ড্রপডাউন মেনু */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1d27] border border-zinc-700/80 rounded-xl shadow-2xl py-1.5 z-50 text-xs font-medium">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-zinc-200 hover:bg-zinc-800 hover:text-emerald-400 transition"
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    প্রোফাইল আপডেট
                  </Link>

                  <div className="border-t border-zinc-800 my-1"></div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    লগআউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-1.5 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-xl transition shadow-md"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}