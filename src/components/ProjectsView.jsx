import React, { useState } from "react";
import {
  ExternalLink,
  Mail,
  HardDrive,
  Sparkles,
  Server,
} from "lucide-react";
import {
  PROJECTS,
  SKILL_GROUPS,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../data/content";

const FIELD_NOTES = [
  {
    id: "hp-pavilion-recovery",
    tag: "LINUX // RECOVERY",
    dot: "bg-amber-400",
    icon: HardDrive,
    title: "Resurrecting a 2015 HP Pavilion to Recover Childhood DVDs",
    story:
      "Booted a dead 2015 HP Pavilion (broken HDD, 2GB RAM) off a 32GB antiX Linux USB to rescue 20 stacks of family DVDs. Troubleshot the unrecognized DVD drive via lsblk & dmesg, converted legacy .dat video files to .mp4 using FFmpeg, and uncovered a forgotten photo of 6-year-old me.",
    link: "https://lnkd.in/p/gwRd4C5i",
    linkLabel: "Post",
    highlights: ["antiX Linux", "lsblk / dmesg", "FFmpeg"],
  },
  {
    id: "ai-impact-summit",
    tag: "EVENT // COMMUNITY",
    dot: "bg-accent-cyan",
    icon: Sparkles,
    title: "AI Impact Summit 2026 — Building With AI, Not Against It",
    story:
      "Attended the AI Impact Summit 2026 alongside innovators and builders shaping what's next. Being in that room reinforced one core belief: you're looking at someone AI can't replace—because the future isn't about competing with AI, it's about learning how to build with it.",
    link: "https://lnkd.in/p/gTCH2ibt",
    linkLabel: "Post",
    highlights: ["AI Impact Summit", "Networking", "Builder Mindset"],
  },
  {
    id: "phone-minecraft-server",
    tag: "HOMELAB // SERVER",
    dot: "bg-emerald-400",
    icon: Server,
    title: "24/7 Private Minecraft Server on an Old Phone",
    story:
      "Turned my old Android phone into a dedicated 24/7 private Linux server using Termux, PaperMC, and network tunneling. Now my friends and I can jump into our own custom multiplayer world and play together from anywhere, anytime—at zero cloud cost.",
    link: null,
    highlights: ["Termux", "PaperMC", "24/7 Self-Hosted"],
  },
];

function ProjectCard({ project }) {
  return (
    <article
      data-testid={`project-card-${project.id}`}
      className="group bg-surface-card/90 hover:bg-surface-raised border border-surface-border rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-slate-500 relative"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${project.dot}`}></span>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Project {project.index}
          </span>
        </div>
        <a
          data-testid={`project-link-${project.id}`}
          href={project.link}
          rel="noopener noreferrer"
          target="_blank"
          className="text-xs font-mono text-accent-cyan hover:underline inline-flex items-center gap-1"
        >
          {project.linkLabel}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
      <h5 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
        {project.name}
      </h5>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {project.summary}
      </p>
      <div className="pt-3 border-t border-surface-border/60 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1">
          Tech stack:
        </span>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono bg-surface-base px-2.5 py-1 rounded-lg border border-surface-border text-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function BeyondTheCodeGrid() {
  return (
    <div
      data-testid="beyond-the-code-section"
      className="mt-4 pt-6 border-t border-surface-border/80"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
              // Beyond The Commits
            </span>
          </div>
          <h4 className="text-xl font-bold text-white">
            Side Quests, Events &amp; Tinkering
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-500">3 stories</span>
      </div>

      {/* 3 Static Horizontal Cards on Desktop (md:grid-cols-3) | Vertical Stack on Mobile (grid-cols-1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FIELD_NOTES.map((item) => {
          const IconComponent = item.icon;
          return (
            <article
              key={item.id}
              data-testid={`field-note-${item.id}`}
              className="bg-surface-card/90 hover:bg-surface-raised border border-surface-border hover:border-slate-500 rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                    {item.tag}
                  </span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent-cyan hover:underline inline-flex items-center gap-1"
                    >
                      {item.linkLabel}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="p-2 rounded-xl bg-surface-base border border-surface-border text-accent-cyan shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors leading-snug">
                    {item.title}
                  </h5>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.story}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-border/60 flex flex-wrap gap-1.5">
                {item.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono bg-surface-base px-2 py-0.5 rounded-md border border-surface-border text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function SkillCard() {
  return (
    <div
      data-testid="static-skill-card"
      className="bg-surface-card/90 backdrop-blur-md border border-surface-border rounded-3xl p-6 sm:p-7 shadow-xl"
    >
      <div className="flex items-center gap-2 pb-4 mb-5 border-b border-surface-border/70">
        <span className="w-2 h-2 rounded-full bg-accent-indigo"></span>
        <h4 className="font-bold text-white text-base">Skills</h4>
      </div>

      {SKILL_GROUPS.map((group, gi) => (
        <div
          key={group.label}
          className={gi < SKILL_GROUPS.length - 1 ? "mb-5" : ""}
        >
          <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan mb-2.5">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg bg-surface-base border border-surface-border text-xs text-slate-200 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 pt-4 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Availability:</span>
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Open to Opportunities
        </span>
      </div>
    </div>
  );
}

function ConnectFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {}
    );
  };

  return (
    <div
      data-testid="contact-card"
      className="mt-4 bg-gradient-to-br from-surface-card to-surface-raised border border-surface-border rounded-3xl p-6 sm:p-8"
    >
      <h5 className="text-lg font-bold text-white mb-1">Let's Connect</h5>
      <p className="text-xs text-slate-400 font-mono mb-4">
        Always open to systems design discussions, high-impact engineering
        roles, and collaborations.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <div className="w-full flex items-center justify-between bg-surface-base px-4 py-2.5 rounded-xl border border-surface-border font-mono text-xs text-slate-300">
          <span data-testid="contact-email">{EMAIL}</span>
          <button
            data-testid="copy-email-btn"
            onClick={copyEmail}
            className="ml-2 text-accent-cyan hover:text-white transition-colors uppercase text-[11px] font-semibold"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <a
          data-testid="send-email-btn"
          href={`mailto:${EMAIL}`}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-mono text-xs text-center whitespace-nowrap transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="w-3.5 h-3.5" />
          Send Email
        </a>
      </div>
      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
        <a
          data-testid="footer-github-link"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-cyan transition-colors"
        >
          GitHub
        </a>
        <a
          data-testid="footer-linkedin-link"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-cyan transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function ProjectsView() {
  return (
    <section
      id="view-projects"
      className="w-full py-16 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan"></span>
          <h2 className="font-mono text-sm tracking-wider uppercase text-slate-300">
            Skills &amp; Project Index
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project showcase — scrollable feed (desktop 8 cols) */}
        <div className="lg:col-span-8 order-2 lg:order-1 flex flex-col gap-6 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-white">Project Showcase</h4>
            <span className="text-xs font-mono text-slate-500">
              {PROJECTS.length} featured works
            </span>
          </div>

          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* 3 Static Horizontal Cards (Desktop) / Vertical Stack (Mobile) */}
          <BeyondTheCodeGrid />

          <ConnectFooter />
        </div>

        {/* Sticky skill card (desktop 4 cols; on top for mobile) */}
        <div className="lg:col-span-4 order-1 lg:order-2 w-full self-start lg:sticky lg:top-8">
          <SkillCard />
        </div>
      </div>
    </section>
  );
}
