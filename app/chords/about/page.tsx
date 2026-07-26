import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как устроен Chord Tulza - Veniamin Vekk",
  description:
    "Гайд по Chord Tulza: почему в тональности ровно 7 аккордов, что означают цифры I-VII, как работают формы аккордов, капо и септаккорды."
};

function PillButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 text-[0.95rem] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[#0071e3] text-white hover:bg-[#0077ed]"
      : "border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff]/10";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-[#0a0a0a] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)] sm:p-10">
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

function TheoryCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <h2 className="mb-4 text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">{title}</h2>
      <div className="space-y-4 text-[1rem] leading-relaxed text-white/78">{children}</div>
    </Card>
  );
}

export default function ChordsAboutPage() {
  return (
    <main className="min-h-screen bg-[#1c1c1c] px-5 py-14 text-white sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[720px] flex-col gap-8">
        <section className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex rounded-full border border-white/24 px-3 py-1 text-xs uppercase tracking-wide text-white/62">
            О проекте
          </span>
          <h1 className="text-[clamp(2rem,6vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-white">
            Chord&nbsp;Tulza — как это устроено
          </h1>
          <p className="max-w-[46ch] text-[clamp(1rem,2vw,1.125rem)] leading-snug text-white/78">
            Гитарный и&nbsp;фортепианный тренажёр аккордов: показывает все аккорды тональности, их&nbsp;формы
            на&nbsp;грифе и&nbsp;клавишах, и&nbsp;объясняет, как они связаны между собой.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PillButton href="/chords">Открыть Chord&nbsp;Tulza</PillButton>
            <PillButton href="/" variant="secondary">
              На&nbsp;сайт Вени
            </PillButton>
          </div>
        </section>

        <Card>
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

        <Card>
          <h2 className="mb-5 text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">
            Что внутри
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FeatureCard title="Тональность и лад">
              Выбери ноту и&nbsp;мажор/минор — весь набор аккордов, их&nbsp;роли и&nbsp;формы пересчитаются сами.
            </FeatureCard>
            <FeatureCard title="7 аккордов ступени">
              Весь диатонический набор тональности одним рядом, с&nbsp;римской цифрой ступени над каждым.
            </FeatureCard>
            <FeatureCard title="Sus- и септаккорды">
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

        <TheoryCard title="Почему аккордов всегда ровно 7">
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
        </TheoryCard>

        <TheoryCard title="Что означают цифры I—VII">
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
            В&nbsp;миноре — свой: i&nbsp;ii°&nbsp;III&nbsp;iv&nbsp;v&nbsp;VI&nbsp;VII. Смени тональность с&nbsp;до-мажор
            на&nbsp;ре-мажор — ноты аккордов изменятся, а&nbsp;последовательность заглавных и&nbsp;строчных цифр
            останется той&nbsp;же. Поэтому про песню можно говорить «I-V-vi-IV», не&nbsp;привязываясь
            к&nbsp;конкретной тональности.
          </p>
        </TheoryCard>

        <TheoryCard title="Дом, прогулка, напряжение — зачем цветные точки">
          <p>Каждая ступень тяготеет к&nbsp;одной из&nbsp;трёх ролей:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>тоника (I, iii, vi в&nbsp;мажоре) — самая устойчивая, «дом»;</li>
            <li>субдоминанта (ii, IV) — уводит от&nbsp;дома, «прогулка»;</li>
            <li>доминанта (V, vii°) — создаёт напряжение, которое тянет обратно к&nbsp;тонике.</li>
          </ul>
          <p>
            Цветной индикатор между аккордами в&nbsp;Chord&nbsp;Tulza — подсказка о&nbsp;том, куда мысленно ведёт
            нынешний аккорд: зелёный — переход между ролями естественный (например, из&nbsp;напряжения обратно домой),
            жёлтый — рабочая, но&nbsp;менее очевидная связка, красный — аккорды одной роли просто меняют цвет,
            не&nbsp;создавая движения. Это ориентир, а&nbsp;не&nbsp;правило — многие хорошие песни специально его
            нарушают.
          </p>
        </TheoryCard>

        <TheoryCard title="Тональность — что это и как она всё меняет">
          <p>
            Тональность — это выбор двух вещей: главной ноты (например, ля) и&nbsp;лада (мажор или минор). Вместе они
            задают ту&nbsp;самую гамму из&nbsp;семи нот и,&nbsp;значит, все семь диатонических аккордов, их&nbsp;роли
            и&nbsp;то, какие sus- и&nbsp;септаккорд-варианты у&nbsp;них вообще могут быть — Chord&nbsp;Tulza
            показывает только те, чьи ноты не&nbsp;выходят за&nbsp;пределы тональности.
          </p>
          <p>
            Смена тональности не&nbsp;меняет форму песни — прогрессия «I-V-vi-IV» остаётся собой что&nbsp;в&nbsp;до,
            что&nbsp;в&nbsp;ре, — но&nbsp;целиком меняет высоту звучания и,&nbsp;на&nbsp;гитаре, набор удобных
            аппликатур.
          </p>
        </TheoryCard>

        <TheoryCard title="Как капо сдвигает тональность">
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

        <TheoryCard title="Как получаются септаккорды">
          <p>
            Септаккорд — это трезвучие плюс ещё одна нота, через ступень выше третьей. Если брать эту дополнительную
            ноту строго из&nbsp;той&nbsp;же гаммы, ничего не&nbsp;повышая и&nbsp;не&nbsp;понижая, на&nbsp;разных
            ступенях получаются разные типы септаккордов — и&nbsp;это не&nbsp;случайность, а&nbsp;прямое следствие
            того, как в&nbsp;гамме расставлены тона и&nbsp;полутона:
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
            Chord&nbsp;Tulza показывает септаккорд-вариант для&nbsp;каждой ступени по&nbsp;этому&nbsp;же принципу —
            все предложенные септаккорды остаются внутри тональности, а&nbsp;не&nbsp;добавлены наугад.
          </p>
        </TheoryCard>

        <section className="flex flex-col items-center gap-5 pt-4 text-center">
          <h2 className="text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight text-white">Попробуй сам</h2>
          <p className="max-w-[46ch] text-[1rem] leading-relaxed text-white/78">
            Проще один раз покликать по&nbsp;тональностям и&nbsp;аккордам, чем читать про них.
          </p>
          <PillButton href="/chords">Открыть Chord&nbsp;Tulza</PillButton>
        </section>
      </div>
    </main>
  );
}
