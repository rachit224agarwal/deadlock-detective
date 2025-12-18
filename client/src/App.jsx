import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        
        {/* Mobile Blocker */}
        <div className="fixed inset-0 z-[100] flex md:hidden items-center justify-center bg-slate-950 p-6">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-xl shadow-red-500/30 animate-pulse"></div>
            <h2 className="text-2xl font-bold text-white mb-3">Desktop Only</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Deadlock Detective is designed for desktop screens. Please open on a laptop or desktop.
            </p>
          </div>
        </div>

        {/* Dark/Light Toggle */}
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

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard cardBg={cardBg} borderColor={borderColor} />} />
            <Route path="/visualizer" element={<DeadlockVisualizer cardBg={cardBg} borderColor={borderColor} darkMode={darkMode} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className={`border-t ${borderColor} mt-4`}>
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white font-bold text-sm shadow-lg shadow-red-500/20">DD</span>
                <div>
                  <p className="text-sm font-semibold">Deadlock Detective</p>
                  <p className="text-xs opacity-50">Built for OS enthusiasts 🔒</p>
                </div>
              </div>
              <p className="text-xs opacity-60 italic">"Patience without strategy leads to deadlock."</p>
              <button
                onClick={() => setShowDocs(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${borderColor} ${
                  darkMode ? "bg-slate-800/50 hover:bg-slate-800" : "bg-white hover:bg-slate-50"
                } transition-all hover:scale-105`}
              >
                📖 Read Docs
              </button>
            </div>
            <div className="mt-2 pt-2 flex flex-wrap items-center justify-center gap-4 text-xs opacity-90">
              <span>© 2025 Deadlock Detective</span>
              <span>•</span>
              <span>Built for learners by {" "}
                <a href="https://www.linkedin.com/in/rachit-agarwal-a52924282/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                  Rachit Agarwal
                </a>
              </span>
            </div>
          </div>
        </footer>

        {/* SIMPLE DOCS MODAL - Typewriter Style */}
        {showDocs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setShowDocs(false)}>
            <div 
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-none shadow-2xl border-4 border-black"
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              {/* Paper texture header */}
              <div className="border-b-4 border-black p-6 text-center">
                <h1 className="text-2xl font-bold tracking-wider uppercase">DEADLOCK</h1>
                <p className="text-xs mt-1 tracking-widest">A Brief Guide for Operating Systems</p>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 text-sm leading-relaxed">
                
                {/* Definition */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§1. DEFINITION</h2>
                  <p>
                    A <strong>deadlock</strong> is a situation where two or more processes are 
                    unable to proceed because each is waiting for resources held by the other.
                  </p>
                  <p className="mt-2 pl-4 border-l-2 border-black italic">
                    Think of it as two people in a narrow hallway, each waiting for the other to move first. Neither moves. Forever.
                  </p>
                </section>

                {/* Four Conditions */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§2. FOUR CONDITIONS (Coffman, 1971)</h2>
                  <p className="mb-3">All four must hold simultaneously for deadlock to occur:</p>
                  <div className="space-y-2">
                    <p><strong>1. Mutual Exclusion</strong> — Only one process can use a resource at a time.</p>
                    <p><strong>2. Hold and Wait</strong> — Process holds resources while waiting for more.</p>
                    <p><strong>3. No Preemption</strong> — Resources cannot be forcibly taken away.</p>
                    <p><strong>4. Circular Wait</strong> — A circular chain of processes, each waiting for the next.</p>
                  </div>
                  <p className="mt-3 text-xs italic">* Breaking ANY one condition prevents deadlock.</p>
                </section>

                {/* RAG */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§3. RESOURCE ALLOCATION GRAPH</h2>
                  <p>A directed graph showing resource allocation:</p>
                  <div className="mt-3 font-mono text-xs bg-gray-100 p-3 border border-black">
                    P → R : Process P requests Resource R<br/>
                    R → P : Resource R is allocated to Process P<br/>
                    <br/>
                    CYCLE IN GRAPH = DEADLOCK (for single-instance resources)
                  </div>
                </section>

                {/* Detection */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§4. DETECTION METHOD</h2>
                  <p>
                    This tool uses <strong>DFS-based cycle detection</strong> on the wait-for graph. 
                    Time complexity: O(V + E).
                  </p>
                  <div className="mt-3 font-mono text-xs bg-gray-100 p-3 border border-black">
                    for each node:<br/>
                    &nbsp;&nbsp;run DFS<br/>
                    &nbsp;&nbsp;if node visited twice in same path → CYCLE FOUND
                  </div>
                </section>

                {/* Handling */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§5. HANDLING STRATEGIES</h2>
                  <div className="space-y-2">
                    <p><strong>Prevention:</strong> Design system so one condition can never hold.</p>
                    <p><strong>Avoidance:</strong> Check before allocation (Banker's Algorithm).</p>
                    <p><strong>Detection:</strong> Allow deadlock, detect it, then recover.</p>
                    <p><strong>Ignorance:</strong> Pretend it won't happen (used by most OS!).</p>
                  </div>
                </section>

                {/* Recovery */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§6. RECOVERY</h2>
                  <div className="space-y-1">
                    <p>• <strong>Kill process</strong> — Terminate one or more processes in cycle.</p>
                    <p>• <strong>Preempt resource</strong> — Forcibly take resource from a process.</p>
                    <p>• <strong>Rollback</strong> — Restore process to earlier checkpoint.</p>
                  </div>
                </section>

                {/* Quick Facts */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§7. QUICK FACTS</h2>
                  <div className="space-y-1 text-xs">
                    <p>→ Deadlock ≠ Starvation (starvation may eventually end)</p>
                    <p>→ Banker's Algorithm = Avoidance, not Detection</p>
                    <p>→ RAG cycle = Deadlock only for single-instance resources</p>
                    <p>→ Windows & Linux mostly use the "Ostrich" approach</p>
                    <p>→ Dining Philosophers = Classic deadlock example</p>
                  </div>
                </section>

                {/* References */}
                <section>
                  <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">§8. REFERENCES</h2>
                  <div className="text-xs space-y-1">
                    <p>• Silberschatz, "Operating System Concepts" Ch.8</p>
                    <p>• Coffman et al., "System Deadlocks" (1971)</p>
                    <p>• Dijkstra, "Cooperating Sequential Processes" (1965)</p>
                    <p>• geeksforgeeks.org/deadlock-in-operating-system</p>
                  </div>
                </section>

                {/* Footer */}
                <div className="pt-6 mt-6 border-t-2 border-black text-center text-xs">
                  <p>— END OF DOCUMENT —</p>
                  <p className="mt-2 italic">Deadlock Detective • 2025</p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowDocs(false)}
                className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Close Document
              </button>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}