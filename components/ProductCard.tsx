import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm hover:border-emerald-500 transition flex flex-col justify-between"
    >
      <div>
        <div className="text-3xl mb-2">{product.emoji || "📦"}</div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{product.name}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">{product.unit}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 block">আজকের দাম</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{product.price} টাকা</span>
        </div>
        <span className={`text-xs font-medium ${product.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
          {product.change >= 0 ? "▲" : "▼"} {Math.abs(product.change)}%
        </span>
      </div>
    </Link>
  );
}