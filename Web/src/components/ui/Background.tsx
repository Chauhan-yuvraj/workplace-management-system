import React from "react";
import Whitebg from "./WhitePattern";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <Whitebg />
      </div>

      {/* White shading overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.30), rgba(255,255,255,0.00), rgba(255,255,255,0.00)),
            linear-gradient(to top,    rgba(255,255,255,0.95), rgba(255,255,255,0.30), rgba(255,255,255,0.00), rgba(255,255,255,0.00)),
            linear-gradient(to left,   rgba(255,255,255,0.95), rgba(255,255,255,0.50), rgba(255,255,255,0.30), rgba(255,255,255,0.00)),
            linear-gradient(to right,  rgba(255,255,255,0.95), rgba(255,255,255,0.50), rgba(255,255,255,0.30), rgba(255,255,255,0.00))
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}
