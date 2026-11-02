import React, { useCallback, useEffect, useState } from "react";
import NavRail from "./components/NavRail";
import MobileNav from "./components/MobileNav";
import Hero from "./components/Hero";
import ProjectsView from "./components/ProjectsView";
import TerminalView from "./components/TerminalView";
import GameView from "./components/GameView";

export default function App() {
  const [activeView, setActiveView] = useState("portfolio"); // portfolio | terminal | game
  const [activeSection, setActiveSection] = useState("home"); // home | projects (views 1 & 2)
  const [terminalMode, setTerminalMode] = useState("shell"); // shell | nobody
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll spy: views 1 & 2 share one scroll container, so keep the active nav icon in sync.
  useEffect(() => {
    if (activeView !== "portfolio") return undefined;
    const onScroll = () => {
      const el = document.getElementById("view-projects");
      if (!el) return;
      setActiveSection(
        el.getBoundingClientRect().top <= window.innerHeight * 0.45 ? "projects" : "home"
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeView]);

  const navigate = useCallback((target, subTarget, opts) => {
    if (target === "portfolio") {
      setActiveView("portfolio");
      setTimeout(() => {
        const el = document.getElementById(subTarget || "view-home");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      if (target === "terminal") {
        setTerminalMode(opts && opts.mode ? opts.mode : "shell");
      }
      setActiveView(target);
      window.scrollTo({ top: 0 });
      if (target === "terminal") {
        setTimeout(() => {
          const input = document.getElementById("terminal-input");
          if (input) input.focus();
        }, 200);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-surface-base text-slate-200 font-sans antialiased overflow-x-clip selection:bg-accent-indigo selection:text-white">
      <NavRail activeView={activeView} activeSection={activeSection} onNavigate={navigate} />
      <MobileNav activeView={activeView} activeSection={activeSection} onNavigate={navigate} />

      <main className="w-full min-h-screen md:pl-24 transition-all">
        {/* Views 1 & 2: connected vertical scroll container (hidden when a click-only workspace is open) */}
        <div id="view-portfolio" className={activeView === "portfolio" ? "block" : "hidden"}>
          <Hero onNavigate={navigate} />
          <ProjectsView />
        </div>

        {/* View 3: Terminal — click-only full-screen workspace (Shell Mode / Nobody AI Mode) */}
        {activeView === "terminal" && (
          <TerminalView mode={terminalMode} onModeChange={setTerminalMode} />
        )}

        {/* View 4: Gamezone — click-only, desktop-only */}
        {activeView === "game" &&
          (isDesktop ? (
            <GameView />
          ) : (
            <section className="min-h-screen flex items-center justify-center p-6">
              <div className="max-w-sm w-full bg-surface-card border border-surface-border rounded-3xl p-8 text-center">
                <span className="px-3 py-1 rounded-full bg-surface-base border border-surface-border text-xs font-mono text-amber-400">
                  [PC ONLY]
                </span>
                <h4 className="text-xl font-bold text-white mt-4 mb-2">Gamezone</h4>
                <p className="text-xs font-mono text-slate-400">
                  This workspace needs a keyboard. Open the portfolio on a desktop to play.
                </p>
              </div>
            </section>
          ))}
      </main>
    </div>
  );
}
