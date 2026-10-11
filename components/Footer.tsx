export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-6 mt-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-sm font-medium text-zinc-200">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">
            সকল দাম সম্ভাব্য, বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
}