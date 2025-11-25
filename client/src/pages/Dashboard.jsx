// src/pages/Dashboard.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard({ cardBg, borderColor }) {
  return (
    <div className="py-10 flex flex-col items-center">
      {/* Center hero card */}
      <div
        className={`w-full max-w-3xl ${cardBg} border ${borderColor} rounded-2xl shadow-xl p-10 text-center`}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-red-400 mb-4">
          OS · Deadlock Visualization Tool
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Understand Deadlocks
          <span className="text-red-500"> Visually</span>
        </h2>
        <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
          Deadlock Detective turns process–resource graphs into an interactive
          experience. Watch how circular waits form, see which processes block
          each other, and learn how killing a process can resolve a deadlock —{" "}
          all in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-left text-xs md:text-sm mb-8">
          <div className="border border-dashed border-red-500/60 rounded-xl p-4">
            <p className="font-semibold mb-1 text-red-300">
              Circular Wait
            </p>
            <p className="opacity-80">
              When each process is waiting for a resource held by the next one
              in a cycle — nobody can move forward.
            </p>
          </div>
          <div className="border border-dashed border-emerald-500/60 rounded-xl p-4">
            <p className="font-semibold mb-1 text-emerald-300">
              Visual Detection
            </p>
            <p className="opacity-80">
              Highlighted red arrows show exactly which edges form the deadlock
              cycle between processes and resources.
            </p>
          </div>
          <div className="border border-dashed border-sky-500/60 rounded-xl p-4">
            <p className="font-semibold mb-1 text-sky-300">
              Resolve & Learn
            </p>
            <p className="opacity-80">
              Kill a process, break the cycle, and instantly see how the system
              returns to a safe state.
            </p>
          </div>
        </div>

        <NavLink
          to="/visualizer"
          className="inline-flex items-center gap-2 mt-2 bg-red-500 px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-red-600 transition shadow-lg shadow-red-500/40"
        >
          Open Deadlock Visualizer
          <span className="text-lg">↗</span>
        </NavLink>
      </div>

      {/* Small note under card */}
      <p className="mt-6 text-xs opacity-60 max-w-xl text-center">
        Tip for viva: mention that the backend runs a DFS-based cycle detection
        on the wait-for graph and returns the exact cycle causing the deadlock.
      </p>
    </div>
  );
}
