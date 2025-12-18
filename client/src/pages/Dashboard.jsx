import React from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard({ cardBg, borderColor }) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Floating 3D Objects */}
      
      {/* CPU/Processor - Top Left */}
      <div className="absolute top-10 left-10 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-2xl shadow-red-500/30 transform rotate-12 hover:rotate-0 transition-all duration-500 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg grid grid-cols-3 gap-0.5 p-1.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-red-400/60 rounded-sm"></div>
            ))}
          </div>
        </div>
        <p className="text-xs text-center mt-2 opacity-50">CPU</p>
      </div>

      {/* Memory/RAM - Top Right */}
      <div className="absolute top-20 right-16 animate-float-delayed">
        <div className="w-28 h-10 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg shadow-2xl shadow-emerald-500/30 transform -rotate-6 hover:rotate-0 transition-all duration-500 flex items-center px-2 gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-6 bg-emerald-300/40 rounded-sm"></div>
          ))}
        </div>
        <p className="text-xs text-center mt-2 opacity-50">Memory</p>
      </div>

      {/* Lock/Mutex - Bottom Left */}
      <div className="absolute bottom-24 left-20 animate-float-slow">
        <div className="w-16 h-20 bg-gradient-to-b from-amber-500 to-amber-700 rounded-xl shadow-2xl shadow-amber-500/30 transform -rotate-12 hover:rotate-0 transition-all duration-500 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-amber-300/60 rounded-full mb-1"></div>
          <div className="w-6 h-6 bg-amber-300/40 rounded-md"></div>
        </div>
        <p className="text-xs text-center mt-2 opacity-50">Mutex</p>
      </div>

      {/* Process Circle - Bottom Right */}
      <div className="absolute bottom-32 right-24 animate-float-delayed">
        <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-700 rounded-full shadow-2xl shadow-sky-500/30 transform hover:scale-110 transition-all duration-500 flex items-center justify-center">
          <span className="text-white font-bold text-lg">P1</span>
        </div>
        <p className="text-xs text-center mt-2 opacity-50">Process</p>
      </div>

      {/* Resource Box - Left Middle */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 animate-float-slow">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-2xl shadow-purple-500/30 transform rotate-45 hover:rotate-[60deg] transition-all duration-500 flex items-center justify-center">
          <span className="text-white font-bold -rotate-45">R1</span>
        </div>
        <p className="text-xs text-center mt-4 opacity-50">Resource</p>
      </div>

      {/* Disk - Right Middle */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 animate-float">
        <div className="w-18 h-18 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-2xl shadow-gray-500/30 flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-400/30 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <p className="text-xs text-center mt-2 opacity-50">Disk</p>
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Deadlock
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"> Detective</span>
        </h1>
        
        <p className="text-lg md:text-xl opacity-70 mb-10 leading-relaxed">
          Visualize, detect, and resolve deadlocks in real-time.
          <br className="hidden md:block" />
          Learn how processes compete for resources.
        </p>

       <NavLink
          to="/visualizer"
          className="inline-flex items-center gap-2 px-4 py-3.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-medium tracking-wider uppercase hover:bg-red-500/20 transition-all"
        >
          Launch Visualizer
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NavLink>

      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(12deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-20px) rotate(-6deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}