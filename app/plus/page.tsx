import type { Metadata } from "next";
import Image from "next/image";
import styles from "./plus.module.css";

export const metadata: Metadata = {
  title: "How to sell subscription well — Veniamin Vekk",
  description: "A product design case study about rebuilding the Yandex Plus subscription experience.",
  openGraph: {
    title: "How to sell subscription well",
    description: "A Yandex Plus product design case study by Veniamin Vekk.",
    images: ["/assets/plus/slide-01.png"],
  },
};

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

function SlideNumber({ current }: { current: number }) {
  return (
    <p className={styles.slideNumber} aria-hidden="true">
      {String(current).padStart(2, "0")} <span>/ 06</span>
    </p>
  );
}

export default function PlusCaseStudy() {
  return (
    <main className={styles.deck}>
      <section className={`${styles.slide} ${styles.splitSlide}`} aria-labelledby="plus-title">
        <SlideNumber current={1} />
        <div className={styles.copy}>
          <div>
            <h1 id="plus-title" className={styles.heroTitle}>
              How to sell
              <br />
              subscription well
            </h1>
            <p className={styles.subtitle}>Case Study by Veniamin Vekk</p>
          </div>
          <div className={styles.details}>
            <div>
              <h2>Role</h2>
              <p>Lead Product Designer</p>
            </div>
            <div>
              <h2>Impact</h2>
              <p>+4.2% payment conversion</p>
              <p>+7.4% in first-payment conversion and +4.9% in LTV per user</p>
              <p>8–16K estimated incremental subscribers</p>
              <p>₽43M estimated LTV created</p>
            </div>
          </div>
        </div>
        <div className={styles.visual}>
          <Image
            src="/assets/plus/slide-01.png"
            alt="Yandex Plus subscription screen on a phone"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.croppedVisual}
          />
        </div>
      </section>

      <section className={`${styles.slide} ${styles.splitSlide}`} aria-labelledby="what-is-plus">
        <SlideNumber current={2} />
        <div className={styles.copy}>
          <div>
            <h2 id="what-is-plus" className={styles.title}>What is Yandex Plus?</h2>
            <p className={styles.subtitle}>The region’s largest multi-service subscription</p>
          </div>
          <div className={styles.details}>
            <div>
              <h3>47.5M</h3>
              <p>subscribers</p>
            </div>
            <div>
              <h3>≈€316M</h3>
              <p>subscription revenue in Q2 2026</p>
            </div>
            <div>
              <h3>Services</h3>
              <p>Kinopoisk&nbsp;&nbsp; Yandex Music&nbsp;&nbsp; Yandex Books</p>
            </div>
            <div>
              <h3>10+</h3>
              <p>regional markets<br />with localized products, benefits, and offers</p>
            </div>
          </div>
        </div>
        <div className={styles.visual}>
          <Image
            src="/assets/plus/slide-02.png"
            alt="Colorful three-dimensional Yandex Plus service icons"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.croppedVisual}
          />
        </div>
      </section>

      <section className={`${styles.slide} ${styles.textSlide}`} aria-labelledby="priorities">
        <SlideNumber current={3} />
        <h2 id="priorities" className={styles.title}>Strategic priorities</h2>
        <div className={styles.textGrid}>
          {priorities.map((item) => (
            <article key={item.title} className={styles.textBlock}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className={styles.impact}>{item.impact}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.slide} ${styles.imageSlide}`} aria-label="Subscription flow">
        <SlideNumber current={4} />
        <Image
          src="/assets/plus/slide-04.png"
          alt="Yandex Plus subscription flow from paywall to service"
          fill
          sizes="100vw"
          className={styles.containedVisual}
        />
      </section>

      <section className={`${styles.slide} ${styles.centerSlide}`} aria-labelledby="plan">
        <SlideNumber current={5} />
        <div className={styles.centerCopy}>
          <h2 id="plan" className={styles.title}>Plan</h2>
          <p>Взять каждую часть продукта и применить к ней стратегию нашего продукта</p>
        </div>
      </section>

      <section className={`${styles.slide} ${styles.splitSlide}`} aria-labelledby="problem">
        <SlideNumber current={6} />
        <div className={styles.copy}>
          <h2 id="problem" className={styles.title}>
            Main paywall wasn’t built for the new subscription strategy
          </h2>
          <div className={styles.problemList}>
            {problems.map((item) => (
              <article key={item.title} className={styles.textBlock}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.visual}>
          <Image
            src="/assets/plus/slide-06.png"
            alt="Previous Yandex Plus paywall interface"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.croppedVisual}
          />
        </div>
      </section>
    </main>
  );
}
