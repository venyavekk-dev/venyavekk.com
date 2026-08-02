import { ExternalLink } from "@/components/ui/ExternalLink";

const projects = [
  {
    title: "Chord Tulza",
    description: "A chord workspace for sketching progressions, exploring voicings, and shaping song ideas.",
    href: "https://chords.venyavekk.com",
    mark: "chord"
  },
  {
    title: "Tulzy",
    description: "A curated catalog of useful AI tools created by designers.",
    href: "https://github.com/venyavekk-dev/tulzy",
    mark: "tulzy"
  },
  {
    title: "HeadRush Scene Builder",
    description: "A Codex skill that turns a HeadRush rig into a reliable CLEAN / SOLO performance setup.",
    mark: "headrush"
  }
] as const;

export function AIProjectsSection() {
  return (
    <section className="ai-projects-section grid gap-8 text-body sm:grid-cols-[minmax(210px,0.5fr)_minmax(0,1.5fr)] lg:gap-12">
      <aside className="space-y-3 self-start sm:sticky sm:top-5">
        <div className="flex max-w-[220px] flex-col items-start gap-3">
          <div className="ai-maker-logos" aria-hidden="true">
            <CodexLogo />
            <ClaudeLogo />
          </div>
          <div className="space-y-0.5">
            <h2 className="font-normal">Made with AI</h2>
            <p>Codex &amp; Claude</p>
            <p className="pt-2 text-muted">Independent projects</p>
          </div>
        </div>
      </aside>

      <div className="ai-projects-grid">
        {projects.map((project) => {
          const content = (
            <>
              <div className="ai-project-logo-stage">
                <ProjectMark mark={project.mark} />
              </div>
              <div className="project-copy mt-3 space-y-1 sm:mt-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </>
          );

          return (
            <article className="ai-project-card group" key={project.title}>
              {"href" in project ? (
                <ExternalLink href={project.href} className="block h-full no-underline">
                  {content}
                </ExternalLink>
              ) : (
                content
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectMark({ mark }: { mark: (typeof projects)[number]["mark"] }) {
  if (mark === "chord") {
    return <img src="/assets/chord-tulza-logo.svg" alt="" className="ai-project-logo ai-project-logo-chord" aria-hidden="true" />;
  }

  if (mark === "tulzy") {
    return <span className="ai-project-wordmark ai-project-wordmark-tulzy">Тулзы</span>;
  }

  return (
    <span className="ai-project-wordmark ai-project-wordmark-headrush" aria-hidden="true">
      <span>HEAD</span>
      <span>RUSH</span>
    </span>
  );
}

function CodexLogo() {
  return (
    <span className="ai-maker-logo ai-maker-logo-codex" title="Codex">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4.25a5.25 5.25 0 0 1 4.55 2.63l5.2 9a5.25 5.25 0 0 1 0 5.24A5.25 5.25 0 0 1 21.2 23.75H10.8a5.25 5.25 0 0 1-4.55-2.63 5.25 5.25 0 0 1 0-5.24l5.2-9A5.25 5.25 0 0 1 16 4.25Z" />
        <path d="M11.45 6.88 16 9.5l4.55-2.62M6.25 15.88l4.55 2.62v5.25m14.95-7.87-4.55 2.62v5.25M16 9.5v5.25m0 0-5.2 3.75m5.2-3.75 5.2 3.75M10.8 23.75l5.2-3.62 5.2 3.62" />
      </svg>
    </span>
  );
}

function ClaudeLogo() {
  return (
    <span className="ai-maker-logo ai-maker-logo-claude" title="Claude">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 5v22M5 16h22M8.2 8.2l15.6 15.6M23.8 8.2 8.2 23.8M12.1 5.8l7.8 20.4M5.8 12.1l20.4 7.8M19.9 5.8l-7.8 20.4M26.2 12.1 5.8 19.9" />
      </svg>
    </span>
  );
}
