import { ExternalLink } from "@/components/ui/ExternalLink";
import { YandexPlusShowcase } from "@/components/sections/YandexPlusShowcase";
import type { CompanySection } from "@/lib/data";

export function ProductSection({ section }: { section: CompanySection }) {
  return (
    <section className="grid gap-8 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] lg:gap-12">
      <aside className="space-y-3 self-start sm:sticky sm:top-5">
        <div className="flex max-w-[170px] flex-col items-start gap-3">
          <img
            src={section.logo}
            width={52}
            height={52}
            alt=""
            className="h-10 w-10 rounded-lg object-cover transition duration-200 hover:scale-95 active:scale-[0.93] sm:h-[52px] sm:w-[52px]"
          />
          <div className="space-y-0.5">
            <h2 className="font-normal">{section.company}</h2>
            <p>{section.role}</p>
            <p>{section.years}</p>
            {section.audience ? (
              <div className="pt-2 text-muted">
                {section.audience.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </aside>
      <div className={`grid grid-cols-2 gap-4 sm:gap-5 ${section.company.includes("NDA") ? "mobile-nda-grid" : ""}`}>
        {section.hideProjects
          ? null
          : section.projects.map((project) => (
              <article key={project.title} className="project-card group">
                {project.href ? (
                  <ExternalLink href={project.href} className="block h-full no-underline">
                    <ProjectContent project={project} />
                  </ExternalLink>
                ) : (
                  <ProjectContent project={project} />
                )}
              </article>
            ))}
        {section.yandexPlusShowcase ? (
          <div className="col-span-2">
            <YandexPlusShowcase
              productDesignerImages={section.yandexPlusShowcase.productDesignerImages}
              designLeadImages={section.yandexPlusShowcase.designLeadImages}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectContent({ project }: { project: CompanySection["projects"][number] }) {
  return (
    <>
      <div className="project-media-card">
        <div
          className="card project-media relative w-full"
          style={{
            aspectRatio: project.aspectRatio ?? "1.06",
            maxWidth: project.maxWidth ? `${project.maxWidth}px` : undefined
          }}
        >
          {project.video ? (
            <video
              src={project.video}
              className="absolute left-1/2 top-1/2 z-20 h-[90%] w-[86.9%] -translate-x-1/2 -translate-y-1/2 rounded-[21px] object-cover transition duration-300 group-hover:scale-[1.015]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : null}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${project.video ? "z-0" : "z-10"} transition duration-300 group-hover:scale-[1.015] ${
              project.fit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
        </div>
      </div>
      <div className="project-copy mt-3 space-y-1 sm:mt-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </>
  );
}
