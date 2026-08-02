"use client";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { ContactChips } from "@/components/ui/ContactChips";
import { StoryDeckAvatar, StoryDeckCard, useStoryDeck } from "@/components/ui/StoryDeck";
import { filmArtistDescription, filmLinks } from "@/lib/film-data";
import { links } from "@/lib/data";
import { musicArtistDescription, musicPlatformLinks } from "@/lib/music-data";
import Link from "next/link";
import { useRef } from "react";

type IntroProps = {
  activeSection?: "design" | "music" | "films";
  disablePortraitEffects?: boolean;
  className?: string;
};

function ChordTulzaLogo({ className = "" }: { className?: string }) {
  return <img src="/assets/chord-tulza-logo.svg" alt="" className={className} aria-hidden="true" />;
}

function CodexLogo({ className = "" }: { className?: string }) {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <button
      type="button"
      className={`intro-ai-brand-logo intro-ai-brand-logo-codex ${className}`}
      aria-label="Animate Codex logo"
      onClick={() => {
        const logo = logoRef.current;
        if (!logo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        logo.getAnimations().forEach((animation) => animation.cancel());
        logo.animate(
          [
            { transform: "scale(1)", offset: 0 },
            { transform: "scale(1.2)", offset: 0.48 },
            { transform: "scale(0.96)", offset: 0.72 },
            { transform: "scale(1)", offset: 1 }
          ],
          { duration: 620, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
      }}
    >
      <img src="/assets/codex-mark.png" alt="" ref={logoRef} />
    </button>
  );
}

function ClaudeLogo({ className = "" }: { className?: string }) {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <button
      type="button"
      className={`intro-ai-brand-logo intro-ai-brand-logo-claude ${className}`}
      aria-label="Animate Claude logo"
      onClick={() => {
        const logo = logoRef.current;
        if (!logo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        logo.getAnimations().forEach((animation) => animation.cancel());
        logo.animate(
          [
            { transform: "rotate(0deg) scale(1)", offset: 0 },
            { transform: "rotate(8deg) scaleX(1.14) scaleY(0.82)", offset: 0.34 },
            { transform: "rotate(-5deg) scaleX(0.86) scaleY(1.16)", offset: 0.68 },
            { transform: "rotate(0deg) scale(1)", offset: 1 }
          ],
          { duration: 680, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
      }}
    >
      <img src="/assets/claude-mark.svg" alt="" ref={logoRef} />
    </button>
  );
}

export function Intro({ activeSection = "design", disablePortraitEffects = false, className = "" }: IntroProps) {
  const isMusic = activeSection === "music";
  const isFilms = activeSection === "films";
  const showHobbies = false;
  const hasStaticPortrait = isMusic || isFilms || disablePortraitEffects;
  const storyDeck = useStoryDeck(hasStaticPortrait);

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
          <StoryDeckAvatar controller={storyDeck} isStatic={hasStaticPortrait} />
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
        <StoryDeckCard controller={storyDeck} />
        <div className="intro-content-flow space-y-8">
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
                    <span>Built with</span>
                    <span className="intro-ai-tool-pair">
                      <ClaudeLogo />
                      <span>Claude</span>
                    </span>
                    <span>and</span>
                    <span className="intro-ai-tool-pair">
                      <CodexLogo />
                      <span>Codex</span>
                    </span>
                  </p>
                  <div className="intro-ai-project-ribbon" aria-label="Independent AI projects">
                    <ExternalLink href="https://chords.venyavekk.com" className="intro-ai-project-chip">
                      <ChordTulzaLogo className="intro-ai-project-logo intro-ai-project-logo-chord" />
                      <span>Chords</span>
                    </ExternalLink>
                    <ExternalLink href="https://tools.venyavekk.com" className="intro-ai-project-chip">
                      <img
                        src="https://tools.venyavekk.com/favicon.png"
                        alt=""
                        className="intro-ai-project-logo intro-ai-project-logo-tulzy"
                        aria-hidden="true"
                      />
                      <span>Tulzy</span>
                    </ExternalLink>
                    <ExternalLink
                      href="https://github.com/venyavekk-dev/deveq/tree/main/ship-safe-pull-request"
                      className="intro-ai-project-chip"
                    >
                      <img
                        src="/assets/ship-skill-logo.svg"
                        alt=""
                        className="intro-ai-project-logo"
                        aria-hidden="true"
                      />
                      <span>Ship Skill</span>
                    </ExternalLink>
                    <ExternalLink
                      href="https://github.com/venyavekk-dev/headrush-core-toolkit"
                      className="intro-ai-project-chip intro-ai-project-chip-headrush"
                    >
                      <img
                        src="/assets/headrush-logo.png"
                        alt=""
                        className="intro-ai-project-logo-headrush"
                        aria-hidden="true"
                      />
                      <span>Skill</span>
                    </ExternalLink>
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
