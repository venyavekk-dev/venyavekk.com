import { CollectionSection } from "@/components/sections/CollectionSection";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/sections/Intro";
import { musicSections } from "@/lib/music-data";

export default function MusicPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
      <Intro activeSection="music" />

      <div className="space-y-12 pt-12 sm:space-y-16 sm:pt-16">
        {musicSections.map((section) => (
          <CollectionSection section={section} key={`${section.title}-${section.years}`} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
