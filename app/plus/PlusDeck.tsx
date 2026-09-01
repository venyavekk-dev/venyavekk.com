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
const VISUAL_SLIDES = new Set([0, 1, 2, 4]);

type MediaScreen = {
  id: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  temporary?: boolean;
};

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

const flowScreens: MediaScreen[] = [
  {
    id: "paywall",
    label: "Sees paywall",
    src: "/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png",
    alt: "Yandex Plus paywall",
    width: 994,
    height: 1978,
  },
  {
    id: "checkout",
    label: "Opens checkout",
    src: "/assets/projects/dis08.webp",
    alt: "Yandex Plus checkout",
    width: 994,
    height: 1978,
  },
  {
    id: "upsell",
    label: "Sees upsell",
    src: "/assets/GPtO07NsC3qlkt6A0mFXsXyCiI.png",
    alt: "Yandex Plus upsell",
    width: 994,
    height: 1978,
  },
  {
    id: "success",
    label: "Sees success",
    src: "/assets/projects/dis02.webp",
    alt: "Yandex Plus success screen",
    width: 994,
    height: 1978,
  },
  {
    id: "service",
    label: "Goes to service",
    src: "/assets/projects/dis07.webp",
    alt: "Yandex Music service screen",
    width: 994,
    height: 1978,
  },
];

const defaultPhoneScreen: MediaScreen = {
  id: "default-phone",
  label: "Screen",
  src: "/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png",
  alt: "Yandex Plus subscription screen",
  width: 994,
  height: 1978,
};

const defaultMediaScreens: Record<number, MediaScreen[]> = {
  0: [defaultPhoneScreen],
  1: [defaultPhoneScreen],
  2: [{ ...defaultPhoneScreen, id: "previous-paywall", alt: "Previous Yandex Plus paywall" }],
  4: flowScreens,
};

function getMediaScreens(
  slideIndex: number,
  pastedScreens: Record<number, MediaScreen[]>,
) {
  const pasted = pastedScreens[slideIndex];
  return pasted?.length ? pasted : defaultMediaScreens[slideIndex] ?? [];
}

type ScreenVisualProps = {
  screen: MediaScreen;
  className: string;
  priority?: boolean;
  sizes: string;
};

function ScreenVisual({ screen, className, priority = false, sizes }: ScreenVisualProps) {
  return (
    <Image
      key={screen.id}
      className={className}
      src={screen.src}
      alt={screen.alt}
      width={screen.width}
      height={screen.height}
      priority={priority}
      unoptimized={screen.temporary}
      sizes={sizes}
    />
  );
}

type StepControlsProps = {
  screens: MediaScreen[];
  activeStep: number;
  label: string;
  onStepChange: (index: number) => void;
};

function StepControls({ screens, activeStep, label, onStepChange }: StepControlsProps) {
  if (screens.length < 2) return null;

  return (
    <nav className={styles.flowTabs} aria-label={label}>
      {screens.map((screen, index) => (
        <button
          key={screen.id}
          className={styles.flowTab}
          type="button"
          aria-current={activeStep === index ? "step" : undefined}
          onClick={() => onStepChange(index)}
        >
          {screen.label}
        </button>
      ))}
    </nav>
  );
}

type MediaSlideProps = {
  index: number;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  screens: MediaScreen[];
  activeStep: number;
  onStepChange: (index: number) => void;
};

function MediaSlide({
  index,
  title,
  eyebrow,
  children,
  screens,
  activeStep,
  onStepChange,
}: MediaSlideProps) {
  const Heading = index === 0 ? "h1" : "h2";
  const activeScreen = screens[activeStep] ?? screens[0];

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
          <div className={styles.mediaPanel}>
            <ScreenVisual
              screen={activeScreen}
              className={styles.phone}
              sizes="(max-width: 760px) 70vw, 38vw"
              priority={index === 0}
            />
          </div>
          <StepControls
            screens={screens}
            activeStep={activeStep}
            label={`Slide ${index + 1} image steps`}
            onStepChange={onStepChange}
          />
        </div>
      </div>
    </section>
  );
}

export function PlusDeck() {
  const deckRef = useRef<HTMLElement>(null);
  const activeSlideRef = useRef(0);
  const activeMediaStepsRef = useRef<Record<number, number>>({ 0: 0, 1: 0, 2: 0, 4: 0 });
  const mediaCountsRef = useRef<Record<number, number>>({ 0: 1, 1: 1, 2: 1, 4: 5 });
  const pastedScreensRef = useRef<Record<number, MediaScreen[]>>({});
  const objectUrlsRef = useRef(new Set<string>());
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeMediaSteps, setActiveMediaSteps] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    4: 0,
  });
  const [pastedScreens, setPastedScreens] = useState<Record<number, MediaScreen[]>>({});

  const goToSlide = useCallback((requestedIndex: number) => {
    const deck = deckRef.current;
    if (!deck) return;

    const nextIndex = Math.max(0, Math.min(SLIDE_COUNT - 1, requestedIndex));
    activeSlideRef.current = nextIndex;
    setActiveSlide(nextIndex);
    deck.scrollTo({ left: nextIndex * deck.clientWidth, behavior: "auto" });
  }, []);

  const setMediaStep = useCallback((slideIndex: number, requestedIndex: number) => {
    const screenCount = mediaCountsRef.current[slideIndex] ?? 1;
    const nextIndex = Math.max(0, Math.min(screenCount - 1, requestedIndex));
    activeMediaStepsRef.current = {
      ...activeMediaStepsRef.current,
      [slideIndex]: nextIndex,
    };
    setActiveMediaSteps(activeMediaStepsRef.current);
  }, []);

  const movePresentation = useCallback(
    (direction: -1 | 1) => {
      const currentSlide = activeSlideRef.current;
      const currentStep = activeMediaStepsRef.current[currentSlide] ?? 0;
      const currentScreenCount = mediaCountsRef.current[currentSlide] ?? 1;
      const nextStep = currentStep + direction;

      if (nextStep >= 0 && nextStep < currentScreenCount) {
        setMediaStep(currentSlide, nextStep);
        return;
      }

      const targetSlide = Math.max(0, Math.min(SLIDE_COUNT - 1, currentSlide + direction));
      const targetScreenCount = mediaCountsRef.current[targetSlide] ?? 1;
      setMediaStep(targetSlide, direction === 1 ? 0 : targetScreenCount - 1);
      goToSlide(targetSlide);
    },
    [goToSlide, setMediaStep],
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

  useEffect(() => {
    let isMounted = true;

    const handlePaste = (event: ClipboardEvent) => {
      const currentSlide = activeSlideRef.current;
      if (!VISUAL_SLIDES.has(currentSlide)) return;

      const imageItem = Array.from(event.clipboardData?.items ?? []).find((item) =>
        item.type.startsWith("image/"),
      );
      const imageFile = imageItem?.getAsFile();
      if (!imageFile) return;

      event.preventDefault();
      const objectUrl = URL.createObjectURL(imageFile);
      objectUrlsRef.current.add(objectUrl);

      const currentScreens = pastedScreensRef.current[currentSlide] ?? [];
      const nextScreenNumber = currentScreens.length + 1;
      const screenId = `pasted-${Date.now()}-${nextScreenNumber}`;
      const newScreen: MediaScreen = {
        id: screenId,
        label: `Screen ${nextScreenNumber}`,
        src: objectUrl,
        alt: `Pasted screen ${nextScreenNumber}`,
        width: 994,
        height: 1978,
        temporary: true,
      };
      const nextScreens = [...currentScreens, newScreen];
      const nextPastedScreens = {
        ...pastedScreensRef.current,
        [currentSlide]: nextScreens,
      };

      pastedScreensRef.current = nextPastedScreens;
      mediaCountsRef.current = {
        ...mediaCountsRef.current,
        [currentSlide]: nextScreens.length,
      };
      setPastedScreens(nextPastedScreens);
      setMediaStep(currentSlide, nextScreens.length - 1);

      const imageProbe = new window.Image();
      imageProbe.onload = () => {
        if (!isMounted) return;

        const latestScreens = pastedScreensRef.current[currentSlide] ?? [];
        const resizedScreens = latestScreens.map((screen) =>
          screen.id === screenId
            ? { ...screen, width: imageProbe.naturalWidth, height: imageProbe.naturalHeight }
            : screen,
        );
        const resizedPastedScreens = {
          ...pastedScreensRef.current,
          [currentSlide]: resizedScreens,
        };
        pastedScreensRef.current = resizedPastedScreens;
        setPastedScreens(resizedPastedScreens);
      };
      imageProbe.src = objectUrl;
    };

    window.addEventListener("paste", handlePaste);
    const objectUrls = objectUrlsRef.current;

    return () => {
      isMounted = false;
      window.removeEventListener("paste", handlePaste);
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, [setMediaStep]);

  const handleDeckScroll = () => {
    const deck = deckRef.current;
    if (!deck || deck.clientWidth === 0) return;

    const nextIndex = Math.max(
      0,
      Math.min(SLIDE_COUNT - 1, Math.round(deck.scrollLeft / deck.clientWidth)),
    );

    if (nextIndex !== activeSlideRef.current) {
      const previousIndex = activeSlideRef.current;
      const targetScreenCount = mediaCountsRef.current[nextIndex] ?? 1;
      setMediaStep(nextIndex, nextIndex > previousIndex ? 0 : targetScreenCount - 1);
      activeSlideRef.current = nextIndex;
      setActiveSlide(nextIndex);
    }
  };

  const firstSlideScreens = getMediaScreens(0, pastedScreens);
  const secondSlideScreens = getMediaScreens(1, pastedScreens);
  const thirdSlideScreens = getMediaScreens(2, pastedScreens);
  const activeFlowScreens = getMediaScreens(4, pastedScreens);
  const activeFlowStep = activeMediaSteps[4] ?? 0;
  const activeFlowScreen = activeFlowScreens[activeFlowStep] ?? activeFlowScreens[0];
  const activeScreenCount = getMediaScreens(activeSlide, pastedScreens).length || 1;
  const activeScreenStep = activeMediaSteps[activeSlide] ?? 0;

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
          screens={firstSlideScreens}
          activeStep={activeMediaSteps[0] ?? 0}
          onStepChange={(index) => setMediaStep(0, index)}
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
          screens={secondSlideScreens}
          activeStep={activeMediaSteps[1] ?? 0}
          onStepChange={(index) => setMediaStep(1, index)}
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
          screens={thirdSlideScreens}
          activeStep={activeMediaSteps[2] ?? 0}
          onStepChange={(index) => setMediaStep(2, index)}
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
              <div>
                <p className={styles.eyebrow}>From first touch to the service</p>
                <h2 className={styles.title}>Flow</h2>
              </div>
              <p className={styles.flowDescription}>
                One continuous experience from the value proposition to the moment
                the user starts enjoying Plus.
              </p>
            </div>
            <div className={styles.flowVisual}>
              <div
                className={styles.flowPanel}
                role="group"
                aria-label={`${activeFlowScreen.label}, step ${activeFlowStep + 1} of ${activeFlowScreens.length}`}
              >
                <ScreenVisual
                  screen={activeFlowScreen}
                  className={styles.flowPhone}
                  sizes="(max-width: 760px) 62vw, 28vw"
                />
              </div>
              <StepControls
                screens={activeFlowScreens}
                activeStep={activeFlowStep}
                label="Subscription flow steps"
                onStepChange={(index) => setMediaStep(4, index)}
              />
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
          {activeScreenCount > 1
            ? `${activeSlide + 1} / ${SLIDE_COUNT} · Step ${activeScreenStep + 1} / ${activeScreenCount}`
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
