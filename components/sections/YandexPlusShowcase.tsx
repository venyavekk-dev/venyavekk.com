"use client";

import { useEffect, useState } from "react";

type YandexPlusShowcaseProps = {
  productDesignerImages: string[];
  designLeadImages: string[];
};

export function YandexPlusShowcase({ productDesignerImages, designLeadImages }: YandexPlusShowcaseProps) {
  const [tick, setTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 900);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="yandex-plus-showcase" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <ShowcaseColumn
        title="As a Senior Product Designer"
        subtitle="I design subscription acquisition across Yandex services - from paywalls to checkout, creating clear paths that help people join and stay with Yandex Plus."
        images={productDesignerImages}
        activeIndex={productDesignerImages.length ? tick % productDesignerImages.length : 0}
      />
      <ShowcaseColumn
        title="As a Product Design Lead"
        subtitle="I lead a team of 4 designers, shaping the way we work and helping each designer grow into a stronger, more independent contributor."
        images={designLeadImages}
        activeIndex={designLeadImages.length ? tick % designLeadImages.length : 0}
      />
    </div>
  );
}

function ShowcaseColumn({ title, subtitle, images, activeIndex }: { title: string; subtitle: string; images: string[]; activeIndex: number }) {
  return (
    <article className="project-card yandex-plus-showcase-column group">
      <div className="project-media-card yandex-plus-showcase-card">
        <div className="yandex-plus-showcase-frame">
          {images.map((image, index) => (
            <img className={index === activeIndex ? "is-active" : ""} src={image} alt="" key={image} />
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
