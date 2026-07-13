import { ExternalLink } from "@/components/ui/ExternalLink";
import type { CollectionSectionData } from "@/components/sections/CollectionSection";

export function FilmSection({ section }: { section: CollectionSectionData }) {
  return (
    <section className="grid gap-8 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] lg:gap-12">
      <aside className="self-start sm:sticky sm:top-5">
        <div className="film-section-meta">
          <p>{section.years}</p>
          {section.audience ? (
            <div className="text-muted">
              {section.audience.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          ) : null}
        </div>
      </aside>

      <div className="film-grid">
        {section.items.map((item) => (
          <ExternalLink href={item.videoUrl ?? item.href ?? "#"} className="film-card" key={item.title}>
            {item.image ? <img src={item.image} alt="" className="film-card-image" /> : null}
            <div className="film-card-info">
              <div>
                <h2>{item.title}</h2>
                {item.description ? <p>{item.description}</p> : null}
              </div>
              <span className="music-youtube-button" aria-hidden="true">
                ▶
              </span>
            </div>
          </ExternalLink>
        ))}
      </div>
    </section>
  );
}
