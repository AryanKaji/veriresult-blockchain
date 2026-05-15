import { LoginBrandPanel } from "./LoginBrandPanel";
import { StudentLoginPanel } from "./StudentLoginPanel";

export function StudentLoginPageShell() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[0.95fr_1.05fr]">
        <LoginBrandPanel
          eyebrow="Student Result System"
          highlights={[
            "Enrollment-based access",
            "Private marks and result view",
            "Simple result tracking for every semester",
          ]}
          title="Your results, ready when you are."
        />
        <StudentLoginPanel />
      </div>
    </main>
  );
}
