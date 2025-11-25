import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeadlockVisualizer from "./pages/DeadlockVisualizer";
import confetti from "canvas-confetti";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const baseBg = darkMode ? "bg-slate-950" : "bg-slate-100";
  const baseText = darkMode ? "text-slate-100" : "text-slate-900";
  const cardBg = darkMode ? "bg-slate-900/70" : "bg-white";
  const borderColor = darkMode ? "border-slate-700" : "border-slate-200";

  const fireConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 }
  });
};

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${baseBg} ${baseText} transition-colors`}>
        {/* NAVBAR */}
        <header className={`border-b ${borderColor}`}>
          <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold text-lg">
                D
              </span>
              <div className="leading-tight">
                <h1 className="font-semibold text-lg tracking-tight">
                  Deadlock Detective
                </h1>
                <p className="text-xs opacity-70">
                  Visualizing circular waits in operating systems
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? "text-red-400" : "opacity-80 hover:text-red-400"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/visualizer"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? "text-red-400" : "opacity-80 hover:text-red-400"
                  }`
                }
              >
                Visualizer
              </NavLink>

              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode((d) => !d)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${borderColor} ${
                  darkMode ? "bg-slate-800" : "bg-slate-50"
                }`}
              >
                <span>{darkMode ? "Dark" : "Light"}</span>
                <span
                  className={`h-4 w-7 rounded-full flex items-center p-0.5 transition ${
                    darkMode ? "bg-red-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`h-3 w-3 bg-white rounded-full shadow-md transform transition ${
                      darkMode ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={<Dashboard cardBg={cardBg} borderColor={borderColor} />}
            />
            <Route
              path="/visualizer"
              element={
                <DeadlockVisualizer
                  cardBg={cardBg}
                  borderColor={borderColor}
                  darkMode={darkMode}
                />
              }
            />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className={`border-t ${borderColor} mt-4`}>
          <div className="max-w-6xl mx-auto px-4 py-3 text-xs opacity-70 flex justify-between">
            <span>Deadlock Detective — OS Concept Visualizer</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
