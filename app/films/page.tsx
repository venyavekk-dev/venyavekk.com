import { FilmSection } from "@/components/sections/FilmSection";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/sections/Intro";
import { filmLinks, filmSections } from "@/lib/film-data";

export default function FilmsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
      <Intro activeSection="films" />

      <div className="space-y-12 pt-12 sm:space-y-16 sm:pt-16">
        {filmSections.map((section) => (
          <FilmSection section={section} key={`${section.title}-${section.years}`} />
        ))}
      </div>
      <Footer links={filmLinks} />
    </main>
  );
}
