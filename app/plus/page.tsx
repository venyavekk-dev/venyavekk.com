import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./plus.module.css";

export const metadata: Metadata = {
  title: "How to sell subscription well — Veniamin Vekk",
  description: "A product design case study about rebuilding the Yandex Plus subscription experience.",
  openGraph: {
    title: "How to sell subscription well",
    description: "A Yandex Plus product design case study by Veniamin Vekk.",
    images: ["/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png"],
  },
};

const impact = [
  "+4.2% payment conversion",
  "+7.4% in first-payment conversion and +4.9% in LTV per user",
  "8–16K estimated incremental subscribers",
  "₽43M estimated LTV created",
] as const;

const context = [
  { value: "47.5M", label: "subscribers" },
  { value: "≈€316M", label: "subscription revenue in Q2 2026" },
  { value: "Services", label: "Kinopoisk, Yandex Music, Yandex Books" },
  { value: "10+", label: "regional markets with localized products, benefits, and offers" },
] as const;

const problems = [
  {
    title: "One experience for everyone",
    body: "No cohort targeting, contextual messaging, or ML-powered personalization.",
  },
  {
    title: "A rigid offer model",
    body: "The monthly-vs-annual comparison duplicated benefits and could not support new plans, bundles, or upsells.",
  },
  {
    title: "The value was hard to discover",
    body: "Users had to swipe to find another offer and scroll to understand Plus, while the interface relied more on pressure than clarity.",
  },
] as const;

const priorities = [
  {
    title: "Increase subscription awareness",
    body: "Help users understand the full value of Plus and discover benefits beyond the service that initially brought them into the flow.",
    impact: "Impact: cross-service adoption, retention, churn.",
  },
  {
    title: "Personalisation",
    body: "Use behavioral and contextual signals to match each user with the most relevant value proposition and offer.",
    impact: "Impact: offer engagement, conversion uplift, offer efficiency.",
  },
  {
    title: "Build sustainable conversion",
    body: "Move away from high-pressure sales mechanics and make the purchase experience clearer, more transparent, and more aligned with the product’s value.",
    impact: "Impact: purchase conversion, cancellation rate, long-term retention.",
  },
  {
    title: "Expand upsell opportunities",
    body: "Create relevant moments to move existing subscribers to higher-value plans and additional benefits.",
    impact: "Impact: upsell conversion, ARPU, subscriber LTV.",
  },
] as const;

const journey = ["Sees paywall", "Opens checkout", "Sees upsell", "Sees success", "Goes to service"] as const;

function PhoneVisual() {
  return (
    <div className={styles.media} aria-label="Image area">
      <Image
        src="/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png"
        alt="Yandex Plus paywall on an iPhone"
        width={994}
        height={1978}
        sizes="(max-width: 760px) 70vw, 28vw"
        className={styles.phone}
      />
    </div>
  );
}

function MediaSlide({
  title,
  eyebrow,
  children,
  primary = false,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <section className={`${styles.slide} ${styles.mediaSlide}`}>
      <div className={styles.copy}>
        <div>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          {primary ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
        </div>
        {children}
      </div>
      <PhoneVisual />
    </section>
  );
}

export default function PlusCaseStudy() {
  return (
    <main className={styles.deck}>
      <MediaSlide title="How to sell subscription well" eyebrow="Case Study by Veniamin Vekk" primary>
        <div className={styles.overview}>
          <article className={styles.block}>
            <h3>Role</h3>
            <p>Lead Product Designer</p>
          </article>
          <article className={styles.block}>
            <h3>Impact</h3>
            {impact.map((item) => <p key={item}>{item}</p>)}
          </article>
        </div>
      </MediaSlide>

      <MediaSlide title="What is Yandex Plus?" eyebrow="The region’s largest multi-service subscription">
        <div className={styles.stack}>
          {context.map((item) => (
            <article className={styles.block} key={item.value}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </MediaSlide>

      <MediaSlide title="Main paywall wasn’t built for the new subscription strategy">
        <div className={styles.stack}>
          {problems.map((item) => (
            <article className={styles.block} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </MediaSlide>

      <section className={`${styles.slide} ${styles.textSlide}`}>
        <h2 className={styles.title}>Strategic priorities</h2>
        <div className={styles.grid}>
          {priorities.map((item) => (
            <article className={styles.block} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className={styles.impact}>{item.impact}</p>
            </article>
          ))}
        </div>
      </section>

      <MediaSlide title="Flow" eyebrow="From first touch to the service">
        <ol className={styles.journey}>
          {journey.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </MediaSlide>

      <section className={`${styles.slide} ${styles.planSlide}`}>
        <div>
          <h2 className={styles.title}>Plan</h2>
          <p>Взять каждую часть продукта и применить к ней стратегию нашего продукта</p>
        </div>
      </section>
    </main>
  );
}
