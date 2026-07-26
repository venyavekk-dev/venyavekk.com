import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const PAGE_TITLE = "Chord Tulza - конструктор аккордов и прогрессий - Veniamin Vekk";
const PAGE_DESCRIPTION =
  "Chord Tulza — бесплатный конструктор аккордов, тональностей и прогрессий для гитары и пианино. Как работают 7 аккордов тональности, цифры ступеней, формы на грифе, капо, севентаккорды и секвенсор.";
const PAGE_PATH = "/chords/about";
const OG_IMAGE = "/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH
  },
  openGraph: {
    title: "Chord Tulza — конструктор аккордов и прогрессий",
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: "Veniamin Vekk",
    images: [OG_IMAGE],
    locale: "ru_RU",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chord Tulza — конструктор аккордов и прогрессий",
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE]
  }
};

const FAQ_ITEMS = [
  {
    question: "Почему аккордов в тональности всегда ровно 7?",
    answer:
      "Тональность — это гамма из семи нот, выстроенных по шаблону тонов и полутонов (для мажора тон-тон-полутон-тон-тон-тон-полутон). На каждой из семи нот строится трезвучие, поэтому диатонических аккордов тональности всегда ровно семь — например, в до мажоре это C, Dm, Em, F, G, Am, Bdim."
  },
  {
    question: "Что означают римские цифры I—VII под аккордами?",
    answer:
      "Римская цифра — это номер ступени аккорда в гамме. Заглавная цифра (I, IV, V) означает мажорное трезвучие, строчная (ii, iii, vi) — минорное, строчная с кружком (vii°) — уменьшённое. Порядок фиксирован для лада: в мажоре I ii iii IV V vi vii°, в миноре i ii° III iv v VI VII."
  },
  {
    question: "Что означают функции дом, прогулка и напряжение в аккордах?",
    answer:
      "Это бытовое название трёх музыкальных функций ступеней: тоника (дом, самая устойчивая), субдоминанта (прогулка, уводит от тоники) и доминанта (напряжение, тянет обратно к тонике). Цветной индикатор между аккордами в Chord Tulza показывает, насколько естественен переход между этими ролями."
  },
  {
    question: "Как один аккорд превращается в несколько форм (аппликатур) на гитаре?",
    answer:
      "Chord Tulza сначала предлагает известные формы: открытую аппликатуру и подвижные баррэ-формы E-shape и A-shape из системы CAGED. Если готовых форм не хватает, инструмент перебирает весь гриф, оставляет только удобные варианты (не шире четырёх ладов) и показывает до десяти штук, от самых простых к сложным."
  },
  {
    question: "Что такое тональность и как она влияет на аккорды?",
    answer:
      "Тональность — это выбор главной ноты и лада (мажор или минор). Вместе они задают гамму из семи нот и, соответственно, весь набор диатонических аккордов, их ролей и допустимых sus- и севентаккорд-вариантов. Всего в инструменте 12 нот × 2 лада — 24 тональности."
  },
  {
    question: "Как капо (каподастр) меняет тональность и аппликатуры?",
    answer:
      "Капо укорачивает струны и поднимает их открытый звук на число полутонов, равное номеру лада. В Chord Tulza клик по ладу на грифе поднимает тональность на столько же полутонов и пересчитывает аппликатуры так, чтобы ни одна не требовала зажимать струну до капо."
  },
  {
    question: "Что такое севентаккорды (септаккорды) и почему они разные на каждой ступени?",
    answer:
      "Севентаккорд — это трезвучие плюс ещё одна нота из той же гаммы. Тип получившегося септаккорда зависит от ступени: на уменьшенной — полууменьшенный, на минорных — минорный, на доминанте — доминантсептаккорд, на остальных мажорных — большой мажорный (maj7). В до мажоре это Cmaj7, Dm7, Em7, Fmaj7, G7, Am7, Bm7♭5."
  }
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Veniamin Vekk", item: "https://venyavekk.com/" },
        { "@type": "ListItem", position: 2, name: "Chord Tulza", item: "https://venyavekk.com/chords" },
        { "@type": "ListItem", position: 3, name: "Как устроен Chord Tulza", item: `https://venyavekk.com${PAGE_PATH}` }
      ]
    },
    {
      "@type": "WebApplication",
      name: "Chord Tulza",
      url: "https://venyavekk.com/chords",
      description:
        "Бесплатный конструктор аккордов, тональностей и прогрессий для гитары и пианино: диатонические аккорды тональности, аппликатуры, капо, севентаккорды и шаговый секвенсор.",
      applicationCategory: "MusicApplication",
      operatingSystem: "Web",
      author: {
        "@type": "Person",
        name: "Veniamin Vekk",
        url: "https://venyavekk.com/"
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ]
};

function PillButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 text-[0.95rem] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "pill-primary bg-[#0071e3] text-white hover:bg-[#0077ed]"
      : "pill-secondary border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff]/10";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function Card({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-10 rounded-[1.25rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)] sm:p-10">
      {children}
    </div>
  );
}

function FeatureCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-1.5 text-[1.05rem] font-semibold text-white">{title}</h3>
      <p className="text-[0.925rem] leading-snug text-white/70">{children}</p>
    </div>
  );
}

function TheoryCard({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Card id={id}>
      <h2 className="mb-4 text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">{title}</h2>
      <div className="space-y-4 text-[1rem] leading-relaxed text-white/78">{children}</div>
    </Card>
  );
}

const TOC_GROUPS: Array<{ label: string; items: Array<{ href: string; label: string }> }> = [
  {
    label: "Коротко",
    items: [
      { href: "#made-by", label: "Кто это сделал" },
      { href: "#how-it-works", label: "Как это работает" },
      { href: "#why", label: "Зачем он нужен" }
    ]
  },
  {
    label: "Подробно",
    items: [
      { href: "#degrees-seven", label: "Почему всегда 7 аккордов" },
      { href: "#roman-numerals", label: "Цифры I—VII" },
      { href: "#functions", label: "Дом, прогулка, напряжение" },
      { href: "#voicings", label: "Формы аккордов" },
      { href: "#tonality", label: "Тональность" },
      { href: "#capo", label: "Капо" },
      { href: "#sevenths", label: "Севентаккорды" }
    ]
  },
  {
    label: "Секвенсор и звук",
    items: [
      { href: "#sequencer-build", label: "Как собрать прогрессию" },
      { href: "#sequencer-playback", label: "Шаги и темп" },
      { href: "#sequencer-presets", label: "Примеры песен и экспорт" },
      { href: "#sound", label: "Звук и громкость" }
    ]
  }
];

function TableOfContents() {
  return (
    <aside className="order-first flex flex-col gap-6 lg:sticky lg:top-10 lg:order-2 lg:w-[230px] lg:shrink-0">
      <nav aria-label="Разделы страницы" className="flex flex-col gap-6">
        {TOC_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs uppercase tracking-wide text-white/45">{group.label}</p>
            <ul className="flex flex-col gap-1.5 border-l border-white/10 pl-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="toc-link block text-[0.9rem] leading-snug text-white/62 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default function ChordsAboutPage() {
  return (
    <main lang="ru" className="min-h-screen bg-[#1c1c1c] px-5 py-14 text-white sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto max-w-[720px]">
        <section className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex rounded-full border border-white/24 px-3 py-1 text-xs uppercase tracking-wide text-white/62">
            О проекте
          </span>
          <h1 className="text-[clamp(2rem,6vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white">
            Chord&nbsp;Tulza — конструктор аккордов и&nbsp;прогрессий для&nbsp;гитары и&nbsp;пианино
          </h1>
          <p className="max-w-[46ch] text-[clamp(1rem,2vw,1.125rem)] leading-snug text-white/78">
            Бесплатный инструмент для&nbsp;музыкантов: показывает все аккорды тональности, их&nbsp;формы
            на&nbsp;грифе и&nbsp;клавишах и&nbsp;помогает на&nbsp;слух собирать прогрессии.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PillButton href="/chords">Открыть Chord&nbsp;Tulza</PillButton>
            <PillButton href="/" variant="secondary">
              На&nbsp;сайт Вени
            </PillButton>
          </div>
        </section>
      </div>

      <div className="mx-auto flex max-w-[980px] flex-col gap-10 pt-12 lg:flex-row lg:items-start lg:gap-12">
        <TableOfContents />

        <article className="flex flex-1 flex-col gap-8 lg:order-1 lg:max-w-[680px]">
          <Card id="made-by">
            <h2 className="mb-4 text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">
              Кто это сделал
            </h2>
            <div className="space-y-4 text-[1rem] leading-relaxed text-white/78">
              <p>
                Chord&nbsp;Tulza придумал и&nbsp;собрал Вениамин Векк — дизайнер и&nbsp;музыкант, а&nbsp;не&nbsp;программист.
                Весь код инструмента написан «вайбкодингом»: с&nbsp;помощью ИИ-агентов (Claude и&nbsp;Codex), которым он
                ставил задачи, показывал скриншоты и&nbsp;просил переделать то, что звучало или выглядело не&nbsp;так. Сам
                он не&nbsp;написал ни&nbsp;строчки кода руками — зато отвечал за&nbsp;каждое музыкальное и&nbsp;дизайнерское
                решение и&nbsp;проверял всё на&nbsp;слух.
              </p>
              <p>
                Это значит, что инструмент — живой и&nbsp;постоянно меняется: что-то доделывается, что-то ломается
                и&nbsp;чинится заново. Если найдёшь баг — это, скорее всего, не&nbsp;задумка, а&nbsp;огрех вайбкодинга.
              </p>
            </div>
          </Card>

          <Card id="how-it-works">
            <h2 className="mb-2 text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">
              Как это работает
            </h2>
            <p className="mb-5 text-[1rem] leading-relaxed text-white/78">
              Открываешь инструмент, выбираешь тональность и&nbsp;лад — дальше всё остальное подстраивается само:
              аккорды, их&nbsp;формы, звук.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FeatureCard title="Тональность и лад">
                Выбери ноту и&nbsp;мажор/минор — весь набор аккордов, их&nbsp;роли и&nbsp;формы пересчитаются сами.
              </FeatureCard>
              <FeatureCard title="7 аккордов ступени">
                Весь диатонический набор тональности одним рядом, с&nbsp;римской цифрой ступени над каждым.
              </FeatureCard>
              <FeatureCard title="Sus- и севентаккорды">
                У&nbsp;каждой ступени есть sus2-, sus4- и&nbsp;септаккорд-вариант — но&nbsp;только если он остаётся
                в&nbsp;тональности.
              </FeatureCard>
              <FeatureCard title="Аппликатуры на гитаре">
                Несколько способов взять один и&nbsp;тот&nbsp;же аккорд: от&nbsp;открытых до&nbsp;баррэ-форм.
              </FeatureCard>
              <FeatureCard title="Капо">
                Клик по&nbsp;ладу на&nbsp;грифе моделирует каподастр: тональность и&nbsp;аппликатуры пересчитываются.
              </FeatureCard>
              <FeatureCard title="Секвенсор">
                Превращает ряд аккордов в&nbsp;шаговый секвенсор с&nbsp;BPM, шаффлом и&nbsp;пресетами настоящих песен.
              </FeatureCard>
              <FeatureCard title="Подсказки о переходах">
                Цветные индикаторы показывают, насколько «естественно» звучит переход к&nbsp;следующему аккорду.
              </FeatureCard>
              <FeatureCard title="Гитара, пианино или оба">
                Переключение инструмента, три пресета звука и&nbsp;громкость.
              </FeatureCard>
            </div>
          </Card>

          <Card id="why">
            <h2 className="mb-4 text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">
              Зачем он нужен
            </h2>
            <div className="space-y-4 text-[1rem] leading-relaxed text-white/78">
              <p>
                Chord&nbsp;Tulza — не&nbsp;тюнер и&nbsp;не&nbsp;табулатурник, а&nbsp;помощник для&nbsp;тех, кто сочиняет
                или подбирает музыку. Он пригодится, если ты:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>сочиняешь песню и&nbsp;ищешь, какие аккорды вообще сочетаются в&nbsp;выбранной тональности;</li>
                <li>
                  подбираешь чужую песню на&nbsp;слух и&nbsp;хочешь быстро проверить прогрессию или найти удобную
                  аппликатуру;
                </li>
                <li>
                  учишь теорию и&nbsp;хочешь видеть, как ступени и&nbsp;их&nbsp;роли работают в&nbsp;реальном времени,
                  а&nbsp;не&nbsp;по учебнику;
                </li>
                <li>поёшь и&nbsp;тебе нужно быстро пересчитать капо под&nbsp;удобную высоту голоса.</li>
              </ul>
              <p>
                Инструмент рассчитан на&nbsp;то, чтобы пробовать и&nbsp;слышать, а&nbsp;не&nbsp;запоминать теорию
                наизусть — он всё равно постоянно подсказывает по&nbsp;ходу дела.
              </p>
            </div>
          </Card>

          <TheoryCard id="degrees-seven" title="Почему аккордов всегда ровно 7?">
            <p>
              Тональность — это не&nbsp;просто одна нота, а&nbsp;целая гамма из&nbsp;семи нот, выстроенных
              по&nbsp;определённому шаблону расстояний между ними. Для мажора это тон-тон-полутон-тон-тон-тон-полутон,
              для минора — тон-полутон-тон-тон-полутон-тон-тон. От&nbsp;выбранной ноты этот шаблон всегда даёт ровно
              семь нот гаммы — не&nbsp;больше и&nbsp;не&nbsp;меньше.
            </p>
            <p>
              На&nbsp;каждой из&nbsp;этих семи нот можно построить трезвучие — аккорд из&nbsp;трёх нот, взятых через одну
              по&nbsp;этой же гамме. Семь нот — семь трезвучий, отсюда и&nbsp;семь аккордов на&nbsp;экране. Это
              и&nbsp;есть «диатонические» аккорды тональности — те, что не&nbsp;выходят за&nbsp;её пределы и&nbsp;поэтому
              звучат «дома», в&nbsp;отличие от&nbsp;аккорда, взятого наугад.
            </p>
            <p>
              Например, гамма до&nbsp;мажор — это до, ре, ми, фа, соль, ля, си (C&nbsp;D&nbsp;E&nbsp;F&nbsp;G&nbsp;A&nbsp;B).
              Ровно семь нот — и,&nbsp;значит, ровно семь трезвучий: C, Dm, Em, F, G, Am, Bdim. Это и&nbsp;есть весь
              набор аккордов, который Chord&nbsp;Tulza покажет для&nbsp;тональности до&nbsp;мажор.
            </p>
          </TheoryCard>

          <TheoryCard id="roman-numerals" title="Что означают цифры I—VII?">
            <p>
              Римская цифра под каждым аккордом — это его ступень: место в&nbsp;гамме, от&nbsp;первой ноты тональности
              (I) до&nbsp;седьмой (VII). Регистр цифры сразу говорит, какой это аккорд:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>ЗАГЛАВНАЯ (I, IV, V) — мажорное трезвучие;</li>
              <li>строчная (ii, iii, vi) — минорное;</li>
              <li>строчная с&nbsp;кружком (vii°) — уменьшенное, самое неустойчивое из&nbsp;семи.</li>
            </ul>
            <p>
              В&nbsp;мажорной тональности порядок фиксирован: I&nbsp;ii&nbsp;iii&nbsp;IV&nbsp;V&nbsp;vi&nbsp;vii°.
              В&nbsp;миноре — свой: i&nbsp;ii°&nbsp;III&nbsp;iv&nbsp;v&nbsp;VI&nbsp;VII. На&nbsp;примере до&nbsp;мажор это
              выглядит так: I&nbsp;=&nbsp;C, ii&nbsp;=&nbsp;Dm, iii&nbsp;=&nbsp;Em, IV&nbsp;=&nbsp;F, V&nbsp;=&nbsp;G,
              vi&nbsp;=&nbsp;Am, vii°&nbsp;=&nbsp;Bdim.
            </p>
            <p>
              Смени тональность с&nbsp;до-мажор на&nbsp;ре-мажор — ноты аккордов изменятся, а&nbsp;последовательность
              заглавных и&nbsp;строчных цифр останется той&nbsp;же. Поэтому про песню можно говорить «I-V-vi-IV»,
              не&nbsp;привязываясь к&nbsp;конкретной тональности.
            </p>
          </TheoryCard>

          <TheoryCard id="functions" title="Дом, прогулка, напряжение: зачем нужны цветные точки?">
            <p>Каждая ступень тяготеет к&nbsp;одной из&nbsp;трёх ролей:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>тоника (I, iii, vi в&nbsp;мажоре) — самая устойчивая, «дом»;</li>
              <li>субдоминанта (ii, IV) — уводит от&nbsp;дома, «прогулка»;</li>
              <li>доминанта (V, vii°) — создаёт напряжение, которое тянет обратно к&nbsp;тонике.</li>
            </ul>
            <p>
              Возьмём знакомую прогрессию I-IV-V-I (в&nbsp;до&nbsp;мажоре — C-F-G-C): I&nbsp;— стоишь дома, IV&nbsp;—
              вышел прогуляться, V&nbsp;— прогулка обернулась напряжением, I&nbsp;— напряжение снимается возвращением
              домой. Отсюда и&nbsp;ощущение завершённости у&nbsp;такой последовательности.
            </p>
            <p>
              Цветной индикатор между аккордами в&nbsp;Chord&nbsp;Tulza — подсказка о&nbsp;том, куда мысленно ведёт
              нынешний аккорд: зелёный — переход между ролями естественный (например, из&nbsp;напряжения обратно домой),
              жёлтый — рабочая, но&nbsp;менее очевидная связка, красный — аккорды одной роли просто меняют цвет,
              не&nbsp;создавая движения. Это ориентир, а&nbsp;не&nbsp;правило — многие хорошие песни специально его
              нарушают.
            </p>
          </TheoryCard>

          <TheoryCard id="voicings" title="Как один аккорд превращается в несколько форм на грифе?">
            <p>
              Один и&nbsp;тот&nbsp;же аккорд можно взять на&nbsp;гитаре десятком разных способов — просто зажимая
              разные струны в&nbsp;разных ладах. Chord&nbsp;Tulza сначала предлагает знакомые формы: открытую
              аппликатуру, если она существует для&nbsp;этого аккорда, и&nbsp;подвижные баррэ-формы, «выросшие»
              из&nbsp;открытых E&nbsp;и&nbsp;A (те самые «E-shape» и&nbsp;«A-shape» из&nbsp;системы CAGED), плюс
              компактное трезвучие на&nbsp;четырёх верхних струнах.
            </p>
            <p>
              Если знакомых форм не&nbsp;хватает — например, у&nbsp;sus2, sus4 и&nbsp;септаккордов своих готовых
              шаблонов нет, — инструмент перебирает гриф целиком: пробует комбинации ладов на&nbsp;всех шести струнах,
              оставляет только те, где действительно звучат все ноты аккорда, и&nbsp;отбрасывает слишком растянутые
              (больше четырёх ладов между крайними пальцами) или с&nbsp;более чем одной заглушённой струной внутри
              аккорда. Из&nbsp;оставшегося показывает до&nbsp;десяти вариантов — сначала самые удобные (низкие лады,
              открытые струны, знакомые формы), сложные — в&nbsp;конце.
            </p>
            <p>
              Выбор запоминается отдельно для&nbsp;каждого аккорда: если для&nbsp;G ты предпочитаешь баррэ на&nbsp;
              третьем ладу, а&nbsp;не&nbsp;открытую форму, в&nbsp;следующий раз инструмент сразу предложит именно её.
            </p>
          </TheoryCard>

          <TheoryCard id="tonality" title="Тональность: что это и как она всё меняет?">
            <p>
              Тональность — это выбор двух вещей: главной ноты (например, ля) и&nbsp;лада (мажор или минор). Вместе они
              задают ту&nbsp;самую гамму из&nbsp;семи нот и,&nbsp;значит, все семь диатонических аккордов, их&nbsp;роли
              и&nbsp;то, какие sus- и&nbsp;севентаккорд-варианты у&nbsp;них вообще могут быть — Chord&nbsp;Tulza
              показывает только те, чьи ноты не&nbsp;выходят за&nbsp;пределы тональности. Всего в&nbsp;инструменте
              12&nbsp;нот × 2&nbsp;лада — 24&nbsp;тональности, и&nbsp;для каждой этот расчёт происходит заново.
            </p>
            <p>
              Смена тональности не&nbsp;меняет форму песни — прогрессия «I-V-vi-IV» остаётся собой что&nbsp;в&nbsp;до,
              что&nbsp;в&nbsp;ре, — но&nbsp;целиком меняет высоту звучания и,&nbsp;на&nbsp;гитаре, набор удобных
              аппликатур.
            </p>
          </TheoryCard>

          <TheoryCard id="capo" title="Как капо сдвигает тональность?">
            <p>
              Каподастр — механическая «зажимка» на&nbsp;грифе, которая укорачивает все струны разом и&nbsp;поднимает
              их&nbsp;открытый звук на&nbsp;нужное число полутонов. Играя привычную форму ре, но&nbsp;с&nbsp;капо
              на&nbsp;пятом ладу, ты&nbsp;на&nbsp;самом деле звучишь в&nbsp;соль — форма та&nbsp;же, а&nbsp;реальная
              тональность другая.
            </p>
            <p>
              В&nbsp;Chord&nbsp;Tulza это смоделировано буквально: клик по&nbsp;номеру лада на&nbsp;грифе поднимает
              тональность на&nbsp;столько&nbsp;же полутонов и&nbsp;пересчитывает набор аппликатур так, чтобы ни&nbsp;одна
              не&nbsp;требовала прижимать струну до&nbsp;капо — это физически невозможно, там уже играет капо. Повторный
              клик по&nbsp;тому&nbsp;же ладу снимает капо и&nbsp;возвращает исходную тональность.
            </p>
          </TheoryCard>

          <TheoryCard id="sevenths" title="Севентаккорды (sevenths): почему они разные на каждой ступени?">
            <p>
              Севентаккорд, он же септаккорд, — это трезвучие плюс ещё одна нота, через ступень выше третьей. Если
              брать эту дополнительную ноту строго из&nbsp;той&nbsp;же гаммы, ничего не&nbsp;повышая и&nbsp;не&nbsp;понижая,
              на&nbsp;разных ступенях получаются разные типы септаккордов — и&nbsp;это не&nbsp;случайность, а&nbsp;прямое
              следствие того, как в&nbsp;гамме расставлены тона и&nbsp;полутона:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>на&nbsp;уменьшенной ступени (vii° в&nbsp;мажоре, ii° в&nbsp;миноре) — полууменьшенный септаккорд;</li>
              <li>на&nbsp;минорных ступенях — минорный септаккорд;</li>
              <li>
                на&nbsp;доминанте (V в&nbsp;мажоре, VII в&nbsp;миноре) — доминантсептаккорд, тот самый «блюзовый»
                аккорд с&nbsp;пониженной седьмой, который сильнее всего тянет к&nbsp;тонике;
              </li>
              <li>на&nbsp;остальных мажорных ступенях — большой мажорный септаккорд (maj7).</li>
            </ul>
            <p>
              На&nbsp;примере до&nbsp;мажор получится: Cmaj7, Dm7, Em7, Fmaj7, G7, Am7, Bm7♭5 — семь разных типов
              септаккорда, и&nbsp;ни&nbsp;один не&nbsp;добавлен наугад. Chord&nbsp;Tulza показывает такой вариант
              для&nbsp;каждой ступени по&nbsp;этому&nbsp;же принципу, так что все предложенные севентаккорды остаются
              внутри тональности.
            </p>
          </TheoryCard>

          <TheoryCard id="sequencer-build" title="Секвенсор: как собрать прогрессию">
            <p>
              Кнопка «Секвенсор» в&nbsp;шапке превращает ряд аккордов ступени в&nbsp;пошаговый секвенсор. Дальше клик
              по&nbsp;аккорду (или по&nbsp;любому его sus- или севентаккорд-варианту) работает как обычно — проигрывает
              его и&nbsp;делает активным, — но&nbsp;вдобавок добавляет его в&nbsp;очередь шагов. Повторы разрешены: один
              и&nbsp;тот&nbsp;же аккорд можно добавить подряд сколько угодно раз.
            </p>
            <p>
              Сама очередь видна отдельно — в&nbsp;ряду шагов под грифом или клавишами. На&nbsp;кнопках аккордов
              никакой подсветки нет специально, чтобы не&nbsp;путать «добавлено в&nbsp;секвенсор» с&nbsp;обычным
              выбором активного аккорда.
            </p>
            <p>
              Готовую очередь можно перетасовать одной кнопкой — шаффл заполняет все шаги случайными диатоническими
              аккордами текущей тональности. Шаги внутри очереди переставляются перетаскиванием прямо в&nbsp;ряду
              слотов, а&nbsp;клик по&nbsp;заполненному слоту убирает именно этот шаг, не&nbsp;трогая остальные. Число
              шагов настраивается отдельно, от&nbsp;двух до&nbsp;восьми, — если уменьшить его, лишние шаги с&nbsp;конца
              просто обрежутся.
            </p>
          </TheoryCard>

          <TheoryCard id="sequencer-playback" title="Секвенсор: шаги и темп">
            <p>
              Play запускает зацикленное воспроизведение — секвенсор проигрывает шаги по&nbsp;кругу, подсвечивая
              текущий, пока не&nbsp;нажмёшь паузу.
            </p>
            <p>
              Темп задаётся в&nbsp;BPM (ударах в&nbsp;минуту), от&nbsp;40 до&nbsp;220: можно крутить плюс/минус
              по&nbsp;пять либо вписать число прямо в&nbsp;поле — значение подрежется до&nbsp;допустимого диапазона
              только когда убираешь фокус с&nbsp;поля, так что печатать промежуточные цифры не&nbsp;мешает. Интервал
              между шагами инструмент считает из&nbsp;BPM сам.
            </p>
            <p>
              Смена тональности или лада останавливает воспроизведение и&nbsp;полностью очищает очередь: старые
              аккорды не&nbsp;переносятся в&nbsp;новую тональность, потому что в&nbsp;общем случае для&nbsp;них
              попросту нет прямого соответствия среди новых семи ступеней.
            </p>
          </TheoryCard>

          <TheoryCard id="sequencer-presets" title="Секвенсор: примеры песен и экспорт">
            <p>
              Кнопка «Эксплор» открывает готовые прогрессии реальных песен, подобранные по&nbsp;цифрам ступеней
              (например, I-V-vi-IV), а&nbsp;не&nbsp;по конкретным нотам — поэтому один и&nbsp;тот&nbsp;же пример
              правильно подставляется в&nbsp;любой тональности. Стрелками листаешь список; в&nbsp;приоритете — песни,
              чья настоящая тональность совпадает с&nbsp;выбранной сейчас, дальше — остальные примеры того&nbsp;же
              лада. Выбор сразу подставляет аккорды примера в&nbsp;очередь шагов вместе с&nbsp;его собственным BPM.
            </p>
            <p>
              Кнопка копирования переносит текущую последовательность в&nbsp;буфер обмена простым текстом вида
              «C&nbsp;-&nbsp;G&nbsp;-&nbsp;Am&nbsp;-&nbsp;F, 96&nbsp;BPM» — удобно вставить в&nbsp;заметки или
              показать другому музыканту. Корзина удаляет всю очередь разом и&nbsp;специально стоит последней
              в&nbsp;панели, подальше от&nbsp;play, чтобы не&nbsp;смахнуть прогрессию случайно.
            </p>
          </TheoryCard>

          <TheoryCard id="sound" title="Звук и громкость">
            <p>
              Три пресета — Velvet, Clean и&nbsp;Air — это разные тембры синтезированного звука аккорда,
              переключаются одной кнопкой в&nbsp;шапке по&nbsp;кругу. Velvet звучит мягче всего: у&nbsp;него самая
              плавная атака и&nbsp;заметный хвост из&nbsp;реверба и&nbsp;дилея. Clean, наоборот, атакует почти
              мгновенно и&nbsp;суше — больше похоже на&nbsp;чёткий щипок струны. Air даёт самый просторный
              и&nbsp;гулкий звук: чистый синусоидальный тон с&nbsp;наибольшим ревербом из&nbsp;трёх пресетов.
            </p>
            <p>
              Громкость — обычный слайдер в&nbsp;настройках, применяется сразу и&nbsp;запоминается в&nbsp;браузере
              между визитами. Кнопка play в&nbsp;шапке проигрывает текущий аккорд выбранным пресетом
              и&nbsp;громкостью в&nbsp;любой момент, не&nbsp;заставляя заново кликать по&nbsp;аккорду на&nbsp;грифе.
            </p>
          </TheoryCard>

          <section className="flex flex-col items-center gap-5 pt-4 text-center">
            <h2 className="text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">Попробуй сам</h2>
            <p className="max-w-[46ch] text-[1rem] leading-relaxed text-white/78">
              Проще один раз покликать по&nbsp;тональностям и&nbsp;аккордам, чем читать про них.
            </p>
            <PillButton href="/chords">Открыть Chord&nbsp;Tulza</PillButton>
          </section>
        </article>
      </div>
    </main>
  );
}
