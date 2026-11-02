import React from "react";
import { Home, Layers, Terminal } from "lucide-react";

export default function MobileNav({ activeView, activeSection, onNavigate }) {
  const left = {
    active: activeView === "portfolio" && activeSection === "projects",
  };
  const center = {
    active: activeView === "portfolio" && activeSection === "home",
  };
  const right = { active: activeView === "terminal" };

  return (
    <nav
      className="md:hidden fixed bottom-3 inset-x-4 z-50 bg-surface-card/90 backdrop-blur-xl border border-surface-border/80 rounded-2xl py-2 px-6 flex items-center justify-around shadow-2xl"
      data-purpose="mobile-bottom-nav"
    >
      <button
        data-testid="mobile-nav-projects"
        aria-label="Projects & Skills"
        onClick={() => onNavigate("portfolio", "view-projects")}
        className={`p-2 rounded-xl transition-colors flex flex-col items-center ${
          left.active ? "text-accent-cyan" : "text-slate-400 hover:text-white"
        }`}
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px] font-mono mt-0.5">Projects</span>
      </button>

      <button
        data-testid="mobile-nav-home"
        aria-label="Home"
        onClick={() => onNavigate("portfolio", "view-home")}
        className={`p-3 -mt-1 rounded-2xl flex flex-col items-center transition-all border ${
          center.active
            ? "bg-surface-raised border-accent-cyan/60 text-accent-cyan shadow-glow-cyan"
            : "bg-surface-raised border-surface-border text-slate-400"
        }`}
      >
        <Home className="w-5 h-5" />
      </button>

      <button
        data-testid="mobile-nav-terminal"
        aria-label="Terminal"
        onClick={() => onNavigate("terminal")}
        className={`p-2 rounded-xl transition-colors flex flex-col items-center ${
          right.active ? "text-accent-cyan" : "text-slate-400 hover:text-white"
        }`}
      >
        <Terminal className="w-5 h-5" />
        <span className="text-[10px] font-mono mt-0.5">Terminal</span>
      </button>
    </nav>
  );
}
