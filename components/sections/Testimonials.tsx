import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="grid gap-8 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] lg:gap-12">
      <aside className="self-start sm:sticky sm:top-5">
        <div className="flex max-w-[138px] flex-col items-start gap-3">
          <span className="section-symbol" aria-hidden="true">
            “
          </span>
          <h2 className="font-normal">People about working w/ me</h2>
        </div>
      </aside>
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <article className="card" key={item.name}>
            <div className="mb-5 flex items-center gap-4">
              <img
                src={item.avatar}
                width={64}
                height={64}
                alt={item.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>{item.role}</p>
              </div>
            </div>
            <p className="project-copy italic-text">{item.quote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
