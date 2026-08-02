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

function CodexLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`intro-ai-brand-logo intro-ai-brand-logo-codex ${className}`} aria-hidden="true">
      <img src="/assets/codex-mark.png" alt="" />
    </span>
  );
}

function ClaudeLogo({ morphKey, onClick, className = "" }: { morphKey: number; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      className={`intro-ai-brand-logo intro-ai-brand-logo-claude ${className}`}
      aria-label="Animate Claude logo"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none" className={morphKey > 0 ? "is-morphing" : ""} key={morphKey} aria-hidden="true">
        <line className="claude-ray claude-ray-1" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-2" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-3" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-4" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-5" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-6" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-7" x1="12" y1="3.25" x2="12" y2="9.1" />
        <line className="claude-ray claude-ray-8" x1="12" y1="3.25" x2="12" y2="9.1" />
      </svg>
    </button>
  );
}

export function Intro({ activeSection = "design", disablePortraitEffects = false, className = "" }: IntroProps) {
  const isMusic = activeSection === "music";
  const isFilms = activeSection === "films";
  const showHobbies = false;
  const hasStaticPortrait = isMusic || isFilms || disablePortraitEffects;
  const [showAltPortrait, setShowAltPortrait] = useState(false);
  const [isPortraitLayerMounted, setIsPortraitLayerMounted] = useState(false);
  const [isPortraitRingVisible, setIsPortraitRingVisible] = useState(false);
  const [hasPortraitBeenOpened, setHasPortraitBeenOpened] = useState(false);
  const [claudeLogoMorphKey, setClaudeLogoMorphKey] = useState(0);

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
              } ${hasPortraitBeenOpened ? "is-ring-seen" : ""}`}
              aria-label={showAltPortrait ? "Hide Chord Tulza preview" : "Show Chord Tulza preview"}
              onClick={() => {
                setHasPortraitBeenOpened(true);
                if (showAltPortrait || isPortraitLayerMounted) {
                  setShowAltPortrait(false);
                  window.setTimeout(() => setIsPortraitLayerMounted(false), 540);
                  return;
                }

                setIsPortraitLayerMounted(true);
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => setShowAltPortrait(true));
                });
              }}
            >
              <span className="story-ring" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <circle className="story-ring-track" cx="32" cy="32" r="29" />
                  <circle className="story-ring-progress" cx="32" cy="32" r="29" />
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
              className={`portrait-video-panel chord-story-panel ${showAltPortrait ? "is-open" : ""}`}
            >
              <div className="chord-story-preview">
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
              </div>
              <div className="chord-story-copy">
                <div className="chord-story-heading">
                  <ChordTulzaLogo className="chord-story-logo" />
                  <h2>Chord Tulza</h2>
                </div>
                <p>
                  A fully vibe-coded chord workspace for sketching progressions, trying song ideas, and keeping music
                  drafts close while I write.
                </p>
                <a href="https://chords.venyavekk.com" target="_blank" rel="noopener noreferrer" className="chord-story-cta">
                  Open
                  <svg className="chord-story-cta-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
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
                <div className="intro-ai-block space-y-2">
                  <p className="intro-ai-credit">
                    Made with <ClaudeLogo morphKey={claudeLogoMorphKey} onClick={() => setClaudeLogoMorphKey((key) => key + 1)} /> Claude and <CodexLogo /> Codex
                  </p>
                  <div className="intro-ai-project-ribbon" aria-label="Independent AI projects">
                    <ExternalLink href="https://chords.venyavekk.com" className="intro-ai-project-chip">
                      <ChordTulzaLogo className="intro-ai-project-logo intro-ai-project-logo-chord" />
                      <span>Chord Tulza</span>
                    </ExternalLink>
                    <ExternalLink href="https://tools.venyavekk.com" className="intro-ai-project-chip">
                      <span className="intro-ai-project-logo intro-ai-project-logo-tulzy" aria-hidden="true">Т</span>
                      <span>Tulzy</span>
                    </ExternalLink>
                    <span className="intro-ai-project-chip">
                      <span className="intro-ai-project-logo intro-ai-project-logo-headrush" aria-hidden="true">HR</span>
                      <span>HeadRush Skill</span>
                    </span>
                  </div>
                </div>
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
