import React from "react";

const GAME_URL = "https://cloud.onlinegames.io/games/2025/html/cube-worlds/index-og.html";

export default function GameView() {
  return (
    <section className="min-h-screen w-full p-4 sm:p-8 flex flex-col justify-center items-center" id="view-game">
      <div className="w-full max-w-5xl bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="font-mono text-sm uppercase tracking-wider text-white">GameZone</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-surface-base border border-surface-border text-xs font-mono text-amber-400">
            [PC ONLY &bull; KEYBOARD CONTROLS]
          </span>
        </div>

        <div className="text-center mb-4">
          <h4 className="text-2xl font-black text-white tracking-tight">YourCraft</h4>
        </div>

        {/* Embedded game frame */}
        <div className="relative w-full h-[70vh] rounded-2xl border-2 border-surface-border overflow-hidden shadow-inner bg-black" data-testid="game-container">
          <iframe
            data-testid="game-iframe"
            src={GAME_URL}
            title="Minecraftn't"
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen; autoplay; gamepad *;"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
