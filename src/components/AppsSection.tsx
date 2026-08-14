type AppEntry = {
  name: string;
  icon: string;
  status: string;
  statusActive?: boolean;
  description: string;
  tags: string[];
  href?: string;
};

const apps: AppEntry[] = [
  {
    name: "Balanzu",
    icon: "/apps/balanzu.png",
    status: "Coming soon",
    description:
      "A screen-time app for co-parenting: your kid asks to unlock a shielded app, any linked parent can approve it from a push notification, first response wins.",
    tags: ["iOS", "Screen Time", "family"],
  },
  {
    name: "SpellingAssist",
    icon: "/apps/spellingassist.png",
    status: "In review",
    statusActive: true,
    description:
      "Snap a photo of your kid's school spelling list and the words go straight in — no retyping. English and Chinese 听写 for ages 7–12, spoken aloud in a distraction-free app.",
    tags: ["iOS", "education", "kids"],
  },
];

const AppsSection = () => {
  return (
    <section id="apps" className="border-b border-line py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between gap-3 mb-6">
          <h2 className="font-display text-2xl font-bold">Apps</h2>
          <span className="font-mono text-xs text-ink-soft whitespace-nowrap">{apps.length} in progress</span>
        </div>

        <div>
          {apps.map((app, i) => {
            const content = (
              <>
                <span className="h-11 w-11 rounded-[10px] bg-surface border border-line-strong overflow-hidden flex-none">
                  <img src={app.icon} alt={`${app.name} app icon`} className="h-full w-full object-cover" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg flex flex-wrap items-center gap-2 mb-1">
                    {app.name}
                    <span
                      className={`font-mono text-[0.66rem] uppercase tracking-wide rounded-full border px-2 py-0.5 ${
                        app.statusActive
                          ? "bg-brand text-brand-ink border-brand"
                          : "text-ink-soft border-line-strong"
                      }`}
                    >
                      {app.status}
                    </span>
                  </h3>
                  <p className="text-ink-soft text-[0.94rem] mb-2 max-w-[48ch]">{app.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-ink-soft bg-paper border border-line rounded px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            const rowClass = `grid grid-cols-[44px_1fr] sm:grid-cols-[44px_1fr_auto] gap-4 items-start py-5 ${
              i > 0 ? "border-t border-line" : ""
            }`;

            return app.href ? (
              <a key={app.name} href={app.href} target="_blank" rel="noreferrer" className={rowClass}>
                {content}
                <span className="hidden sm:block font-mono text-sm text-ink-soft self-center">visit ↗</span>
              </a>
            ) : (
              <div key={app.name} className={rowClass}>
                {content}
              </div>
            );
          })}

          <div className="grid grid-cols-[44px_1fr] gap-4 items-start py-5 border-t border-line text-ink-soft">
            <span className="h-11 w-11 rounded-[10px] border border-dashed border-line-strong flex items-center justify-center flex-none">
              +
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg mb-1">Next one's aging in the cellar</h3>
              <p className="text-[0.94rem] max-w-[48ch]">
                Every app that ships gets a row here. This one just isn't ready to leave the wheel yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppsSection;
