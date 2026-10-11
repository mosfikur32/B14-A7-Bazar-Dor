export interface Product {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  price: number;
  unit: string;
  change: number;
  emoji?: string;
  subtitle?: string;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
}

export const categories = [
  { id: 1, name: "চাল", slug: "chal", emoji: "🍚" },
  { id: 2, name: "ডাল", slug: "lentil", emoji: "🫘" },
  { id: 3, name: "তেল", slug: "oil", emoji: "🫙" },
  { id: 4, name: "সবজি", slug: "vegetable", emoji: "🥔" },
  { id: 5, name: "মাংস", slug: "meat", emoji: "🥩" },
  { id: 6, name: "মাছ", slug: "fish", emoji: "🐟" },
  { id: 7, name: "ডিম-দুধ", slug: "egg-milk", emoji: "🥚" },
  { id: 8, name: "মসলা", slug: "spice", emoji: "🧄" },
];

export const products: Product[] = [
  // চাল (chal)
  { id: 1, name: "স্বর্ণমাছি চাল", slug: "swornomochi-chal", category: "chal", price: 48, unit: "প্রতি কেজি", change: 2.1, emoji: "🍚", subtitle: "সেরা মানের দেশি চাল", minPrice: 45, maxPrice: 52, avgPrice: 48 },
  { id: 2, name: "মিনিকেট চাল", slug: "miniket-chal", category: "chal", price: 66, unit: "প্রতি কেজি", change: 1.5, emoji: "🍚", subtitle: "চিকন চাল", minPrice: 62, maxPrice: 70, avgPrice: 66 },
  { id: 3, name: "নাজির চাল", slug: "najir-chal", category: "chal", price: 74, unit: "প্রতি কেজি", change: 0, emoji: "🍚", subtitle: "নাজিরশাইল চাল", minPrice: 70, maxPrice: 78, avgPrice: 74 },
  { id: 4, name: "বাটিম সাইজ চাল", slug: "batim-chal", category: "chal", price: 66, unit: "প্রতি কেজি", change: 3.1, emoji: "🍚", subtitle: "মোটা চাল", minPrice: 63, maxPrice: 69, avgPrice: 66 },

  // ডাল (lentil)
  { id: 5, name: "মসুর ডাল", slug: "mosur-dal", category: "lentil", price: 130, unit: "প্রতি কেজি", change: 0.5, emoji: "🫘", subtitle: "ভাঙা মসুর ডাল", minPrice: 125, maxPrice: 135, avgPrice: 130 },
  { id: 6, name: "মুগ ডাল", slug: "mug-dal", category: "lentil", price: 155, unit: "প্রতি কেজি", change: -1.2, emoji: "🫘", subtitle: "সোনালী মুগ ডাল", minPrice: 150, maxPrice: 160, avgPrice: 155 },
  { id: 7, name: "ছোলা", slug: "chhola", category: "lentil", price: 120, unit: "প্রতি কেজি", change: 1.8, emoji: "🫘", subtitle: "দেশি ছোলা", minPrice: 115, maxPrice: 125, avgPrice: 120 },

  // তেল (oil)
  { id: 8, name: "সয়াবিন তেল", slug: "soyabean-oil", category: "oil", price: 192, unit: "প্রতি লিটার", change: 2.1, emoji: "🫙", subtitle: "বটেল সয়াবিন তেল", minPrice: 185, maxPrice: 198, avgPrice: 192 },
  { id: 9, name: "পাম তেল", slug: "palm-oil", category: "oil", price: 168, unit: "প্রতি কেজি", change: -2.3, emoji: "🫙", subtitle: "পাম সুপার তেল", minPrice: 162, maxPrice: 174, avgPrice: 168 },

  // সবজি (vegetable)
  { id: 10, name: "আলু", slug: "alu", category: "vegetable", price: 30, unit: "প্রতি কেজি", change: -1.5, emoji: "🥔", subtitle: "নতুন আলু", minPrice: 28, maxPrice: 35, avgPrice: 30 },
  { id: 11, name: "পেঁয়াজ", slug: "peyaj", category: "vegetable", price: 70, unit: "প্রতি কেজি", change: 3.0, emoji: "🧅", subtitle: "দেশি পেঁয়াজ", minPrice: 65, maxPrice: 75, avgPrice: 70 },
  { id: 12, name: "বেগুন", slug: "begun", category: "vegetable", price: 44, unit: "প্রতি কেজি", change: 4.8, emoji: "🍆", subtitle: "গোল বেগুন", minPrice: 40, maxPrice: 48, avgPrice: 44 },

  // মাছ (fish)
  { id: 13, name: "রুই মাছ", slug: "rui-fish", category: "fish", price: 46, unit: "প্রতি কেজি", change: 4.5, emoji: "🐟", subtitle: "তাজা রুই মাছ", minPrice: 420, maxPrice: 480, avgPrice: 450 },
  { id: 14, name: "ইলিশ মাছ", slug: "ilish-fish", category: "fish", price: 1850, unit: "প্রতি কেজি", change: 0.8, emoji: "🐟", subtitle: "পদ্মার ইলিশ", minPrice: 1700, maxPrice: 2000, avgPrice: 1850 },

  // মাংস (meat)
  { id: 15, name: "মুরগির মাংস", slug: "chicken-meat", category: "meat", price: 225, unit: "প্রতি কেজি", change: 1.1, emoji: "🥩", subtitle: "ব্রয়লার মুরগি", minPrice: 215, maxPrice: 235, avgPrice: 225 },
  { id: 16, name: "গরুর মাংস", slug: "beef-meat", category: "meat", price: 780, unit: "প্রতি কেজি", change: -0.5, emoji: "🥩", subtitle: "খাঁটি গরুর মাংস", minPrice: 750, maxPrice: 800, avgPrice: 780 },

  // ডিম-দুধ (egg-milk)
  { id: 17, name: "ডিম", slug: "egg", category: "egg-milk", price: 148, unit: "প্রতি ডজন", change: 1.9, emoji: "🥚", subtitle: "ফার্মের লাল ডিম", minPrice: 144, maxPrice: 152, avgPrice: 148 },
  { id: 18, name: "দুধ", slug: "milk", category: "egg-milk", price: 102, unit: "প্রতি লিটার", change: 0.5, emoji: "🥛", subtitle: "প্যাকেট তরল দুধ", minPrice: 98, maxPrice: 105, avgPrice: 102 },

  // মসলা (spice)
  { id: 19, name: "রসুন", slug: "rosun", category: "spice", price: 125, unit: "প্রতি কেজি", change: 1.8, emoji: "🧄", subtitle: "দেশি রসুন", minPrice: 120, maxPrice: 130, avgPrice: 125 },
  { id: 20, name: "আদা", slug: "ada", category: "spice", price: 85, unit: "প্রতি কেজি", change: 2.1, emoji: "🫚", subtitle: "চীনা আদা", minPrice: 80, maxPrice: 90, avgPrice: 85 }
];

export function money(amount: number) {
  return `${amount} টাকা`;
}

export function pct(val: number) {
  return `${val > 0 ? "▲" : "▼"} ${Math.abs(val)}%`;
}