import { YouTubeEmbed } from "@next/third-parties/google";
import { talks } from "@/lib/data";

export function PublicTalks() {
  return (
    <section className="grid gap-8 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] lg:gap-12">
      <aside className="self-start sm:sticky sm:top-5">
        <div className="flex max-w-[170px] flex-col items-start gap-3">
          <span className="section-symbol" aria-hidden="true">
            ◦
          </span>
          <h2 className="font-normal">Public talks</h2>
        </div>
      </aside>
      <div className="grid gap-5 md:grid-cols-2">
        {talks.map((talk) => (
          <article key={talk.videoId}>
            <div className="card aspect-video">
              <YouTubeEmbed videoid={talk.videoId} params="rel=0&modestbranding=1" />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="font-semibold">{talk.title}</h3>
              <p>{talk.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
