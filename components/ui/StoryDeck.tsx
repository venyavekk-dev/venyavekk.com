"use client";

import { useCallback, useState } from "react";

type StoryId = "chords" | "tulzy";

type Story = {
  id: StoryId;
  title: string;
  description: string;
  href: string;
  logo?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  poster?: string;
};

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
    image: "/assets/tulzy-story-preview.png",
    imageAlt: "Tulzy project gallery preview"
  }
];

export type StoryDeckController = {
  currentStory: StoryId | null;
  viewed: readonly [boolean, boolean];
  advance: () => void;
};

export function useStoryDeck(disabled = false): StoryDeckController {
  const [currentStory, setCurrentStory] = useState<StoryId | null>(null);
  const [viewed, setViewed] = useState<[boolean, boolean]>([false, false]);

  const advance = useCallback(() => {
    if (disabled) {
      return;
    }

    if (currentStory === null) {
      setViewed((current) => [true, current[1]]);
      setCurrentStory("chords");
      return;
    }

    if (currentStory === "chords") {
      setViewed([true, true]);
      setCurrentStory("tulzy");
      return;
    }

    setCurrentStory(null);
  }, [currentStory, disabled]);

  return { currentStory, viewed, advance };
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

  const label =
    controller.currentStory === "chords"
      ? "Show Tulzy story"
      : controller.currentStory === "tulzy"
        ? "Close Tulzy story"
        : "Show Chord Tulza story";

  return (
    <button
      type="button"
      className="vv-storydeck-avatar h-10 w-10 sm:h-[54px] sm:w-[54px] group"
      aria-label={label}
      onClick={controller.advance}
    >
      <span className="vv-storydeck-ring" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <circle
            className={`vv-storydeck-half vv-storydeck-half-one ${controller.viewed[0] ? "is-viewed" : ""}`}
            cx="32"
            cy="32"
            r="29"
            pathLength="100"
          />
          <circle
            className={`vv-storydeck-half vv-storydeck-half-two ${controller.viewed[1] ? "is-viewed" : ""}`}
            cx="32"
            cy="32"
            r="29"
            pathLength="100"
          />
        </svg>
      </span>
      {portrait}
    </button>
  );
}

export function StoryDeckCard({ controller }: { controller: StoryDeckController }) {
  if (controller.currentStory === null) {
    return null;
  }

  const story = storyList.find((item) => item.id === controller.currentStory);
  if (!story) {
    return null;
  }

  return (
    <article className="vv-storydeck-card" aria-live="polite">
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
    </article>
  );
}
