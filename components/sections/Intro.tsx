"use client";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { ContactChips } from "@/components/ui/ContactChips";
import { filmArtistDescription, filmLinks } from "@/lib/film-data";
import { links } from "@/lib/data";
import { musicArtistDescription, musicPlatformLinks } from "@/lib/music-data";
import Link from "next/link";
import { useEffect, useState } from "react";

type IntroProps = {
  activeSection?: "design" | "music" | "films";
  disablePortraitEffects?: boolean;
  className?: string;
};

function ChordTulzaLogo({ className = "" }: { className?: string }) {
  return <img src="/assets/chord-tulza-logo.svg" alt="" className={className} aria-hidden="true" />;
}

export function Intro({ activeSection = "design", disablePortraitEffects = false, className = "" }: IntroProps) {
  const isMusic = activeSection === "music";
  const isFilms = activeSection === "films";
  const showHobbies = false;
  const hasStaticPortrait = isMusic || isFilms || disablePortraitEffects;
  const [showAltPortrait, setShowAltPortrait] = useState(false);
  const [isPortraitLayerMounted, setIsPortraitLayerMounted] = useState(false);
  const [isPortraitRingVisible, setIsPortraitRingVisible] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [viewedStoryCount, setViewedStoryCount] = useState(0);

  useEffect(() => {
    if (hasStaticPortrait) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsPortraitRingVisible(true);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasStaticPortrait]);

  const travelStops = [
    { flag: "🇬🇧", label: "England" },
    { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", label: "Scotland" },
    { flag: "🇸🇪", label: "Sweden" },
    { flag: "🇫🇮", label: "Finland" },
    { flag: "🇩🇪", label: "Germany" },
    { flag: "🇫🇷", label: "France" },
    { flag: "🇮🇹", label: "Italy" },
    { flag: "🇪🇸", label: "Spain" },
    { flag: "🇹🇷", label: "Turkey" },
    { flag: "🇯🇵", label: "Japan" },
    { flag: "🇰🇷", label: "Korea" },
    { flag: "🇹🇭", label: "Thailand" },
    { flag: "🇵🇭", label: "Philippines" },
    { flag: "🇮🇩", label: "Bali" }
  ];

  return (
    <section className={`intro-section grid gap-8 pb-12 pt-0 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] sm:pt-6 sm:pb-16 lg:gap-12 ${className}`}>
      <aside className="self-start sm:sticky sm:top-5">
        <div className="mobile-identity flex max-w-[220px] flex-col items-start gap-3">
          {hasStaticPortrait ? (
            <span className="portrait-trigger h-10 w-10 sm:h-[54px] sm:w-[54px]" aria-hidden="true">
              <img
                src="/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"
                width={54}
                height={54}
                alt=""
                className="h-full w-full rounded-full object-cover transition duration-500 ease-out"
              />
            </span>
          ) : (
            <button
              type="button"
              className={`portrait-trigger h-10 w-10 sm:h-[54px] sm:w-[54px] group ${
                isPortraitRingVisible ? "is-ring-visible" : ""
              } ${viewedStoryCount === 2 ? "are-stories-seen" : ""}`}
              aria-label={
                activeStoryIndex === 0
                  ? "Show Tulzy story"
                  : activeStoryIndex === 1
                    ? "Close Tulzy story"
                    : "Show Chord Tulza story"
              }
              onClick={() => {
                if (activeStoryIndex === 0) {
                  setActiveStoryIndex(1);
                  setViewedStoryCount(2);
                  return;
                }

                if (activeStoryIndex === 1) {
                  setShowAltPortrait(false);
                  window.setTimeout(() => {
                    setIsPortraitLayerMounted(false);
                    setActiveStoryIndex(null);
                  }, 540);
                  return;
                }

                setActiveStoryIndex(0);
                setViewedStoryCount((count) => Math.max(count, 1));
                setIsPortraitLayerMounted(true);
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => setShowAltPortrait(true));
                });
              }}
            >
              <span className="story-ring" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <circle
                    className={`story-ring-segment story-ring-segment-first ${viewedStoryCount >= 1 ? "is-seen" : ""}`}
                    cx="32"
                    cy="32"
                    r="29"
                  />
                  <circle
                    className={`story-ring-segment story-ring-segment-second ${viewedStoryCount >= 2 ? "is-seen" : ""}`}
                    cx="32"
                    cy="32"
                    r="29"
                  />
                  <circle className="story-ring-cover" cx="32" cy="32" r="29" />
                </svg>
              </span>
              <img
                src="/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"
                width={54}
                height={54}
                alt="Veniamin Vekk portrait"
                className={`h-full w-full rounded-full object-cover transition duration-500 ease-out group-hover:scale-95 group-active:scale-[0.93] ${
                  showAltPortrait ? "opacity-50" : ""
                }`}
              />
            </button>
          )}
          <div className="space-y-0.5">
            <h1 className="font-semibold">Veniamin Vekk</h1>
            <p>
              {activeSection === "design" ? (
                <span className="italic-text">Designer</span>
              ) : (
                <Link href="/">Designer</Link>
              )}
              ,{" "}
              {activeSection === "music" ? (
                <span className="italic-text">Musician</span>
              ) : (
                <Link href="/music">Musician</Link>
              )}
              , and{"\u00a0"}
              {activeSection === "films" ? (
                <span className="italic-text">Filmmaker</span>
              ) : (
                <Link href="/films">Filmmaker</Link>
              )}
            </p>
          </div>
        </div>
      </aside>

      <div className="intro-frame relative max-w-[620px] text-bio sm:pt-[66px]">
        {!hasStaticPortrait && isPortraitLayerMounted ? (
          <div className={`portrait-animation-layer ${showAltPortrait ? "is-open" : ""}`}>
            <div
              className={`portrait-video-panel project-story-panel ${showAltPortrait ? "is-open" : ""}`}
            >
              <div className="project-story-content" key={activeStoryIndex}>
                <div className="project-story-preview">
                  {activeStoryIndex === 1 ? (
                    <img src="/assets/tulzy-story-preview.png" alt="Tulzy project gallery preview" />
                  ) : (
                    <video
                      src="/assets/video/compressed/chord-tulza-story-preview.webm"
                      poster="/assets/video/compressed/chord-tulza-story-preview-poster.jpg"
                      aria-label="Chord Tulza preview"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                  )}
                </div>
                <div className="project-story-copy">
                  <div className="project-story-heading">
                    {activeStoryIndex === 0 ? <ChordTulzaLogo className="project-story-logo" /> : null}
                    <h2>{activeStoryIndex === 1 ? "Tulzy" : "Chord Tulza"}</h2>
                  </div>
                  <p>
                    {activeStoryIndex === 1
                      ? "A curated gallery of useful AI-built tools created by designers."
                      : "A fully vibe-coded chord workspace for sketching progressions, trying song ideas, and keeping music drafts close while I write."}
                  </p>
                  <a
                    href={activeStoryIndex === 1 ? "https://tools.venyavekk.com/" : "https://chords.venyavekk.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-story-cta"
                  >
                    Open
                    <svg className="project-story-cta-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className={`intro-content-flow space-y-8 ${showAltPortrait ? "is-centered" : ""}`}>
          {isMusic ? (
            <>
              <div className="intro-copy-block space-y-8">
                {musicArtistDescription.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="intro-tools-block">
                <p className="intro-tools-label">Instruments</p>
                <a href="https://chords.venyavekk.com" target="_blank" rel="noopener noreferrer" className="tool-chip">
                  <ChordTulzaLogo className="tool-chip-logo" />
                  <span>Chord Tulza</span>
                </a>
              </div>
              <div className="intro-meta-block">
                <ContactChips links={musicPlatformLinks} ariaLabel="Music platforms" />
              </div>
            </>
          ) : isFilms ? (
            <>
              <div className="intro-copy-block space-y-8">
                {filmArtistDescription.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="intro-meta-block">
                <ContactChips links={filmLinks} ariaLabel="Video links" />
              </div>
            </>
          ) : (
            <>
              <div className="intro-copy-block space-y-8">
                <p>
                  Currently Lead Product Designer at{"\u00a0"}
                  <ExternalLink href="https://plus.yandex.ru/" className="italic-text">
                    Yandex
                  </ExternalLink>
                  , solving product design challenges and leading the design team in{"\u00a0"}the Acquisition & Activation stream
                </p>
                {showHobbies ? (
                  <p>
                    My hobbies are producing <ExternalLink href="https://band.link/venyavekk">pop music</ExternalLink>, making{" "}
                    <ExternalLink href="/films">short films</ExternalLink>, and{"\u00a0"}
                    <ExternalLink href="https://t.me/desiqn">blogging</ExternalLink> about{"\u00a0"}everything
                  </p>
                ) : null}
              </div>
              <div className="intro-meta-block space-y-8">
                <div className="space-y-2">
                  <p>🇷🇸 Belgrade, Serbia</p>
                  <div className="travel-flag-ribbon" aria-label="Countries visited, from Europe to Asia">
                    {travelStops.map((stop) => (
                      <span className="travel-flag" title={stop.label} key={stop.label}>
                        {stop.flag}
                      </span>
                    ))}
                  </div>
                </div>
                <ContactChips links={links} showEmail className="designer-contact-row" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
