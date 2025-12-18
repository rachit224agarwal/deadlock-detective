import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeadlockVisualizer from "./pages/DeadlockVisualizer";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showDocs, setShowDocs] = useState(false);

  const baseBg = darkMode ? "bg-slate-950" : "bg-slate-100";
  const baseText = darkMode ? "text-slate-100" : "text-slate-900";
  const cardBg = darkMode ? "bg-slate-900/70" : "bg-white";
  const borderColor = darkMode ? "border-slate-700" : "border-slate-200";

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${baseBg} ${baseText} transition-colors relative`}>
        
        {/* Small Dark/Light Toggle - Top Right */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`fixed top-4 right-4 z-50 p-2.5 rounded-full border ${borderColor} ${
            darkMode ? "bg-slate-800/80" : "bg-white/80"
          } backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

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
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Left - Branding */}
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white font-bold text-sm shadow-lg shadow-red-500/20">
                  DD
                </span>
                <div>
                  <p className="text-sm font-semibold">Deadlock Detective</p>
                  <p className="text-xs opacity-50">Built for OS enthusiasts 🔒</p>
                </div>
              </div>

              {/* Center - Unique Quote */}
              <div className="text-center">
                <p className="text-xs opacity-60 italic">
                  "In the world of processes, patience without strategy leads to deadlock."
                </p>
              </div>

              {/* Right - Docs Button */}
              <button
                onClick={() => setShowDocs(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${borderColor} ${
                  darkMode ? "bg-slate-800/50 hover:bg-slate-800" : "bg-white hover:bg-slate-50"
                } transition-all hover:scale-105`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Docs & Notes
              </button>
            </div>

            {/* Bottom Credits */}
            <div className="mt-1 pt-2  border-slate-700/50 flex flex-wrap items-center justify-center gap-4 text-xs opacity-90">
              <span>© 2025 Deadlock Detective</span>
              <span>•</span>
              <span>OS Concept Visualizer</span>
              <span>•</span>
              <span>Made with ❤️ for learning by <Link to="https://www.linkedin.com/in/rachit-agarwal-a52924282/"> <span className="text-red-500 ">Rachit Agarwal</span> </Link> </span>
            </div>
          </div>
        </footer>

        {/* DOCS MODAL */}
        {showDocs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDocs(false)}>
            <div 
              className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl ${cardBg} border ${borderColor} shadow-2xl p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold">Documentation & Notes</h2>
                </div>
                <button 
                  onClick={() => setShowDocs(false)}
                  className="p-2 rounded-lg hover:bg-slate-700/50 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* What is Deadlock */}
              <div className={`p-4 rounded-xl border ${borderColor} mb-4`}>
                <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">🔒</span> What is Deadlock?
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process in the set.
                </p>
              </div>

              {/* Conditions */}
              <div className={`p-4 rounded-xl border ${borderColor} mb-4`}>
                <h3 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <span className="text-lg">⚡</span> 4 Necessary Conditions (Coffman)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-slate-800/30 rounded-lg">
                    <p className="font-medium text-emerald-400">1. Mutual Exclusion</p>
                    <p className="text-xs opacity-70 mt-1">Only one process can use a resource at a time</p>
                  </div>
                  <div className="p-3 bg-slate-800/30 rounded-lg">
                    <p className="font-medium text-sky-400">2. Hold & Wait</p>
                    <p className="text-xs opacity-70 mt-1">Process holds resource while waiting for others</p>
                  </div>
                  <div className="p-3 bg-slate-800/30 rounded-lg">
                    <p className="font-medium text-purple-400">3. No Preemption</p>
                    <p className="text-xs opacity-70 mt-1">Resources cannot be forcibly taken away</p>
                  </div>
                  <div className="p-3 bg-slate-800/30 rounded-lg">
                    <p className="font-medium text-red-400">4. Circular Wait</p>
                    <p className="text-xs opacity-70 mt-1">Circular chain of processes waiting for each other</p>
                  </div>
                </div>
              </div>

              {/* Detection Algorithm */}
              <div className={`p-4 rounded-xl border ${borderColor} mb-4`}>
                <h3 className="font-semibold text-sky-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">🔍</span> Detection Algorithm
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  This tool uses <span className="text-emerald-400 font-medium">DFS-based cycle detection</span> on the Resource Allocation Graph (RAG). If a cycle exists in the wait-for graph, a deadlock is present.
                </p>
                <div className="mt-3 p-3 bg-slate-800/30 rounded-lg text-xs font-mono opacity-70">
                  Process → Resource (Request Edge)<br/>
                  Resource → Process (Assignment Edge)
                </div>
              </div>

              {/* Recovery */}
              <div className={`p-4 rounded-xl border ${borderColor} mb-4`}>
                <h3 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">🛠️</span> Recovery Methods
                </h3>
                <ul className="text-sm opacity-80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Process Termination:</strong> Kill one or more processes to break the cycle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong>Resource Preemption:</strong> Take resources from some processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400">•</span>
                    <span><strong>Rollback:</strong> Checkpoint and rollback processes</span>
                  </li>
                </ul>
              </div>

              {/* Viva Tips */}
              <div className={`p-4 rounded-xl border border-dashed border-red-500/40 bg-red-500/5`}>
                <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">💡</span> Viva Tips
                </h3>
                <ul className="text-sm opacity-80 space-y-1">
                  <li>• Explain the difference between deadlock prevention vs avoidance vs detection</li>
                  <li>• Banker's Algorithm is used for deadlock avoidance (safe state)</li>
                  <li>• RAG with single instances can detect deadlock via cycle detection</li>
                  <li>• Starvation ≠ Deadlock (process may still eventually execute)</li>
                </ul>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDocs(false)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all"
              >
                Got it! 👍
              </button>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}