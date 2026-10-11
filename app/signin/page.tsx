"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "লগইন ব্যর্থ হয়েছে");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
          বাজার দর
        </h1>

        <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
          আপনার অ্যাকাউন্টে সাইন ইন করুন
        </h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="mb-1 block text-gray-700">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              className="w-full rounded-lg border p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full rounded-lg border p-3 text-gray-900"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-700">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}