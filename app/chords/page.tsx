import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chords - Veniamin Vekk",
  description: "A chord workspace by Veniamin Vekk"
};

export default function ChordsPage() {
  return (
    <main className="relative min-h-screen bg-[#1c1c1c]">
      <iframe
        src="https://chords-xi.vercel.app/?embed=1&settings=hidden"
        title="Chords"
        className="h-screen w-full border-0"
        allow="clipboard-read; clipboard-write"
      />
      <Link
        href="/chords/about"
        className="quiet-link fixed bottom-4 right-4 z-10 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white/80 backdrop-blur transition-colors hover:text-white"
      >
        Как это устроено
      </Link>
    </main>
  );
}
