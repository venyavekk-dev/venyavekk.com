"use client";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { useState } from "react";

export type CollectionItem = {
  title: string;
  description?: string;
  href?: string;
  image?: string;
  meta?: string;
  duration?: string;
  status?: "released" | "locked" | "soon";
  videoUrl?: string;
  videoMode?: "embed" | "external";
  videoPlanned?: boolean;
};

export type CollectionSectionData = {
  title: string;
  role: string;
  years: string;
  audience?: string[];
  cover?: string;
  collageImages?: string[];
  symbol?: string;
  items: CollectionItem[];
};

export function CollectionSection({ section }: { section: CollectionSectionData }) {
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  return (
    <section className="grid gap-8 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] lg:gap-12">
      <aside className="space-y-3 self-start sm:sticky sm:top-5">
        <div className="flex max-w-[220px] flex-col items-start gap-3">
          {section.collageImages ? (
            <div className="music-section-collage" aria-hidden="true">
              {section.collageImages.slice(0, 4).map((image) => (
                <img src={image} alt="" key={image} />
              ))}
            </div>
          ) : section.cover ? (
            <img src={section.cover} width={64} height={64} alt="" className="music-section-cover" />
          ) : (
            <span className="section-symbol" aria-hidden="true">
              {section.symbol ?? "♪"}
            </span>
          )}
          <div className="space-y-0.5">
            <h2 className="font-normal">{section.title}</h2>
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
      <div className="music-list">
        {section.items.map((item, index) => (
          <MusicItem
            item={item}
            index={index}
            isVideoOpen={openVideo === item.videoUrl}
            onVideoToggle={() => setOpenVideo((value) => (value === item.videoUrl ? null : item.videoUrl ?? null))}
            key={`${section.title}-${item.title}`}
          />
        ))}
      </div>
    </section>
  );
}

function MusicItem({
  item,
  index,
  isVideoOpen,
  onVideoToggle
}: {
  item: CollectionItem;
  index: number;
  isVideoOpen: boolean;
  onVideoToggle: () => void;
}) {
  const embedUrl = item.videoUrl ? getYouTubeEmbedUrl(item.videoUrl) : null;
  const opensExternally = item.videoMode === "external";
  const content = (
    <div className="music-item">
      <div className={`music-row ${item.status === "locked" ? "is-locked" : ""}`}>
        <span className="music-row-index">{index + 1}</span>
        {item.image ? <img src={item.image} width={44} height={44} alt="" className="music-row-cover" /> : null}
        <div className="min-w-0">
          <h3 className="font-semibold">
            {item.href && (item.videoUrl || item.videoPlanned) ? (
              <ExternalLink href={item.href}>{item.title}</ExternalLink>
            ) : (
              item.title
            )}
          </h3>
          {item.description ? <p>{item.description}</p> : null}
        </div>
        <div className="music-row-meta">
          {item.status === "locked" ? <span aria-label="Locked">Lock</span> : null}
          {item.videoUrl && opensExternally ? (
            <span className="music-youtube-button" aria-label={`Open video for ${item.title}`}>
              <span aria-hidden="true">▶</span>
            </span>
          ) : item.videoUrl ? (
            <button type="button" className="music-youtube-button" aria-label={`Open video for ${item.title}`} onClick={onVideoToggle}>
              <span aria-hidden="true">▶</span>
            </button>
          ) : item.videoPlanned ? (
            <span className="music-video-planned">clip planned</span>
          ) : null}
          {item.duration ? <span>{item.duration}</span> : item.meta ? <span>{item.meta}</span> : null}
        </div>
      </div>
      {!opensExternally && isVideoOpen && embedUrl ? (
        <div className="music-video-embed">
          <iframe src={embedUrl} title={`${item.title} video`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        </div>
      ) : null}
    </div>
  );

  if (opensExternally && item.videoUrl) {
    return (
      <ExternalLink href={item.videoUrl} className="block no-underline">
        {content}
      </ExternalLink>
    );
  }

  if (item.videoUrl || item.videoPlanned) {
    return content;
  }

  if (!item.href) {
    return content;
  }

  return (
    <ExternalLink href={item.href} className="block no-underline">
      {content}
    </ExternalLink>
  );
}

function getYouTubeEmbedUrl(url: string) {
  const match = url.match(/[?&]v=([^&]+)/);

  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
