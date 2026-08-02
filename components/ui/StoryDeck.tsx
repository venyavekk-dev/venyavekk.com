"use client";

import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

type PresenceStep = "closed" | "opening" | "open" | "closing";
type SwitchStep = "idle" | "shrinking" | "growing";

type Story = {
  id: string;
  title: string;
  description: string;
  href: string;
  logo?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  poster?: string;
};

// Add future projects here; navigation and ring segments are derived from this list.
const storyList: readonly Story[] = [
  {
    id: "chords",
    title: "Chord Tulza",
    description:
      "A fully vibe-coded chord workspace for sketching progressions, trying song ideas, and keeping music drafts close while I write.",
    href: "https://chords.venyavekk.com",
    logo: "/assets/chord-tulza-logo.svg",
    video: "/assets/video/compressed/chord-tulza-story-preview.webm",
    poster: "/assets/video/compressed/chord-tulza-story-preview-poster.jpg"
  },
  {
    id: "tulzy",
    title: "Tulzy",
    description: "A curated gallery of useful AI-built tools created by designers.",
    href: "https://tools.venyavekk.com/",
    video: "/assets/video/compressed/tulzy-story-preview.webm"
  }
];

export type StoryDeckController = {
  activeIndex: number;
  presenceStep: PresenceStep;
  switchStep: SwitchStep;
  viewedCount: number;
  advance: () => void;
  finishCardTransition: () => void;
};

export function useStoryDeck(disabled = false): StoryDeckController {
  const [activeIndex, setActiveIndex] = useState(0);
  const [presenceStep, setPresenceStep] = useState<PresenceStep>("closed");
  const [switchStep, setSwitchStep] = useState<SwitchStep>("idle");
  const [viewedCount, setViewedCount] = useState(0);

  const advance = useCallback(() => {
    if (disabled || switchStep !== "idle" || presenceStep === "opening" || presenceStep === "closing") {
      return;
    }

    if (presenceStep === "closed") {
      setActiveIndex(0);
      setViewedCount((count) => Math.max(count, 1));
      setPresenceStep("opening");
      return;
    }

    if (activeIndex < storyList.length - 1) {
      setViewedCount((count) => Math.max(count, activeIndex + 2));
      setSwitchStep("shrinking");
      return;
    }

    setPresenceStep("closing");
  }, [activeIndex, disabled, presenceStep, switchStep]);

  const finishCardTransition = useCallback(() => {
    if (switchStep === "shrinking") {
      setActiveIndex((index) => Math.min(index + 1, storyList.length - 1));
      setSwitchStep("growing");
      return;
    }

    if (switchStep === "growing") {
      setSwitchStep("idle");
      return;
    }

    if (presenceStep === "opening") {
      setPresenceStep("open");
      return;
    }

    if (presenceStep === "closing") {
      setPresenceStep("closed");
    }
  }, [presenceStep, switchStep]);

  return { activeIndex, presenceStep, switchStep, viewedCount, advance, finishCardTransition };
}

type StoryDeckAvatarProps = {
  controller: StoryDeckController;
  isStatic?: boolean;
};

export function StoryDeckAvatar({ controller, isStatic = false }: StoryDeckAvatarProps) {
  const portrait = (
    <img
      src="/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"
      width={54}
      height={54}
      alt={isStatic ? "" : "Veniamin Vekk portrait"}
      className={`h-full w-full rounded-full object-cover ${isStatic ? "" : "group-hover:scale-95 group-active:scale-[0.93]"}`}
    />
  );

  if (isStatic) {
    return (
      <span className="vv-storydeck-avatar h-10 w-10 sm:h-[54px] sm:w-[54px]" aria-hidden="true">
        {portrait}
      </span>
    );
  }

  const isClosed = controller.presenceStep === "closed";
  const isTransitioning =
    controller.presenceStep === "opening" || controller.presenceStep === "closing" || controller.switchStep !== "idle";
  const nextStory = storyList[controller.activeIndex + 1];
  const label = isClosed
    ? `Show ${storyList[0].title} story`
    : nextStory
      ? `Show ${nextStory.title} story`
      : `Close ${storyList[controller.activeIndex].title} story`;
  const segmentSpan = 100 / storyList.length;
  const segmentLength = segmentSpan - 2;
  const segmentDuration = Math.max(180, 1120 / storyList.length);

  return (
    <button
      type="button"
      className="vv-storydeck-avatar h-10 w-10 sm:h-[54px] sm:w-[54px] group"
      aria-label={label}
      onClick={controller.advance}
      disabled={isTransitioning}
    >
      <span className="vv-storydeck-ring" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          {storyList.map((story, index) => (
            <circle
              className={`vv-storydeck-segment ${index < controller.viewedCount ? "is-viewed" : ""}`}
              cx="32"
              cy="32"
              r="29"
              pathLength="100"
              key={story.id}
              style={
                {
                  "--vv-storydeck-delay": `${index * segmentDuration}ms`,
                  "--vv-storydeck-duration": `${segmentDuration}ms`,
                  "--vv-storydeck-length": segmentLength,
                  "--vv-storydeck-rotation": `${-90 + index * (360 / storyList.length)}deg`
                } as CSSProperties
              }
            />
          ))}
        </svg>
      </span>
      {portrait}
    </button>
  );
}

export function StoryDeckCard({ controller }: { controller: StoryDeckController }) {
  const cardRef = useRef<HTMLElement>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const story = storyList[controller.activeIndex];

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const updateHeight = () => setCardHeight(card.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(card);
    return () => observer.disconnect();
  }, [story.id]);

  if (!story) {
    return null;
  }

  const isExpanded = controller.presenceStep === "opening" || controller.presenceStep === "open";
  const isInteractive = controller.presenceStep === "open" && controller.switchStep === "idle";

  return (
    <div
      className={`vv-storydeck-slot ${isExpanded ? "is-open" : ""}`}
      aria-hidden={!isInteractive}
      inert={!isInteractive ? true : undefined}
      style={{ height: isExpanded ? `${cardHeight}px` : "0px" }}
    >
      <article
        className={`vv-storydeck-card is-${controller.switchStep}`}
        aria-live="polite"
        ref={cardRef}
        onTransitionEnd={(event) => {
          if (event.currentTarget === event.target && event.propertyName === "transform") {
            controller.finishCardTransition();
          }
        }}
      >
        <div
          className="vv-storydeck-sheet"
        >
          <div className="vv-storydeck-preview">
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
          <div className="vv-storydeck-copy">
            <div className="vv-storydeck-heading">
              {story.logo ? <img src={story.logo} alt="" className="vv-storydeck-logo" aria-hidden="true" /> : null}
              <h2>{story.title}</h2>
            </div>
            <p>{story.description}</p>
            <a href={story.href} target="_blank" rel="noopener noreferrer" className="vv-storydeck-link">
              Open
              <svg className="vv-storydeck-link-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
