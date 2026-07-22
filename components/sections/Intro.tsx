"use client";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
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
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="16" fill="currentColor" opacity="0.12" />
      <path
        d="M15.5 31.5V16.5M24 31.5V16.5M32.5 31.5V16.5M12.5 20.5H35.5M12.5 27.5H35.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.6"
      />
      <circle cx="15.5" cy="27.5" r="2.3" fill="currentColor" />
      <circle cx="24" cy="20.5" r="2.3" fill="currentColor" />
      <circle cx="32.5" cy="27.5" r="2.3" fill="currentColor" />
    </svg>
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
              role="button"
              tabIndex={showAltPortrait ? 0 : -1}
              className={`portrait-video-panel chord-story-panel ${showAltPortrait ? "is-open" : ""}`}
              aria-label="Hide Chord Tulza preview"
              aria-disabled={!showAltPortrait}
              onClick={() => {
                setShowAltPortrait(false);
                window.setTimeout(() => setIsPortraitLayerMounted(false), 540);
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                  return;
                }

                event.preventDefault();
                setShowAltPortrait(false);
                window.setTimeout(() => setIsPortraitLayerMounted(false), 540);
              }}
            >
              <div className="chord-story-preview" aria-hidden="true">
                <iframe src="https://chords-xi.vercel.app/" title="Chord Tulza preview" loading="lazy" />
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
                <Link href="/chords" className="tool-chip">
                  <ChordTulzaLogo className="tool-chip-logo" />
                  <span>Chord Tulza</span>
                </Link>
              </div>
              <div className="intro-meta-block">
                <nav aria-label="Music platforms" className="contact-chip-row flex flex-wrap gap-2">
                  {musicPlatformLinks.map((link) => (
                    <ExternalLink href={link.href} className="soft-chip" key={link.label}>
                      {link.label}
                    </ExternalLink>
                  ))}
                </nav>
              </div>
            </>
          ) : isFilms ? (
            <>
              <div className="intro-copy-block space-y-8">
                {filmArtistDescription.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="intro-meta-block">
                <nav aria-label="Video links" className="contact-chip-row flex flex-wrap gap-2">
                  {filmLinks.map((link) => (
                    <ExternalLink href={link.href} className="soft-chip" key={link.label}>
                      {link.label}
                    </ExternalLink>
                  ))}
                </nav>
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
                <nav aria-label="Contacts" className="contact-chip-row designer-contact-row flex flex-wrap gap-2">
                  {links.map((link) => (
                    <ExternalLink href={link.href} className="soft-chip" key={link.label}>
                      {link.label}
                    </ExternalLink>
                  ))}
                  <EmailCopyButton className="soft-chip" label="Email" />
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
