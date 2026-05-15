type LoginBrandPanelProps = {
  eyebrow?: string;
  title?: string;
  highlights?: string[];
};

const DEFAULT_HIGHLIGHTS = [
  "Secure role-based login",
  "Fast marks and result workflows",
  "Clean access for admins, teachers, and students",
];

export function LoginBrandPanel({
  eyebrow = "Student Result System",
  title = "Academic access for every role.",
  highlights = DEFAULT_HIGHLIGHTS,
}: LoginBrandPanelProps) {
  return (
    <section className="flex min-h-105 flex-col justify-between bg-slate-950 p-8 text-white lg:min-h-155 lg:p-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-sm text-4xl font-semibold leading-tight lg:text-5xl">
          {title}
        </h1>
      </div>

      <div className="grid gap-3">
        {highlights.map((item) => (
          <div
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-100"
            key={item}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
