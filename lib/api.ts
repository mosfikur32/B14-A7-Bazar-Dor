import { categories as demoCategories, products as demoProducts } from "@/lib/products";
import type { Product } from "@/lib/products";

export type Category = { slug: string; name: string; emoji: string; id?: string | number };

export async function getCategories(): Promise<Category[]> {
  return demoCategories;
}

export async function getProducts(): Promise<Product[]> {
  return demoProducts;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  // ক্যাটাগরি স্লাগ অনুযায়ী নিখুঁতভাবে ফিল্টার করা
  return demoProducts.filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase());
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return demoProducts.find((p) => p.slug === slug);
}