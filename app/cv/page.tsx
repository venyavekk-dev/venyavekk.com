import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { links } from "@/lib/data";
import { cvExperience, cvFiles, cvLanguages, cvProfile, cvSkills } from "@/lib/cv-data";

export const metadata: Metadata = {
  title: "CV - Veniamin Vekk",
  description: "Veniamin Vekk's CV — product design experience, skills, and downloadable PDF/DOCX."
};

export default function CvPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[820px] px-5 py-5 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-center gap-2 pb-8 pt-2 sm:pt-4">
        <a href={cvFiles.pdf} download className="soft-chip">
          Download PDF
        </a>
        <a href={cvFiles.docx} download className="soft-chip">
          Download DOCX
        </a>
      </div>

      <article className="card space-y-10 text-body">
        <header className="space-y-1">
          <h1 className="text-bio font-semibold">{cvProfile.name}</h1>
          <p className="text-muted">{cvProfile.title}</p>
          <p className="text-muted text-sm">
            {cvProfile.location} &nbsp;•&nbsp; {cvProfile.email} &nbsp;•&nbsp; {cvProfile.linkedin} &nbsp;•&nbsp; {cvProfile.site}
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Summary</h2>
          <p>{cvProfile.summary}</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Experience</h2>
          {cvExperience.map((job) => (
            <div key={job.role} className="space-y-1">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-semibold">{job.role}</p>
                <p className="text-muted text-sm">{job.dates}</p>
              </div>
              <ul className="list-disc space-y-1 pl-5">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Skills</h2>
          <div className="space-y-2">
            {cvSkills.map((skill) => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Languages</h2>
          <p>{cvLanguages}</p>
        </section>
      </article>

      <Footer links={links} showEmail />
    </main>
  );
}
