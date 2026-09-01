"use client";

import Image from "next/image";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./plus.module.css";

const SLIDE_COUNT = 6;

const impact = [
  "+4.2% payment conversion",
  "+7.4% in first-payment conversion and +4.9% in LTV per user",
  "8–16K estimated incremental subscribers",
  "₽43M estimated LTV created",
];

const context = [
  ["47.5M", "subscribers"],
  ["≈€316M", "subscription revenue in Q2 2026"],
  ["Services", "Kinopoisk · Yandex Music · Yandex Books"],
  ["10+ regional markets", "with localized products, benefits, and offers"],
];

const problems = [
  [
    "One experience for everyone",
    "No cohort targeting, contextual messaging, or ML-powered personalization.",
  ],
  [
    "A rigid offer model",
    "The monthly-vs-annual comparison duplicated benefits and could not support new plans, bundles, or upsells.",
  ],
  [
    "The value was hard to discover",
    "Users had to swipe to find another offer and scroll to understand Plus, while the interface relied more on pressure than clarity.",
  ],
];

const priorities = [
  [
    "Increase subscription awareness",
    "Help users understand the full value of Plus and discover benefits beyond the service that initially brought them into the flow.",
  ],
  [
    "Personalisation",
    "Use behavioral and contextual signals to match each user with the most relevant value proposition and offer.",
  ],
  [
    "Build sustainable conversion",
    "Make the purchase experience clearer, more transparent, and more aligned with the product’s value.",
  ],
  [
    "Expand upsell opportunities",
    "Create relevant moments to move existing subscribers to higher-value plans and additional benefits.",
  ],
];

const flowScreens = [
  {
    label: "Sees paywall",
    src: "/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png",
    alt: "Yandex Plus paywall",
  },
  {
    label: "Opens checkout",
    src: "/assets/projects/dis08.webp",
    alt: "Yandex Plus checkout",
  },
  {
    label: "Sees upsell",
    src: "/assets/GPtO07NsC3qlkt6A0mFXsXyCiI.png",
    alt: "Yandex Plus upsell",
  },
  {
    label: "Sees success",
    src: "/assets/projects/dis02.webp",
    alt: "Yandex Plus success screen",
  },
  {
    label: "Goes to service",
    src: "/assets/projects/dis07.webp",
    alt: "Yandex Music service screen",
  },
];

type MediaSlideProps = {
  index: number;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
};

function MediaSlide({
  index,
  title,
  eyebrow,
  children,
  imageSrc,
  imageAlt,
}: MediaSlideProps) {
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <section className={styles.slide} aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}>
      <div className={`${styles.slideInner} ${styles.mediaSlide}`}>
        <div className={styles.copy}>
          <div>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <Heading className={styles.title}>{title}</Heading>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
        <div className={styles.media}>
          <Image
            className={styles.phone}
            src={imageSrc}
            alt={imageAlt}
            width={994}
            height={1978}
            priority={index === 0}
            sizes="(max-width: 760px) 70vw, 38vw"
          />
        </div>
      </div>
    </section>
  );
}

export function PlusDeck() {
  const deckRef = useRef<HTMLElement>(null);
  const activeSlideRef = useRef(0);
  const activeFlowRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFlow, setActiveFlow] = useState(0);

  const goToSlide = useCallback((requestedIndex: number) => {
    const deck = deckRef.current;
    if (!deck) return;

    const nextIndex = Math.max(0, Math.min(SLIDE_COUNT - 1, requestedIndex));
    activeSlideRef.current = nextIndex;
    setActiveSlide(nextIndex);
    deck.scrollTo({ left: nextIndex * deck.clientWidth, behavior: "auto" });
  }, []);

  const setFlowStep = useCallback((requestedIndex: number) => {
    const nextIndex = Math.max(0, Math.min(flowScreens.length - 1, requestedIndex));
    activeFlowRef.current = nextIndex;
    setActiveFlow(nextIndex);
  }, []);

  const movePresentation = useCallback(
    (direction: -1 | 1) => {
      const currentSlide = activeSlideRef.current;
      const currentFlow = activeFlowRef.current;

      if (currentSlide === 4) {
        const nextFlow = currentFlow + direction;
        if (nextFlow >= 0 && nextFlow < flowScreens.length) {
          setFlowStep(nextFlow);
          return;
        }
      }

      if (direction === 1 && currentSlide === 3) setFlowStep(0);
      if (direction === -1 && currentSlide === 5) setFlowStep(flowScreens.length - 1);
      goToSlide(currentSlide + direction);
    },
    [goToSlide, setFlowStep],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        movePresentation(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        movePresentation(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePresentation]);

  const handleDeckScroll = () => {
    const deck = deckRef.current;
    if (!deck || deck.clientWidth === 0) return;

    const nextIndex = Math.max(
      0,
      Math.min(SLIDE_COUNT - 1, Math.round(deck.scrollLeft / deck.clientWidth)),
    );

    if (nextIndex !== activeSlideRef.current) {
      activeSlideRef.current = nextIndex;
      setActiveSlide(nextIndex);
    }
  };

  const activeFlowScreen = flowScreens[activeFlow];

  return (
    <>
      <main
        ref={deckRef}
        className={styles.deck}
        onScroll={handleDeckScroll}
        aria-label="Yandex Plus case study"
      >
        <MediaSlide
          index={0}
          title="How to sell subscription well"
          eyebrow="Case Study by Veniamin Vekk"
          imageSrc="/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png"
          imageAlt="Yandex Plus subscription screen"
        >
          <div className={styles.fact}>
            <strong>Role</strong>
            <span>Lead Product Designer</span>
          </div>
          <div className={styles.fact}>
            <strong>Impact</strong>
            {impact.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </MediaSlide>

        <MediaSlide
          index={1}
          title="What is Yandex Plus?"
          eyebrow="The region’s largest multi-service subscription"
          imageSrc="/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png"
          imageAlt="Yandex Plus subscription screen"
        >
          <div className={styles.factGrid}>
            {context.map(([label, description]) => (
              <div className={styles.fact} key={label}>
                <strong>{label}</strong>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </MediaSlide>

        <MediaSlide
          index={2}
          title="The main paywall wasn’t built for the new subscription strategy"
          imageSrc="/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png"
          imageAlt="Previous Yandex Plus paywall"
        >
          <div className={styles.problemList}>
            {problems.map(([label, description]) => (
              <div className={styles.textBlock} key={label}>
                <strong>{label}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </MediaSlide>

        <section className={styles.slide} aria-label="Slide 4 of 6">
          <div className={`${styles.slideInner} ${styles.textSlide}`}>
            <h2 className={styles.title}>Strategic priorities</h2>
            <div className={styles.priorityGrid}>
              {priorities.map(([label, description]) => (
                <div className={styles.textBlock} key={label}>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.slide} aria-label="Slide 5 of 6">
          <div className={`${styles.slideInner} ${styles.flowSlide}`}>
            <div className={styles.flowCopy}>
              <p className={styles.eyebrow}>From first touch to the service</p>
              <h2 className={styles.title}>Flow</h2>
              <p className={styles.flowDescription}>
                One continuous experience from the value proposition to the moment
                the user starts enjoying Plus.
              </p>
            </div>
            <div className={styles.flowVisual}>
              <div
                className={styles.flowPanel}
                role="group"
                aria-label={`${activeFlowScreen.label}, step ${activeFlow + 1} of ${flowScreens.length}`}
              >
                <Image
                  key={activeFlowScreen.src}
                  className={styles.flowPhone}
                  src={activeFlowScreen.src}
                  alt={activeFlowScreen.alt}
                  width={994}
                  height={1978}
                  sizes="(max-width: 760px) 62vw, 28vw"
                />
              </div>
              <nav className={styles.flowTabs} aria-label="Subscription flow steps">
                {flowScreens.map((screen, index) => (
                  <button
                    key={screen.label}
                    className={styles.flowTab}
                    type="button"
                    aria-current={activeFlow === index ? "step" : undefined}
                    onClick={() => setFlowStep(index)}
                  >
                    {screen.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section className={styles.slide} aria-label="Slide 6 of 6">
          <div className={`${styles.slideInner} ${styles.centerSlide}`}>
            <p className={styles.eyebrow}>The working principle</p>
            <h2 className={styles.title}>Plan</h2>
            <p className={styles.planText}>
              Take every part of the product and apply the new subscription strategy to it.
            </p>
          </div>
        </section>
      </main>

      <nav className={styles.presentationNav} aria-label="Presentation navigation">
        <span className={styles.counter} aria-live="polite">
          {activeSlide === 4
            ? `5 / ${SLIDE_COUNT} · Step ${activeFlow + 1} / ${flowScreens.length}`
            : `${activeSlide + 1} / ${SLIDE_COUNT}`}
        </span>
        <button
          type="button"
          aria-label="Previous slide"
          disabled={activeSlide === 0}
          onClick={() => movePresentation(-1)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next slide"
          disabled={activeSlide === SLIDE_COUNT - 1}
          onClick={() => movePresentation(1)}
        >
          →
        </button>
      </nav>
    </>
  );
}
