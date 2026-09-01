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
const VISUAL_SLIDES = new Set([0, 1, 2, 5, 7, 8, 10, 11, 12]);

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
type SaveStatus = "idle" | "saving" | "saved" | "error";

type PersistedMediaScreen = Omit<MediaScreen, "src" | "temporary" | "placeholder"> & {
  blob: Blob;
};

type PersistedMediaState = {
  id: string;
  schemaVersion?: number;
  slides: Array<{
    slideIndex: number;
    screens: PersistedMediaScreen[];
  }>;
};

const MEDIA_DATABASE_NAME = "venyavekk-plus-case-study";
const MEDIA_DATABASE_VERSION = 1;
const MEDIA_STORE_NAME = "deck-state";
const MEDIA_STATE_KEY = "pasted-screens";
const MEDIA_STATE_VERSION = 2;

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
  const slides = state?.slides ?? [];
  if ((state?.schemaVersion ?? 1) >= MEDIA_STATE_VERSION) return slides;

  return slides.map((slide) => ({
    ...slide,
    slideIndex: slide.slideIndex === 4 ? 2 : slide.slideIndex === 2 ? 5 : slide.slideIndex,
  }));
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
    schemaVersion: MEDIA_STATE_VERSION,
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
  2: flowScreens,
  5: [{ ...defaultPhoneScreen, id: "previous-paywall", alt: "Previous Yandex Plus paywall" }],
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
  5: 0,
  7: 0,
  8: 0,
  10: 0,
  11: 0,
  12: 0,
};

const DEFAULT_MEDIA_COUNTS: Record<number, number> = {
  0: 1,
  1: 1,
  2: 5,
  5: 1,
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

type SlideHeadingProps = {
  title: string;
  eyebrow?: string;
  level?: "h1" | "h2";
};

function SlideHeading({ title, eyebrow, level = "h2" }: SlideHeadingProps) {
  const Heading = level;

  return (
    <div className={styles.slideHeading}>
      <Heading className={styles.title}>{title}</Heading>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
    </div>
  );
}

type StorySlideProps = {
  index: number;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  requirements?: boolean;
  research?: boolean;
};

function StorySlide({
  index,
  title,
  eyebrow,
  children,
  requirements = false,
  research = false,
}: StorySlideProps) {
  return (
    <section className={styles.slide} aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}>
      <SlideNumber index={index} />
      <SlideHeading title={title} eyebrow={eyebrow} />
      <div
        className={`${styles.slideInner} ${styles.storySlide} ${
          requirements ? styles.requirementsSlide : ""
        } ${research ? styles.researchSlide : ""}`}
      >
        <div className={styles.headingSpace} aria-hidden="true" />
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
  disabled: boolean;
  onDelete: () => void;
};

type ToolbarIconName =
  | "upload"
  | "save"
  | "saved"
  | "undo"
  | "layout"
  | "delete"
  | "menu"
  | "close";

function ToolbarIcon({ name }: { name: ToolbarIconName }) {
  if (name === "upload") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 15.5V20h14v-4.5" />
      </svg>
    );
  }

  if (name === "save" || name === "saved") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {name === "saved" ? (
          <path d="m5 12.5 4.2 4.2L19 7" />
        ) : (
          <path d="M5 4h11l3 3v13H5V4Zm3 0v6h8V4M8 20v-6h8v6" />
        )}
      </svg>
    );
  }

  if (name === "undo") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 7-5 5 5 5M5 12h8.5a5.5 5.5 0 0 1 5.5 5.5" />
      </svg>
    );
  }

  if (name === "layout") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M11 5v14" />
      </svg>
    );
  }

  if (name === "menu") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 7h14M5 12h14M5 17h14" />
        <circle cx="9" cy="7" r="1.5" />
        <circle cx="15" cy="12" r="1.5" />
        <circle cx="11" cy="17" r="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  );
}

function DeleteScreenButton({ disabled, onDelete }: DeleteScreenButtonProps) {
  return (
    <button
      className={styles.deleteScreen}
      type="button"
      aria-label="Delete current pasted screen"
      title="Delete image"
      disabled={disabled}
      onClick={onDelete}
    >
      <ToolbarIcon name="delete" />
    </button>
  );
}

type MediaToolbarProps = {
  isAvailable: boolean;
  layout: MediaLayout;
  canUndo: boolean;
  canDelete: boolean;
  canSave: boolean;
  saveStatus: SaveStatus;
  onUndo: () => void;
  onToggleLayout: () => void;
  onDelete: () => void;
  onUpload: (files: File[]) => void;
  onSave: () => void;
};

function MediaToolbar({
  isAvailable,
  layout,
  canUndo,
  canDelete,
  canSave,
  saveStatus,
  onUndo,
  onToggleLayout,
  onDelete,
  onUpload,
  onSave,
}: MediaToolbarProps) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const saveLabel =
    saveStatus === "saving"
      ? "Saving image"
      : saveStatus === "saved"
        ? "Image saved"
        : saveStatus === "error"
          ? "Try saving again"
          : "Save image";

  return (
    <div className={styles.floatingTools}>
      {isOpen ? (
        <div className={styles.mediaToolbar} role="toolbar" aria-label="Image controls">
          <button
            className={styles.toolbarButton}
            type="button"
            aria-label="Upload images"
            title="Upload images"
            disabled={!isAvailable}
            onClick={() => uploadInputRef.current?.click()}
          >
            <ToolbarIcon name="upload" />
          </button>
          <input
            ref={uploadInputRef}
            className={styles.visuallyHidden}
            type="file"
            accept="image/*"
            multiple
            tabIndex={-1}
            onChange={(event) => {
              const files = Array.from(event.currentTarget.files ?? []);
              if (files.length > 0) onUpload(files);
              event.currentTarget.value = "";
            }}
          />
          <button
            className={`${styles.toolbarButton} ${
              saveStatus === "error" ? styles.saveError : ""
            }`}
            type="button"
            aria-label={saveLabel}
            title={saveLabel}
            disabled={!isAvailable || !canSave || saveStatus === "saving"}
            onClick={onSave}
          >
            <ToolbarIcon name={saveStatus === "saved" ? "saved" : "save"} />
          </button>
          <button
            className={styles.toolbarButton}
            type="button"
            aria-label="Undo last image change"
            title="Undo"
            disabled={!canUndo}
            onClick={onUndo}
          >
            <ToolbarIcon name="undo" />
          </button>
          <button
            className={styles.toolbarButton}
            type="button"
            aria-label={layout === "split" ? "Use full-width layout" : "Use split layout"}
            title={layout === "split" ? "Full width" : "Split layout"}
            disabled={!isAvailable}
            onClick={onToggleLayout}
          >
            <ToolbarIcon name="layout" />
          </button>
          <DeleteScreenButton disabled={!canDelete} onDelete={onDelete} />
        </div>
      ) : null}
      <button
        className={styles.toolLauncher}
        type="button"
        aria-label={isOpen ? "Close image tools" : "Open image tools"}
        aria-expanded={isOpen}
        title={isOpen ? "Close tools" : "Image tools"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <ToolbarIcon name={isOpen ? "close" : "menu"} />
      </button>
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
  layout: MediaLayout;
};

function MediaSlide({
  index,
  title,
  eyebrow,
  children,
  screens,
  activeStep,
  onStepChange,
  layout,
}: MediaSlideProps) {
  const activeScreen = screens[activeStep] ?? screens[0];

  return (
    <section
      className={`${styles.slide} ${index === 10 ? styles.horizontalMediaSlide : ""}`}
      aria-label={`Slide ${index + 1} of ${SLIDE_COUNT}`}
    >
      <SlideNumber index={index} />
      <SlideHeading title={title} eyebrow={eyebrow} level={index === 0 ? "h1" : "h2"} />
      <div
        className={`${styles.slideInner} ${styles.mediaSlide} ${
          layout === "full" ? styles.fullMediaSlide : ""
        }`}
      >
        <div className={styles.copy}>
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
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
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

  const addImageFiles = useCallback(
    (slideIndex: number, files: File[]) => {
      if (!VISUAL_SLIDES.has(slideIndex) || files.length === 0) return;

      const currentScreens = pastedScreensRef.current[slideIndex] ?? [];
      const batchId = Date.now();
      const newScreens = files.map((file, index) => {
        const screenNumber = currentScreens.length + index + 1;
        const objectUrl = URL.createObjectURL(file);
        objectUrlsRef.current.add(objectUrl);

        return {
          id: `pasted-${batchId}-${screenNumber}`,
          label: `Screen ${screenNumber}`,
          src: objectUrl,
          alt: `Pasted screen ${screenNumber}`,
          width: 994,
          height: 1978,
          blob: file,
          temporary: true,
        } satisfies MediaScreen;
      });
      const nextScreens = [...currentScreens, ...newScreens];
      const nextPastedScreens = {
        ...pastedScreensRef.current,
        [slideIndex]: nextScreens,
      };

      rememberCurrentEdit();
      setSaveStatus("saving");
      applyPastedScreens(nextPastedScreens);
      setMediaStep(slideIndex, nextScreens.length - 1);

      for (const screen of newScreens) {
        const imageProbe = new window.Image();
        imageProbe.onload = () => {
          const latestScreens = pastedScreensRef.current[slideIndex] ?? [];
          const resizedScreens = latestScreens.map((latestScreen) =>
            latestScreen.id === screen.id
              ? {
                  ...latestScreen,
                  width: imageProbe.naturalWidth,
                  height: imageProbe.naturalHeight,
                }
              : latestScreen,
          );
          const resizedPastedScreens = {
            ...pastedScreensRef.current,
            [slideIndex]: resizedScreens,
          };
          pastedScreensRef.current = resizedPastedScreens;
          setPastedScreens(resizedPastedScreens);
        };
        imageProbe.src = screen.src ?? "";
      }
    },
    [applyPastedScreens, rememberCurrentEdit, setMediaStep],
  );

  const saveCurrentMedia = useCallback(async () => {
    setSaveStatus("saving");
    try {
      await persistMedia(pastedScreensRef.current);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
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
    setSaveStatus("saving");
    void persistMedia(pastedScreens)
      .then(() => setSaveStatus("saved"))
      .catch(() => setSaveStatus("error"));
  }, [pastedScreens]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const currentSlide = activeSlideRef.current;
      if (!VISUAL_SLIDES.has(currentSlide)) return;

      const imageItem = Array.from(event.clipboardData?.items ?? []).find((item) =>
        item.type.startsWith("image/"),
      );
      const imageFile = imageItem?.getAsFile();
      if (!imageFile) return;

      event.preventDefault();
      addImageFiles(currentSlide, [imageFile]);
    };

    window.addEventListener("paste", handlePaste);
    const objectUrls = objectUrlsRef.current;

    return () => {
      window.removeEventListener("paste", handlePaste);
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, [addImageFiles]);

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
  const activeFlowScreens = getMediaScreens(2, pastedScreens);
  const oldPaywallScreens = getMediaScreens(5, pastedScreens);
  const testSlideScreens = getMediaScreens(7, pastedScreens);
  const resultsSlideScreens = getMediaScreens(8, pastedScreens);
  const auditSlideScreens = getMediaScreens(10, pastedScreens);
  const systemSlideScreens = getMediaScreens(11, pastedScreens);
  const directionsSlideScreens = getMediaScreens(12, pastedScreens);
  const activeFlowStep = activeMediaSteps[2] ?? 0;
  const activeFlowScreen = activeFlowScreens[activeFlowStep] ?? activeFlowScreens[0];
  const activeSlideHasMedia = VISUAL_SLIDES.has(activeSlide);
  const activeToolScreens = activeSlideHasMedia
    ? getMediaScreens(activeSlide, pastedScreens)
    : [];
  const activeToolStep = activeMediaSteps[activeSlide] ?? 0;
  const activeToolScreen = activeToolScreens[activeToolStep];
  const activeToolLayout = mediaLayouts[activeSlide] ?? "split";

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
          layout={mediaLayouts[0] ?? "split"}
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
          layout={mediaLayouts[1] ?? "split"}
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

        <section className={styles.slide} aria-label={`Slide 3 of ${SLIDE_COUNT}`}>
          <SlideNumber index={2} />
          <SlideHeading title="Flow" eyebrow="From first touch to the service" />
          <div
            className={`${styles.slideInner} ${styles.flowSlide} ${
              mediaLayouts[2] === "full" ? styles.fullMediaSlide : ""
            }`}
          >
            <div className={styles.flowCopy}>
              <div aria-hidden="true" />
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
                onStepChange={(index) => setMediaStep(2, index)}
              />
            </div>
          </div>
        </section>

        <section className={styles.slide} aria-label={`Slide 4 of ${SLIDE_COUNT}`}>
          <SlideNumber index={3} />
          <SlideHeading title="Strategic priorities" />
          <div className={`${styles.slideInner} ${styles.textSlide}`}>
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
          <SlideHeading title="Plan" eyebrow="The working principle" />
          <div className={`${styles.slideInner} ${styles.centerSlide}`}>
            <p className={styles.planText}>
              Take every part of the product and apply the new subscription strategy to it.
            </p>
          </div>
        </section>

        <MediaSlide
          index={5}
          title="The old paywall couldn’t scale"
          screens={oldPaywallScreens}
          activeStep={activeMediaSteps[5] ?? 0}
          onStepChange={(index) => setMediaStep(5, index)}
          layout={mediaLayouts[5] ?? "split"}
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

        <StorySlide index={6} title="Understanding the real task" eyebrow="Framing" research>
          <TextCardGrid>
            <div>
              <strong>Task, hypothesis, and requirements</strong>
              <h3>Overall task</h3>
              <p>
                Accelerate subscription sales through a reusable offer section that can
                appear across services, receive different offers, and let product teams
                manage them.
              </p>
              <h3>Music hypothesis</h3>
              <p>
                Showing two offers on one screen will increase subscription take rate by
                supporting different offer configurations.
              </p>
              <h3>Requirements</h3>
              <ul>
                <li>Show one or two offers.</li>
                <li>Include the offer name, price description, and legal copy.</li>
                <li>Highlight one promotional offer.</li>
                <li>Support a sticky position and live inside the paywall.</li>
              </ul>
            </div>
            <div>
              <strong>Research questions</strong>
              <ol>
                <li>Does the checkbox make the selected offer clear?</li>
                <li>Do people understand that only one offer can be selected?</li>
                <li>Is the blue highlight enough to communicate the selection?</li>
                <li>Do people understand which plan types are available?</li>
                <li>Can they compare prices and see the differences between offers?</li>
                <li>Do they understand which option provides better value?</li>
                <li>Do they know they can scroll for details?</li>
                <li>What do they expect after pressing the button?</li>
                <li>Do they notice and read the legal copy?</li>
              </ol>
            </div>
            <div>
              <strong>Sticky-section questions</strong>
              <ol>
                <li>Does the section interfere with scrolling?</li>
                <li>Can people see where to change their plan?</li>
                <li>What do they expect after selecting “Change plan”?</li>
                <li>Does the sticky section affect offer take rate?</li>
                <li>Should it stick to the page or remain inside the paywall?</li>
              </ol>
              <h3>Promotional emphasis</h3>
              <ol>
                <li>Does highlighting an offer improve take rate?</li>
                <li>Does the sticky behavior change take rate?</li>
              </ol>
            </div>
            <div>
              <strong>A/B-test questions</strong>
              <h3>Highlight the promotion</h3>
              <ol>
                <li>Does highlighting an offer improve take rate?</li>
                <li>Does the sticky section improve take rate?</li>
              </ol>
              <h3>Present the offer as two propositions</h3>
              <ol>
                <li>Does showing “30 days” on both buttons affect take rate?</li>
                <li>Will people press a button to learn more?</li>
              </ol>
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
          layout={mediaLayouts[7] ?? "split"}
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
          layout={mediaLayouts[8] ?? "split"}
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
          title="I compiled the business requirements"
          requirements
        >
          <TextCardGrid>
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
          layout={mediaLayouts[10] ?? "full"}
        >
          <div className={styles.textBlock}>
            <p>
              I reviewed how Plus was sold across Music, Kinopoisk, Books, and partner
              surfaces. The audit exposed duplicated patterns, inconsistent hierarchy,
              and service-specific solutions that could not scale as one system.
            </p>
          </div>
        </MediaSlide>

        <MediaSlide
          index={11}
          title="Designing one system for every offer"
          eyebrow="From a catalogue of offers to a configurable model"
          screens={systemSlideScreens}
          activeStep={activeMediaSteps[11] ?? 0}
          onStepChange={(index) => setMediaStep(11, index)}
          layout={mediaLayouts[11] ?? "full"}
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
          layout={mediaLayouts[12] ?? "split"}
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

      <MediaToolbar
        isAvailable={activeSlideHasMedia}
        layout={activeToolLayout}
        canUndo={canUndo}
        canDelete={Boolean(activeToolScreen?.temporary)}
        canSave={activeToolScreens.some((screen) => Boolean(screen.blob))}
        saveStatus={saveStatus}
        onUndo={undoLastEdit}
        onToggleLayout={() => {
          if (activeSlideHasMedia) toggleMediaLayout(activeSlide);
        }}
        onDelete={() => {
          if (activeSlideHasMedia) deleteActiveScreen(activeSlide);
        }}
        onUpload={(files) => {
          if (activeSlideHasMedia) addImageFiles(activeSlide, files);
        }}
        onSave={saveCurrentMedia}
      />

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
