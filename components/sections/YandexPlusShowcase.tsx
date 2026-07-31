"use client";

import { useEffect, useState } from "react";

type YandexPlusShowcaseProps = {
  productDesignerImages: string[];
  designLeadImages: string[];
};

const CYCLE_MS = 2000;
const TRANSITION_MS = 550;

export function YandexPlusShowcase({ productDesignerImages, designLeadImages }: YandexPlusShowcaseProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="yandex-plus-showcase" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <ShowcaseColumn
        title="As a Senior Product Designer"
        subtitle="I design subscription acquisition across Yandex services - from paywalls to checkout, creating clear paths that help people join and stay with Yandex Plus."
        images={productDesignerImages}
        isPaused={isPaused}
      />
      <ShowcaseColumn
        title="As a Product Design Lead"
        subtitle="I lead a team of 4 designers, shaping the way we work and helping each designer grow into a stronger, more independent contributor."
        images={designLeadImages}
        isPaused={isPaused}
      />
    </div>
  );
}

function ShowcaseColumn({ title, subtitle, images, isPaused }: { title: string; subtitle: string; images: string[]; isPaused: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isPaused || images.length <= 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      setExitingIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % images.length);
    }, CYCLE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, images.length]);

  useEffect(() => {
    if (exitingIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => setExitingIndex(null), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [exitingIndex]);

  return (
    <article className="project-card yandex-plus-showcase-column group">
      <div className="project-media-card yandex-plus-showcase-card">
        <div className="yandex-plus-showcase-frame">
          {images.map((image, index) => (
            <img
              className={index === activeIndex ? "is-active" : index === exitingIndex ? "is-exiting" : ""}
              src={image}
              alt=""
              key={image}
            />
          ))}
        </div>
      </div>
      <div className="project-copy mt-3 space-y-1 sm:mt-4">
        <h3 className="font-semibold">{title}</h3>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}
