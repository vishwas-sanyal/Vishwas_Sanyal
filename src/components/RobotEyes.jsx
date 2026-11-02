import React from "react";

export default function RobotEyes({ onClick }) {
  return (
    <button
      data-testid="robot-eyes-btn"
      aria-label="Open Nobody AI Chat Mode"
      onClick={onClick}
      className="group fixed z-30 right-3 md:right-8 bottom-[92px] md:bottom-6 w-[60px] h-[46px] md:w-[68px] md:h-[52px] rounded-2xl bg-[#050814] border border-blue-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
      style={{ boxShadow: "0 0 18px rgba(59, 130, 246, 0.45)" }}
    >
      <span className="robot-eyes-track flex items-center gap-2">
        <span className="robot-eye"></span>
        <span className="robot-eye alt"></span>
      </span>
    </button>
  );
}
