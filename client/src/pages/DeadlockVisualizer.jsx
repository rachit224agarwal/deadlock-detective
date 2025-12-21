// src/pages/DeadlockVisualizer.jsx
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

// Required empty types (you can later add custom nodes if you want)
const nodeTypes = {};
const edgeTypes = {};

// Fun names
const funProcesses = [
  "Chrome",
  "Zoom",
  "YouTube",
  "Spotify",
  "WhatsApp",
  "Instagram",
  "VSCode",
  "Figma",
  "CameraApp",
  "FileManager",
  "Maps",
  "Downloader",
  "Uploader",
  "SyncService",
];

const funResources = [
  "Camera",
  "Microphone",
  "Storage",
  "RAM",
  "GPU",
  "Network",
  "WiFi",
  "Bluetooth",
  "GPS",
  "GalleryFolder",
  "Clipboard",
  "FileA",
  "FileB",
];

// Build nodes + edges from adjacency graph
function buildNodesAndEdgesFromGraph(graph) {
  const ids = new Set();

  Object.keys(graph).forEach((from) => {
    ids.add(from);
    (graph[from] || []).forEach((to) => ids.add(to));
  });

  const nodes = Array.from(ids).map((id, i) => {
    const isProcess = id.startsWith("P");

    return {
      id,
      type: "default",
      data: { label: id },
      position: {
        x: (i % 5) * 200,
        y: Math.floor(i / 5) * 140,
      },
      style: {
        padding: 10,
        borderRadius: 10,
        border: "2px solid",
        minWidth: 80,
        textAlign: "center",
        background: isProcess ? "#1d4ed8" : "#f97316", // blue/orange
        borderColor: isProcess ? "#60a5fa" : "#fed7aa",
        color: "#0f172a",
        fontWeight: 600,
      },
      sourcePosition: "right",
      targetPosition: "left",
    };
  });

  const edges = [];
  Object.entries(graph).forEach(([from, tos]) => {
    (tos || []).forEach((to) => {
      edges.push({
        id: `${from}__${to}`,
        source: from,
        target: to,
        type: "default",
        markerEnd: { type: "arrowclosed" },
        style: { stroke: "#64748b" },
      });
    });
  });

  return { nodes, edges };
}

function VisualizerInner({ cardBg, borderColor, darkMode }) {
  const [processInput, setProcessInput] = useState("");
  const [resourceInput, setResourceInput] = useState("");

  const [graph, setGraph] = useState({});
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [baseEdges, setBaseEdges] = useState([]);

  const [customNodes, setCustomNodes] = useState([]);
  const [deadlockMessage, setDeadlockMessage] = useState("");
  const [explanation, setExplanation] = useState("");

  // Build nodes when graph updates
  useEffect(() => {
    const { nodes: builtNodes, edges: builtEdges } =
      buildNodesAndEdgesFromGraph(graph);

    setNodes([...builtNodes, ...customNodes]);
    setBaseEdges(builtEdges);
    setEdges(builtEdges);
  }, [graph, customNodes]);

  // Add random process
  const addProcess = () => {
    const name =
      funProcesses[Math.floor(Math.random() * funProcesses.length)];
    const id = `P_${name}_${Date.now()}`;

    setCustomNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: name },
        style: {
          background: "#1d4ed8",
          border: "2px solid #60a5fa",
          padding: 10,
          borderRadius: 10,
          fontWeight: 600,
          color: "#e5f2ff",
        },
      },
    ]);

    setGraph((g) => ({ ...g, [id]: [] }));
  };

  // Add random resource
  const addResource = () => {
    const name =
      funResources[Math.floor(Math.random() * funResources.length)];
    const id = `R_${name}_${Date.now()}`;

    setCustomNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: name },
        style: {
          background: "#f97316",
          border: "2px solid #fed7aa",
          padding: 10,
          borderRadius: 10,
          fontWeight: 600,
          color: "#451a03",
        },
      },
    ]);

    setGraph((g) => ({ ...g, [id]: [] }));
  };

  // Request(P->R)
  const requestResource = () => {
    const p = processInput.trim();
    const r = resourceInput.trim();
    if (!p || !r) return;

    setGraph((prev) => {
      const g = { ...prev };
      if (!g[p]) g[p] = [];
      if (!g[p].includes(r)) g[p].push(r);
      if (!g[r]) g[r] = [];
      return g;
    });
  };

  // Allocate(R->P)
  const allocateResource = () => {
    const p = processInput.trim();
    const r = resourceInput.trim();
    if (!p || !r) return;

    setGraph((prev) => {
      const g = { ...prev };
      if (!g[r]) g[r] = [];
      if (!g[r].includes(p)) g[r].push(p);
      if (!g[p]) g[p] = [];
      return g;
    });
  };

  // Detect deadlock
 // ...existing code...

  // Detect deadlock
  const detectDeadlock = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const res = await fetch(`${API_URL}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graph }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      const cycle = data.cycle || [];

      if (cycle.length > 0) {
        const highlight = new Set();
        for (let i = 0; i < cycle.length - 1; i++) {
          highlight.add(`${cycle[i]}__${cycle[i + 1]}`);
        }

        setEdges(
          baseEdges.map((e) =>
            highlight.has(e.id)
              ? {
                  ...e,
                  style: { stroke: "#f97373", strokeWidth: 3 },
                  animated: true,
                }
              : { ...e, style: { stroke: "#64748b" }, animated: false }
          )
        );

        const names = cycle.map((id) =>
          id.includes("_") ? id.split("_")[1] : id
        );

        setDeadlockMessage(
          `💀 Deadlock detected between: ${names.join(" ↔ ")}`
        );
        setExplanation(
          `Deadlock occurred due to circular wait. Each node in the cycle (${names.join(
            " → "
          )}) is waiting for the next one, forming a closed loop where no process can proceed.`
        );
      } else {
        setEdges(
          baseEdges.map((e) => ({
            ...e,
            style: { stroke: "#64748b" },
            animated: false,
          }))
        );
        setDeadlockMessage("");
        setExplanation("No deadlock. The system is currently in a safe state.");
      }
    } catch (err) {
      console.error("Deadlock detection error:", err);
      setDeadlockMessage("⚠️ Error connecting to server");
      setExplanation(
        `Failed to connect to backend server. Make sure the server is running on http://localhost:8080. Error: ${err.message}`
      );
    }
  };

// ...existing code...

  // Kill Process
  const killProcess = () => {
    const p = processInput.trim();
    if (!p || !p.startsWith("P")) {
      console.warn("Enter a valid Process ID like P1 or P_Chrome_123");
      return;
    }

    setGraph((prev) => {
      const g = { ...prev };
      delete g[p];
      Object.keys(g).forEach((key) => {
        g[key] = g[key].filter((x) => x !== p);
      });
      return g;
    });

    setNodes((prev) => prev.filter((n) => n.id !== p));
    setBaseEdges((prev) =>
      prev.filter((e) => e.source !== p && e.target !== p)
    );
    setEdges((prev) =>
      prev.filter((e) => e.source !== p && e.target !== p)
    );
    setDeadlockMessage("");

    setTimeout(() => detectDeadlock(), 150);
  };

  // ReactFlow handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((conn) => {
    const { source, target } = conn;

    setGraph((prev) => {
      const g = { ...prev };
      if (!g[source]) g[source] = [];
      if (!g[source].includes(target)) g[source].push(target);
      if (!g[target]) g[target] = [];
      return g;
    });
  }, []);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4">
      {/* LEFT CONTROL PANEL */}
      <div
        className={`w-[300px] ${cardBg} border ${borderColor} rounded-2xl p-4 flex flex-col gap-3`}
      >
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          Deadlock Control Panel
        </h2>

        <div className="space-y-2 text-xs opacity-80">
          <p>
            1. Add some <span className="font-semibold">processes</span> and{" "}
            <span className="font-semibold">resources</span>.
          </p>
          <p>2. Create request / allocation edges.</p>
          <p>3. Click “Detect Deadlock” to highlight cycles.</p>
        </div>

        <div className="mt-2 space-y-3 text-sm">
          <div>
            <label className="block text-xs mb-1">Process ID</label>
            <input
              placeholder="P1 or P_Chrome_123"
              value={processInput}
              onChange={(e) => setProcessInput(e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-slate-400 bg-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs mb-1">Resource ID</label>
            <input
              placeholder="R1 or R_Mic_456"
              value={resourceInput}
              onChange={(e) => setResourceInput(e.target.value)}
              className="w-full px-2 py-1.5 rounded border border-slate-400 bg-transparent text-sm"
            />
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={requestResource}
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-xs px-3 py-2 rounded-lg font-medium"
          >
            Request (P → R)
          </button>
          <button
            onClick={allocateResource}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-2 rounded-lg font-medium"
          >
            Allocate (R → P)
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={addProcess}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-2 rounded-lg font-medium"
          >
            ➕ Add Process
          </button>
          <button
            onClick={addResource}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-2 rounded-lg font-medium"
          >
            ➕ Add Resource
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={detectDeadlock}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2 rounded-lg font-semibold shadow shadow-red-500/40"
          >
            🔎 Detect Deadlock
          </button>
          <button
            onClick={killProcess}
            className="w-full bg-slate-900 hover:bg-black text-white text-xs px-3 py-2 rounded-lg font-medium"
          >
            🧨 Kill Process
          </button>
        </div>

        <div className="mt-3 text-[11px] bg-slate-900/80 text-slate-100 rounded-lg p-2 font-mono h-40 overflow-auto">
          <div className="text-[10px] opacity-60 mb-1">GRAPH JSON</div>
          <pre>{JSON.stringify(graph, null, 2)}</pre>
        </div>
      </div>

      {/* RIGHT: GRAPH + EXPLANATION */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base">Resource Allocation Graph</h2>
          {deadlockMessage && (
            <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/50">
              {deadlockMessage}
            </span>
          )}
        </div>

        <div className="flex-1 rounded-2xl border border-slate-700 overflow-hidden bg-slate-900">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <MiniMap
              nodeColor={(n) => n.style?.background || "#64748b"}
            />
            <Controls />
            <Background />
          </ReactFlow>
        </div>

        <div
          className={`rounded-2xl border ${borderColor} ${
            darkMode ? "bg-slate-900/80" : "bg-white"
          } p-4 text-sm`}
        >
          <h3 className="font-semibold text-sm mb-1">
            Explanation (for viva / report)
          </h3>
          <p className="opacity-80 leading-relaxed">
            {explanation ||
              "Run a scenario first. Once a deadlock is detected, this panel will explain which processes and resources are involved and why the system is stuck."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DeadlockVisualizer(props) {
  return (
    <ReactFlowProvider>
      <VisualizerInner {...props} />
    </ReactFlowProvider>
  );
}
