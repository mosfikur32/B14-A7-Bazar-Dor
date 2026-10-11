import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import type { Product } from "@/lib/products";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product: Product | undefined = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen font-sans">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl">{product.emoji || "📦"}</span>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{product.name}</h1>
                <p className="text-sm text-zinc-500 mt-1">{product.subtitle || "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর তুলনা"}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-medium">
                {product.unit}
              </span>
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-6 rounded-xl text-center min-w-[200px] shadow-sm">
            <span className="text-xs uppercase tracking-wider opacity-90">আজকের দাম</span>
            <div className="text-3xl font-bold mt-1">{product.price} টাকা</div>
            <span className="text-xs mt-1 block opacity-95">▲ {product.change || 0}% পরিবর্তন</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
            <span className="text-xs text-zinc-500 block mb-1">সর্বনিম্ন দাম</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{product.minPrice || product.price - 5} টাকা</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
            <span className="text-xs text-zinc-500 block mb-1">সর্বোচ্চ দাম</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{product.maxPrice || product.price + 10} টাকা</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
            <span className="text-xs text-zinc-500 block mb-1">গড় দাম</span>
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{product.avgPrice || product.price} টাকা</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">বাজারভিত্তিক আজকের দাম</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-500 uppercase tracking-wider">
                <th className="p-4">বাজারের নাম</th>
                <th className="p-4">বিবরণ / ধরণ</th>
                <th className="p-4">খুচরা মূল্য</th>
                <th className="p-4">পাইকারি মূল্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="p-4 font-medium">কারওয়ান বাজার</td>
                <td className="p-4">সেরা মান</td>
                <td className="p-4 font-semibold text-emerald-600">{product.price} টাকা</td>
                <td className="p-4">{product.price - 5} টাকা</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">নিউ মার্কেট</td>
                <td className="p-4">সাধারণ</td>
                <td className="p-4">{product.price + 2} টাকা</td>
                <td className="p-4">{product.price - 3} টাকা</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">যাত্রাবাড়ী বাজার</td>
                <td className="p-4">পাইকারি</td>
                <td className="p-4">{product.price + 4} টাকা</td>
                <td className="p-4">{product.price - 2} টাকা</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}