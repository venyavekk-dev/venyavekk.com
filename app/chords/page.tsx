import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chords - Veniamin Vekk",
  description: "A chord workspace by Veniamin Vekk"
};

export default function ChordsPage() {
  return (
    <main className="min-h-screen bg-[#1c1c1c]">
      <iframe
        src="https://chords-xi.vercel.app/?embed=1&settings=hidden"
        title="Chords"
        className="h-screen w-full border-0"
        allow="clipboard-read; clipboard-write"
      />
    </main>
  );
}
