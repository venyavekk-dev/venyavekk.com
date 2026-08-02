import { Footer } from "@/components/Footer";
import { Intro } from "@/components/sections/Intro";
import { ProductSection } from "@/components/sections/ProductSection";
import { PublicTalks } from "@/components/sections/PublicTalks";
import { Testimonials } from "@/components/sections/Testimonials";
import { companySections, links } from "@/lib/data";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-5 py-5 sm:px-8 lg:px-10">
      <Intro />
      <div className="space-y-12 pt-12 sm:space-y-16 sm:pt-16">
        {companySections.map((section) => (
          <ProductSection key={section.company} section={section} />
        ))}
        <Testimonials />
        <PublicTalks />
      </div>
      <div className="block pt-10 sm:hidden">
        <Footer links={links} showEmail />
      </div>
      <div className="hidden sm:block">
        <Footer links={links} showEmail />
      </div>
    </main>
  );
}
