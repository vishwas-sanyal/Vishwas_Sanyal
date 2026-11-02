import React from "react";
import { Home, Layers, Terminal, Gamepad2 } from "lucide-react";

const ITEMS = [
  {
    id: "home",
    icon: Home,
    title: "View 1: Home (Bio)",
    target: "portfolio",
    sub: "view-home",
  },
  {
    id: "projects",
    icon: Layers,
    title: "View 2: Projects & Skills",
    target: "portfolio",
    sub: "view-projects",
  },
  {
    id: "terminal",
    icon: Terminal,
    title: "View 3: Terminal (CLI)",
    target: "terminal",
  },
  {
    id: "game",
    icon: Gamepad2,
    title: "View 4: Retro Game",
    target: "game",
    pcOnly: true,
  },
];

export default function NavRail({ activeView, activeSection, onNavigate }) {
  const isActive = (item) => {
    if (item.target === "portfolio")
      return activeView === "portfolio" && activeSection === item.id;
    return activeView === item.target;
  };

  return (
    <aside
      className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4 bg-surface-card/85 backdrop-blur-xl p-2.5 rounded-3xl border border-surface-border shadow-2xl"
      data-purpose="desktop-sidebar-nav"
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item);
        return (
          <button
            key={item.id}
            data-testid={`nav-btn-${item.id}`}
            title={item.pcOnly ? `${item.title} (PC only)` : item.title}
            onClick={() => onNavigate(item.target, item.sub)}
            className={`group relative p-3 rounded-2xl transition-all duration-300 border ${
              active
                ? "bg-surface-raised border-accent-cyan/50 text-accent-cyan shadow-glow-cyan"
                : "border-transparent text-slate-400 hover:bg-surface-raised hover:border-surface-border hover:text-slate-200"
            }`}
          >
            <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute left-16 px-2.5 py-1 rounded-md bg-surface-card border border-surface-border text-xs font-mono text-slate-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-lg whitespace-nowrap">
              {item.title}
              {item.pcOnly && (
                <span className="text-xs text-amber-400 font-sans"> (PC Only)</span>
              )}
            </span>
          </button>
        );
      })}
      <div className="w-full pt-2 flex justify-center border-t border-surface-border/50">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-ping"></span>
      </div>
    </aside>
  );
}
