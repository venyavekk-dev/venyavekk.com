"use client";

import Image from "next/image";
import {
  Children,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./plus.module.css";

const SLIDE_COUNT = 13;
const VISUAL_SLIDES = new Set([0, 1, 2, 4, 7, 8, 10, 11, 12]);

type MediaScreen = {
  id: string;
  label: string;
  src?: string;
  alt: string;
  width: number;
  height: number;
  blob?: Blob;
  temporary?: boolean;
  placeholder?: boolean;
};

type EditSnapshot = {
  pastedScreens: Record<number, MediaScreen[]>;
  activeMediaSteps: Record<number, number>;
};

type MediaLayout = "split" | "full";

type PersistedMediaScreen = Omit<MediaScreen, "src" | "temporary" | "placeholder"> & {
  blob: Blob;
};

type PersistedMediaState = {
  id: string;
  slides: Array<{
    slideIndex: number;
    screens: PersistedMediaScreen[];
  }>;
};

const MEDIA_DATABASE_NAME = "venyavekk-plus-case-study";
const MEDIA_DATABASE_VERSION = 1;
const MEDIA_STORE_NAME = "deck-state";
const MEDIA_STATE_KEY = "pasted-screens";

function openMediaDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(MEDIA_DATABASE_NAME, MEDIA_DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(MEDIA_STORE_NAME)) {
        database.createObjectStore(MEDIA_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function waitForTransaction(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

async function loadPersistedMedia() {
  if (!("indexedDB" in window)) return [];

  const database = await openMediaDatabase();
  const transaction = database.transaction(MEDIA_STORE_NAME, "readonly");
  const request = transaction.objectStore(MEDIA_STORE_NAME).get(MEDIA_STATE_KEY);
  const state = await new Promise<PersistedMediaState | undefined>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as PersistedMediaState | undefined);
    request.onerror = () => reject(request.error);
  });
  await waitForTransaction(transaction);
  database.close();
  return state?.slides ?? [];
}

async function persistMedia(pastedScreens: Record<number, MediaScreen[]>) {
  if (!("indexedDB" in window)) return;

  const slides = Object.entries(pastedScreens).flatMap(([slideIndex, screens]) => {
    const persistedScreens = screens.flatMap((screen) => {
      if (!screen.blob) return [];

      return [
        {
          id: screen.id,
          label: screen.label,
          alt: screen.alt,
          width: screen.width,
          height: screen.height,
          blob: screen.blob,
        },
      ];
    });

    return persistedScreens.length
      ? [{ slideIndex: Number(slideIndex), screens: persistedScreens }]
      : [];
  });
  const state: PersistedMediaState = {
    id: MEDIA_STATE_KEY,
    slides,
  };
  const database = await openMediaDatabase();
  const transaction = database.transaction(MEDIA_STORE_NAME, "readwrite");
  transaction.objectStore(MEDIA_STORE_NAME).put(state);
  await waitForTransaction(transaction);
  database.close();
}

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

function createPlaceholderScreen(slideIndex: number): MediaScreen {
  return {
    id: `placeholder-${slideIndex}`,
    label: "Image",
    alt: "Empty image area",
    width: 1600,
    height: 1000,
    placeholder: true,
  };
}

const defaultMediaScreens: Record<number, MediaScreen[]> = {
  0: [defaultPhoneScreen],
  1: [defaultPhoneScreen],
  2: [{ ...defaultPhoneScreen, id: "previous-paywall", alt: "Previous Yandex Plus paywall" }],
  4: flowScreens,
  7: [createPlaceholderScreen(7)],
  8: [createPlaceholderScreen(8)],
  10: [createPlaceholderScreen(10)],
  11: [createPlaceholderScreen(11)],
  12: [createPlaceholderScreen(12)],
};

const INITIAL_MEDIA_STEPS: Record<number, number> = {
  0: 0,
  1: 0,
  2: 0,
  4: 0,
  7: 0,
  8: 0,
  10: 0,
  11: 0,
  12: 0,
};

const DEFAULT_MEDIA_COUNTS: Record<number, number> = {
  0: 1,
  1: 1,
  2: 1,
  4: 5,
  7: 1,
  8: 1,
  10: 1,
  11: 1,
  12: 1,
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
  if (screen.placeholder || !screen.src) {
    return (
      <div className={styles.emptyMedia} role="img" aria-label={screen.alt}>
        <span>Paste image</span>
        <kbd>⌘V</kbd>
      </div>
    );
  }

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
  const controlsRef = useRef<HTMLElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    const activeButton = activeButtonRef.current;
    if (!controls || !activeButton) return;

    if (activeStep === 0) {
      controls.scrollTo({ left: 0, behavior: "auto" });
      return;
    }

    const pinnedWidth = controls.firstElementChild?.clientWidth ?? 0;
    const visibleLeft = controls.scrollLeft + pinnedWidth + 16;
    const visibleRight = controls.scrollLeft + controls.clientWidth;
    const buttonLeft = activeButton.offsetLeft;
    const buttonRight = buttonLeft + activeButton.offsetWidth;

    if (buttonLeft < visibleLeft) {
      controls.scrollTo({ left: buttonLeft - pinnedWidth - 16, behavior: "auto" });
    } else if (buttonRight > visibleRight) {
      controls.scrollTo({ left: buttonRight - controls.clientWidth + 8, behavior: "auto" });
    }
  }, [activeStep, screens.length]);

  if (screens.length < 2) return null;

  return (
    <nav ref={controlsRef} className={styles.flowTabs} aria-label={label}>
      {screens.map((screen, index) => (
        <button
          key={screen.id}
          ref={activeStep === index ? activeButtonRef : undefined}
          className={styles.flowTab}
          type="button"
          aria-current={activeStep === index ? "step" : undefined}
          onClick={() => onStepChange(index)}
        >
          <span className={styles.visuallyHidden}>{screen.label}</span>
          {index + 1}
        </button>
      ))}
    </nav>
  );
}

function SlideNumber({ index }: { index: number }) {
  return (
    <span className={styles.slideNumber} aria-hidden="true">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

type StorySlideProps = {
  index: number;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  requirements?: boolean;
};

function StorySlide({ index, title, eyebrow, children, requirements = false }: StorySlideProps) {
  return (
    <section className={styles.slide} aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}>
      <SlideNumber index={index} />
      <div
        className={`${styles.slideInner} ${styles.storySlide} ${
          requirements ? styles.requirementsSlide : ""
        }`}
      >
        <div>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.storyBody}>{children}</div>
      </div>
    </section>
  );
}

function TextCardGrid({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children);
  const gridStyle = {
    "--text-card-count": cards.length,
  } as CSSProperties;

  return (
    <div className={styles.textCardGrid} style={gridStyle}>
      {cards.map((card, index) => (
        <div className={styles.contentCard} key={index}>
          {card}
        </div>
      ))}
    </div>
  );
}

type DeleteScreenButtonProps = {
  onDelete: () => void;
};

function DeleteScreenButton({ onDelete }: DeleteScreenButtonProps) {
  return (
    <button
      className={styles.deleteScreen}
      type="button"
      aria-label="Delete current pasted screen"
      onClick={onDelete}
    >
      ×
    </button>
  );
}

type MediaToolbarProps = {
  layout: MediaLayout;
  canUndo: boolean;
  canDelete: boolean;
  onUndo: () => void;
  onToggleLayout: () => void;
  onDelete: () => void;
};

function MediaToolbar({
  layout,
  canUndo,
  canDelete,
  onUndo,
  onToggleLayout,
  onDelete,
}: MediaToolbarProps) {
  return (
    <div className={styles.mediaToolbar} role="toolbar" aria-label="Image controls">
      <button
        className={styles.toolbarButton}
        type="button"
        disabled={!canUndo}
        onClick={onUndo}
      >
        Undo
      </button>
      <button className={styles.toolbarButton} type="button" onClick={onToggleLayout}>
        {layout === "split" ? "Full width" : "Split"}
      </button>
      {canDelete ? <DeleteScreenButton onDelete={onDelete} /> : null}
    </div>
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
  onDelete: () => void;
  layout: MediaLayout;
  canUndo: boolean;
  onUndo: () => void;
  onToggleLayout: () => void;
};

function MediaSlide({
  index,
  title,
  eyebrow,
  children,
  screens,
  activeStep,
  onStepChange,
  onDelete,
  layout,
  canUndo,
  onUndo,
  onToggleLayout,
}: MediaSlideProps) {
  const Heading = index === 0 ? "h1" : "h2";
  const activeScreen = screens[activeStep] ?? screens[0];

  return (
    <section className={styles.slide} aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}>
      <SlideNumber index={index} />
      <div
        className={`${styles.slideInner} ${styles.mediaSlide} ${
          layout === "full" ? styles.fullMediaSlide : ""
        }`}
      >
        <div className={styles.copy}>
          <div>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <Heading className={styles.title}>{title}</Heading>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
        <div className={styles.media}>
          <MediaToolbar
            layout={layout}
            canUndo={canUndo}
            canDelete={Boolean(activeScreen.temporary)}
            onUndo={onUndo}
            onToggleLayout={onToggleLayout}
            onDelete={onDelete}
          />
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
  const activeMediaStepsRef = useRef<Record<number, number>>({ ...INITIAL_MEDIA_STEPS });
  const mediaCountsRef = useRef<Record<number, number>>({ ...DEFAULT_MEDIA_COUNTS });
  const pastedScreensRef = useRef<Record<number, MediaScreen[]>>({});
  const editHistoryRef = useRef<EditSnapshot[]>([]);
  const objectUrlsRef = useRef(new Set<string>());
  const persistenceReadyRef = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeMediaSteps, setActiveMediaSteps] = useState<Record<number, number>>({
    ...INITIAL_MEDIA_STEPS,
  });
  const [pastedScreens, setPastedScreens] = useState<Record<number, MediaScreen[]>>({});
  const [canUndo, setCanUndo] = useState(false);
  const [mediaLayouts, setMediaLayouts] = useState<Record<number, MediaLayout>>({
    10: "full",
    11: "full",
  });

  const applyPastedScreens = useCallback((nextPastedScreens: Record<number, MediaScreen[]>) => {
    const nextCounts: Record<number, number> = { ...DEFAULT_MEDIA_COUNTS };

    for (const slideIndex of VISUAL_SLIDES) {
      const pastedCount = nextPastedScreens[slideIndex]?.length ?? 0;
      if (pastedCount > 0) nextCounts[slideIndex] = pastedCount;
    }

    const nextActiveSteps = { ...activeMediaStepsRef.current };
    for (const slideIndex of VISUAL_SLIDES) {
      nextActiveSteps[slideIndex] = Math.min(
        nextActiveSteps[slideIndex] ?? 0,
        nextCounts[slideIndex] - 1,
      );
    }

    pastedScreensRef.current = nextPastedScreens;
    mediaCountsRef.current = nextCounts;
    activeMediaStepsRef.current = nextActiveSteps;
    setPastedScreens(nextPastedScreens);
    setActiveMediaSteps(nextActiveSteps);
  }, []);

  const rememberCurrentEdit = useCallback(() => {
    editHistoryRef.current = [
      ...editHistoryRef.current.slice(-49),
      {
        pastedScreens: pastedScreensRef.current,
        activeMediaSteps: activeMediaStepsRef.current,
      },
    ];
    setCanUndo(true);
  }, []);

  const undoLastEdit = useCallback(() => {
    const previousSnapshot = editHistoryRef.current.pop();
    if (!previousSnapshot) return false;

    applyPastedScreens(previousSnapshot.pastedScreens);
    const restoredActiveSteps = { ...previousSnapshot.activeMediaSteps };
    for (const slideIndex of VISUAL_SLIDES) {
      restoredActiveSteps[slideIndex] = Math.min(
        restoredActiveSteps[slideIndex] ?? 0,
        (mediaCountsRef.current[slideIndex] ?? 1) - 1,
      );
    }
    activeMediaStepsRef.current = restoredActiveSteps;
    setActiveMediaSteps(restoredActiveSteps);
    setCanUndo(editHistoryRef.current.length > 0);
    return true;
  }, [applyPastedScreens]);

  const toggleMediaLayout = useCallback((slideIndex: number) => {
    setMediaLayouts((currentLayouts) => ({
      ...currentLayouts,
      [slideIndex]: currentLayouts[slideIndex] === "full" ? "split" : "full",
    }));
  }, []);

  const deleteActiveScreen = useCallback(
    (slideIndex: number) => {
      const currentScreens = pastedScreensRef.current[slideIndex] ?? [];
      if (currentScreens.length === 0) return;

      rememberCurrentEdit();
      const activeStep = activeMediaStepsRef.current[slideIndex] ?? 0;
      const remainingScreens = currentScreens
        .filter((_, index) => index !== activeStep)
        .map((screen, index) => ({
          ...screen,
          label: `Screen ${index + 1}`,
          alt: `Pasted screen ${index + 1}`,
        }));
      const nextPastedScreens = { ...pastedScreensRef.current };

      if (remainingScreens.length > 0) {
        nextPastedScreens[slideIndex] = remainingScreens;
      } else {
        delete nextPastedScreens[slideIndex];
      }

      applyPastedScreens(nextPastedScreens);
    },
    [applyPastedScreens, rememberCurrentEdit],
  );

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
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        event.key.toLowerCase() === "z" &&
        undoLastEdit()
      ) {
        event.preventDefault();
        return;
      }

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
  }, [movePresentation, undoLastEdit]);

  useEffect(() => {
    let isCancelled = false;

    void loadPersistedMedia()
      .then((persistedSlides) => {
        if (isCancelled) return;

        const restoredScreens: Record<number, MediaScreen[]> = {};
        for (const { slideIndex, screens } of persistedSlides) {
          if (!VISUAL_SLIDES.has(slideIndex)) continue;

          restoredScreens[slideIndex] = screens.map((screen) => {
            const objectUrl = URL.createObjectURL(screen.blob);
            objectUrlsRef.current.add(objectUrl);
            return {
              ...screen,
              src: objectUrl,
              temporary: true,
            };
          });
        }

        persistenceReadyRef.current = true;
        if (Object.keys(restoredScreens).length > 0) {
          applyPastedScreens(restoredScreens);
        }
      })
      .catch(() => {
        persistenceReadyRef.current = true;
      });

    return () => {
      isCancelled = true;
    };
  }, [applyPastedScreens]);

  useEffect(() => {
    if (!persistenceReadyRef.current) return;
    void persistMedia(pastedScreens);
  }, [pastedScreens]);

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
        blob: imageFile,
        temporary: true,
      };
      const nextScreens = [...currentScreens, newScreen];
      const nextPastedScreens = {
        ...pastedScreensRef.current,
        [currentSlide]: nextScreens,
      };

      rememberCurrentEdit();
      applyPastedScreens(nextPastedScreens);
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
  }, [applyPastedScreens, rememberCurrentEdit, setMediaStep]);

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
  const testSlideScreens = getMediaScreens(7, pastedScreens);
  const resultsSlideScreens = getMediaScreens(8, pastedScreens);
  const auditSlideScreens = getMediaScreens(10, pastedScreens);
  const systemSlideScreens = getMediaScreens(11, pastedScreens);
  const directionsSlideScreens = getMediaScreens(12, pastedScreens);
  const activeFlowStep = activeMediaSteps[4] ?? 0;
  const activeFlowScreen = activeFlowScreens[activeFlowStep] ?? activeFlowScreens[0];

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
          onDelete={() => deleteActiveScreen(0)}
          layout={mediaLayouts[0] ?? "split"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(0)}
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
          onDelete={() => deleteActiveScreen(1)}
          layout={mediaLayouts[1] ?? "split"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(1)}
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
          onDelete={() => deleteActiveScreen(2)}
          layout={mediaLayouts[2] ?? "split"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(2)}
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

        <section className={styles.slide} aria-label={`Slide 4 of ${SLIDE_COUNT}`}>
          <SlideNumber index={3} />
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

        <section className={styles.slide} aria-label={`Slide 5 of ${SLIDE_COUNT}`}>
          <SlideNumber index={4} />
          <div
            className={`${styles.slideInner} ${styles.flowSlide} ${
              mediaLayouts[4] === "full" ? styles.fullMediaSlide : ""
            }`}
          >
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
              <MediaToolbar
                layout={mediaLayouts[4] ?? "split"}
                canUndo={canUndo}
                canDelete={Boolean(activeFlowScreen.temporary)}
                onUndo={undoLastEdit}
                onToggleLayout={() => toggleMediaLayout(4)}
                onDelete={() => deleteActiveScreen(4)}
              />
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

        <section className={styles.slide} aria-label={`Slide 6 of ${SLIDE_COUNT}`}>
          <SlideNumber index={5} />
          <div className={`${styles.slideInner} ${styles.centerSlide}`}>
            <p className={styles.eyebrow}>The working principle</p>
            <h2 className={styles.title}>Plan</h2>
            <p className={styles.planText}>
              Take every part of the product and apply the new subscription strategy to it.
            </p>
          </div>
        </section>

        <StorySlide index={6} title="Understanding the real task" eyebrow="Framing">
          <TextCardGrid>
            <div>
              <strong>The actual challenge</strong>
              <p>
                The brief was not to redesign a single paywall. It was to create a
                configurable subscription system that could sell different products
                across multiple storefronts and adapt to each user’s context.
              </p>
            </div>
            <div>
              <strong>A system designed to evolve</strong>
              <p>
                Multiple products · Multiple storefronts · Personalization · Continuous
                A/B testing
              </p>
            </div>
          </TextCardGrid>
        </StorySlide>

        <MediaSlide
          index={7}
          title="What if we remove the descriptions?"
          eyebrow="A deliberately simple test"
          screens={testSlideScreens}
          activeStep={activeMediaSteps[7] ?? 0}
          onStepChange={(index) => setMediaStep(7, index)}
          onDelete={() => deleteActiveScreen(7)}
          layout={mediaLayouts[7] ?? "split"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(7)}
        >
          <div className={styles.textBlock}>
            <p>
              I proposed a focused experiment: remove the benefit descriptions that
              repeated information already communicated elsewhere and measure whether
              they actually contributed to conversion.
            </p>
          </div>
          <div className={styles.textBlock}>
            <strong>Hypothesis</strong>
            <p>
              If descriptions add little perceived value, removing them should simplify
              the interface without reducing take rate.
            </p>
          </div>
        </MediaSlide>

        <MediaSlide
          index={8}
          title="The experiment confirmed the hypothesis"
          eyebrow="Evidence before redesign"
          screens={resultsSlideScreens}
          activeStep={activeMediaSteps[8] ?? 0}
          onStepChange={(index) => setMediaStep(8, index)}
          onDelete={() => deleteActiveScreen(8)}
          layout={mediaLayouts[8] ?? "split"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(8)}
        >
          <div className={styles.textBlock}>
            <p>
              Conversion remained effectively unchanged across the control and test
              variants. Annual-versus-monthly take rate also stayed stable.
            </p>
          </div>
          <div className={styles.textBlock}>
            <strong>Result</strong>
            <p>
              We could remove duplicated descriptions, reduce visual pressure, and make
              room for more relevant information.
            </p>
          </div>
        </MediaSlide>

        <StorySlide
          index={9}
          title="Turning evidence into business requirements"
          eyebrow="From a test result to a product model"
          requirements
        >
          <TextCardGrid>
            <div className={styles.requirementGroup}>
              <strong>What the evidence changed</strong>
              <p>
                Benefits did not drive plan selection on their own. We could simplify the
                interface and define a more flexible product model.
              </p>
            </div>
            <div className={styles.requirementGroup}>
              <strong>Product requirements</strong>
              <ol>
                <li>Sell any offer type, not only annual versus monthly plans.</li>
                <li>
                  Support trials, introductory prices, full-price plans, and promotions.
                </li>
                <li>
                  Fit into different services without redesigning the entire purchase
                  flow.
                </li>
                <li>
                  Encourage discovery across the Plus ecosystem and grow cross-service
                  usage.
                </li>
              </ol>
            </div>
            <div className={styles.requirementGroup}>
              <strong>Strategic requirement</strong>
              <p>
                Make subscription decisions more deliberate and transparent—reducing
                cancellations and the need to search for critical details elsewhere.
              </p>
            </div>
          </TextCardGrid>
        </StorySlide>

        <MediaSlide
          index={10}
          title="Auditing the existing paywalls"
          eyebrow="Across every service and entry point"
          screens={auditSlideScreens}
          activeStep={activeMediaSteps[10] ?? 0}
          onStepChange={(index) => setMediaStep(10, index)}
          onDelete={() => deleteActiveScreen(10)}
          layout={mediaLayouts[10] ?? "full"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(10)}
        >
          <div className={styles.textBlock}>
            <p>
              I reviewed how Plus was sold across Music, Kinopoisk, Books, and partner
              surfaces. The audit exposed duplicated patterns, inconsistent hierarchy,
              and service-specific solutions that could not scale as one system.
            </p>
          </div>
          <div className={styles.textBlock}>
            <strong>What we mapped</strong>
            <p>Entry point · Audience · Offer · Message · Purchase mechanics</p>
          </div>
        </MediaSlide>

        <MediaSlide
          index={11}
          title="Designing one system for every offer"
          eyebrow="From a catalogue of offers to a configurable model"
          screens={systemSlideScreens}
          activeStep={activeMediaSteps[11] ?? 0}
          onStepChange={(index) => setMediaStep(11, index)}
          onDelete={() => deleteActiveScreen(11)}
          layout={mediaLayouts[11] ?? "full"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(11)}
        >
          <div className={styles.textBlock}>
            <p>
              We mapped every live offer—trial, intro, annual, monthly, promotional, and
              win-back—and separated the content from the interface.
            </p>
          </div>
          <div className={styles.textBlock}>
            <strong>Configurable fields</strong>
            <p>Subscription · Trial · Promo · Price · CTA · Legal information</p>
          </div>
        </MediaSlide>

        <MediaSlide
          index={12}
          title="Two directions to validate"
          eyebrow="One system, two interaction models"
          screens={directionsSlideScreens}
          activeStep={activeMediaSteps[12] ?? 0}
          onStepChange={(index) => setMediaStep(12, index)}
          onDelete={() => deleteActiveScreen(12)}
          layout={mediaLayouts[12] ?? "split"}
          canUndo={canUndo}
          onUndo={undoLastEdit}
          onToggleLayout={() => toggleMediaLayout(12)}
        >
          <div className={styles.textBlock}>
            <p>
              I reduced the exploration to two viable directions: a guided selection
              model with one primary action, and a side-by-side model that makes competing
              offers directly comparable.
            </p>
          </div>
          <div className={styles.textBlock}>
            <strong>Evaluation criteria</strong>
            <p>Clarity · Flexibility · Conversion potential · Ability to scale</p>
          </div>
        </MediaSlide>
      </main>

      <nav className={styles.presentationNav} aria-label="Presentation navigation">
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
