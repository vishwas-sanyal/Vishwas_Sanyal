import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, ExternalLink, ChevronDown } from "lucide-react";
import { NAME, ROLE, BIO_SUBTITLE, BIO_TEXT, GITHUB_URL, LINKEDIN_URL } from "../data/content";
import RobotEyes from "./RobotEyes";

export default function Hero({ onNavigate }) {
  const [muted, setMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleMute = () => {
    const v = document.getElementById("hero-video");
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next && v.ended) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  
  const scrollToProjects = () => {
    const el = document.getElementById("view-projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const src = isDesktop ? "/hero.mp4" : "/hero2.mp4";

  return (
    <section
      id="view-home"
      className="relative h-screen w-full flex flex-col justify-end items-center pb-14 px-4 md:px-8 overflow-hidden border-b border-surface-border/40"
    >
      {/* Video background: hero.mp4 on desktop, hero2.mp4 on mobile. Autoplay, muted, non-looping (stops on last frame). */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" data-purpose="motion-canvas-container">
        <video
          key={src}
          id="hero-video"
          data-testid="hero-video"
          src={src}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-base/60 via-transparent to-surface-base/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#262a3d_1px,transparent_1px)] [background-size:24px_24px] opacity-20 animate-grid-pulse"></div>
      </div>

      {/* Header top-left */}
      <header className="absolute top-6 left-6 md:left-12 z-10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center font-mono font-bold text-accent-cyan text-sm">
          VS
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-white uppercase">{NAME}</h1>
          <p className="text-xs font-mono text-slate-400">{ROLE}</p>
        </div>
      </header>

      {/* Top-right mute toggle */}
      <button
        data-testid="unmute-toggle"
        aria-label={muted ? "Unmute background video" : "Mute background video"}
        onClick={toggleMute}
        className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-surface-card/80 backdrop-blur-xl border border-surface-border text-slate-300 hover:text-white transition-colors"
      >
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent-cyan" />}
      </button>

      {/* CRT Robot Eyes — opens Terminal in Nobody AI Chat Mode */}
      <RobotEyes onClick={() => onNavigate("terminal", null, { mode: "nobody" })} />

      {/* Summary card bottom-center */}
      <div
        data-testid="bio-card"
        className="relative z-10 w-full max-w-xl bg-black/20 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-center transition duration-500 hover:border-slate-400/40"
        data-purpose="bio-card"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-raised/80 border border-surface-border text-[11px] font-mono uppercase tracking-widest text-accent-cyan mb-4">
          Summary
        </div>
    {/*<h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">{NAME}</h2>*/}
        <p className="text-sm sm:text-base font-medium text-accent-cyan/90 font-mono mb-3">{BIO_SUBTITLE}</p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">{BIO_TEXT}</p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            data-testid="bio-github-link"
            href={GITHUB_URL}
            rel="noopener noreferrer"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-surface-raised hover:bg-slate-800 text-xs font-mono text-slate-200 border border-surface-border transition-colors flex items-center gap-1.5"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            data-testid="bio-linkedin-link"
            href={LINKEDIN_URL}
            rel="noopener noreferrer"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-surface-raised hover:bg-slate-800 text-xs font-mono text-slate-200 border border-surface-border transition-colors flex items-center gap-1.5"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
	    <a
            data-testid="bio-resume-link"
            href="https://drive.google.com/file/d/1e36ITtJ9kVstJl8sCzDnUKLVNX1frdlH/view?usp=sharing"
            rel="noopener noreferrer"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-cyan text-xs font-mono font-semibold text-white shadow-glow-cyan hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <span>Resume</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          <button
            data-testid="explore-projects-btn"
            onClick={scrollToProjects}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-cyan text-xs font-mono font-semibold text-white shadow-glow-cyan hover:opacity-95 transition-opacity flex items-center gap-1"
          >
            Explore Projects
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
