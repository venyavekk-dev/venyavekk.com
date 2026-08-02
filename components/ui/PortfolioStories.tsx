"use client";

import { useCallback, useEffect, useState } from "react";

type StoryIndex = 0 | 1;
type StoryPhase = "closed" | "opening" | "open" | "closing";

type PortfolioStory = {
  title: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  poster?: string;
  logo?: string;
};

const stories: readonly PortfolioStory[] = [
  {
    title: "Chord Tulza",
    description:
      "A fully vibe-coded chord workspace for sketching progressions, trying song ideas, and keeping music drafts close while I write.",
    href: "https://chords.venyavekk.com",
    video: "/assets/video/compressed/chord-tulza-story-preview.webm",
    poster: "/assets/video/compressed/chord-tulza-story-preview-poster.jpg",
    logo: "/assets/chord-tulza-logo.svg"
  },
  {
    title: "Tulzy",
    description: "A curated gallery of useful AI-built tools created by designers.",
    href: "https://tools.venyavekk.com/",
    image: "/assets/tulzy-story-preview.png",
    imageAlt: "Tulzy project gallery preview"
  }
];

export type PortfolioStoriesController = {
  activeStory: StoryIndex | null;
  isOpen: boolean;
  isMounted: boolean;
  isRingReady: boolean;
  viewedStories: readonly [boolean, boolean];
  handleTrigger: () => void;
};

export function usePortfolioStories(disabled = false): PortfolioStoriesController {
  const [activeStory, setActiveStory] = useState<StoryIndex | null>(null);
  const [phase, setPhase] = useState<StoryPhase>("closed");
  const [isRingReady, setIsRingReady] = useState(false);
  const [viewedStories, setViewedStories] = useState<[boolean, boolean]>([false, false]);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const timeout = window.setTimeout(() => setIsRingReady(true), 1800);
    return () => window.clearTimeout(timeout);
  }, [disabled]);

  useEffect(() => {
    if (phase !== "opening") {
      return;
    }

    const frame = window.requestAnimationFrame(() => setPhase("open"));
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveStory(null);
      setPhase("closed");
    }, 440);

    return () => window.clearTimeout(timeout);
  }, [phase]);

  const handleTrigger = useCallback(() => {
    if (disabled || phase === "closing") {
      return;
    }

    if (activeStory === null) {
      setActiveStory(0);
      setViewedStories((viewed) => [true, viewed[1]]);
      setPhase("opening");
      return;
    }

    if (activeStory === 0) {
      setActiveStory(1);
      setViewedStories([true, true]);
      return;
    }

    setPhase("closing");
  }, [activeStory, disabled, phase]);

  return {
    activeStory,
    isOpen: phase === "open",
    isMounted: phase !== "closed",
    isRingReady,
    viewedStories,
    handleTrigger
  };
}

type TriggerProps = {
  controller: PortfolioStoriesController;
  isStatic?: boolean;
};

export function PortfolioStoryTrigger({ controller, isStatic = false }: TriggerProps) {
  const portrait = (
    <img
      src="/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"
      width={54}
      height={54}
      alt={isStatic ? "" : "Veniamin Vekk portrait"}
      className={`h-full w-full rounded-full object-cover transition duration-500 ease-out ${
        isStatic ? "" : "group-hover:scale-95 group-active:scale-[0.93]"
      } ${controller.isOpen ? "opacity-50" : ""}`}
    />
  );

  if (isStatic) {
    return (
      <span className="portfolio-story-trigger h-10 w-10 sm:h-[54px] sm:w-[54px]" aria-hidden="true">
        {portrait}
      </span>
    );
  }

  const { activeStory, viewedStories } = controller;
  const label = activeStory === 0 ? "Show Tulzy story" : activeStory === 1 ? "Close Tulzy story" : "Show Chord Tulza story";

  return (
    <button
      type="button"
      className={`portfolio-story-trigger h-10 w-10 sm:h-[54px] sm:w-[54px] group ${
        controller.isRingReady ? "is-ready" : ""
      } ${viewedStories[0] && viewedStories[1] ? "is-complete" : ""}`}
      aria-label={label}
      onClick={controller.handleTrigger}
    >
      <span className="portfolio-story-ring" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <path
            className={`portfolio-story-arc portfolio-story-arc-first ${viewedStories[0] ? "is-viewed" : ""}`}
            d="M34.02 3.07A29 29 0 0 1 34.02 60.93"
            pathLength="1"
          />
          <path
            className={`portfolio-story-arc portfolio-story-arc-second ${viewedStories[1] ? "is-viewed" : ""}`}
            d="M29.98 60.93A29 29 0 0 1 29.98 3.07"
            pathLength="1"
          />
        </svg>
      </span>
      {portrait}
    </button>
  );
}

export function PortfolioStoryPanel({ controller }: { controller: PortfolioStoriesController }) {
  if (!controller.isMounted || controller.activeStory === null) {
    return null;
  }

  const story = stories[controller.activeStory];

  return (
    <div className={`portfolio-story-stage ${controller.isOpen ? "is-open" : ""}`}>
      <article className="portfolio-story-card" aria-live="polite">
        <div className="portfolio-story-content" key={story.title}>
          <div className="portfolio-story-preview">
            {story.video ? (
              <video
                src={story.video}
                poster={story.poster}
                aria-label={`${story.title} preview`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img src={story.image} alt={story.imageAlt ?? ""} />
            )}
          </div>
          <div className="portfolio-story-copy">
            <div className="portfolio-story-heading">
              {story.logo ? <img src={story.logo} alt="" className="portfolio-story-logo" aria-hidden="true" /> : null}
              <h2>{story.title}</h2>
            </div>
            <p>{story.description}</p>
            <a href={story.href} target="_blank" rel="noopener noreferrer" className="portfolio-story-cta">
              Open
              <svg className="portfolio-story-cta-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H5.5M12 4V10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
