import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import "reactflow/dist/style.css";

// Required empty types for ReactFlow v11
const nodeTypes = {};
const edgeTypes = {};

// Fun names
const funProcesses = [
  "Chrome", "Zoom", "YouTube", "Spotify", "WhatsApp", "Instagram",
  "VSCode", "Figma", "CameraApp", "FileManager", "Maps",
  "Downloader", "Uploader", "SyncService"
];

const funResources = [
  "Camera", "Microphone", "Storage", "RAM", "GPU", "Network", "WiFi",
  "Bluetooth", "GPS", "GalleryFolder", "Clipboard", "FileA", "FileB"
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
        background: isProcess ? "#dbeafe" : "#fde7c3",
        borderColor: isProcess ? "#60a5fa" : "#f59e0b",
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
        style: { stroke: "#555" },
      });
    });
  });

  return { nodes, edges };
}

export default function App() {
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
    const name = funProcesses[Math.floor(Math.random() * funProcesses.length)];
    const id = `P_${name}_${Date.now()}`;

    setCustomNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: name },
        style: {
          background: "#dbeafe",
          border: "2px solid #60a5fa",
          padding: 10,
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    ]);

    setGraph((g) => ({ ...g, [id]: [] }));
  };

  // Add random resource
  const addResource = () => {
    const name = funResources[Math.floor(Math.random() * funResources.length)];
    const id = `R_${name}_${Date.now()}`;

    setCustomNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: name },
        style: {
          background: "#fde7c3",
          border: "2px solid #f59e0b",
          padding: 10,
          borderRadius: 10,
          fontWeight: 600,
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
  const detectDeadlock = async () => {
    try {
      const res = await fetch("http://localhost:8080/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graph }),
      });

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
              ? { ...e, style: { stroke: "red", strokeWidth: 3 }, animated: true }
              : { ...e, style: { stroke: "#555" }, animated: false }
          )
        );

        const names = cycle.map((id) =>
          id.includes("_") ? id.split("_")[1] : id
        );

        setDeadlockMessage(`💀 Deadlock detected between: ${names.join(" ↔ ")}`);
        // 🌟 Day-12 Explanation Panel
        setExplanation(`Deadlock occurred due to circular wait. Each process/resource in the cycle 
        (${names.join(" → ")}) is waiting for the next one, forming a loop.`);

      } else {
        setEdges(
          baseEdges.map((e) => ({
            ...e,
            style: { stroke: "#555" },
            animated: false,
          }))
        );
        setDeadlockMessage("");
        setExplanation("No deadlock. The system is safe.");
      }
    } catch (err) {
      console.error("Deadlock error:", err);
    }
  };

  // 🧩 DAY-11: Kill a Process & Resolve Deadlock
const killProcess = () => {
  const p = processInput.trim();
  if (!p || !p.startsWith("P")) {
    console.warn("Enter a valid Process ID like P1 or P_Chrome_123");
    return;
  }

  // 1. Remove node from graph
  setGraph((prev) => {
    const g = { ...prev };

    // remove P from adjacency
    delete g[p];

    // remove any references to P in other lists
    Object.keys(g).forEach((key) => {
      g[key] = g[key].filter((x) => x !== p);
    });

    return g;
  });

  // 2. Remove the process node visually
  setNodes((prev) => prev.filter((n) => n.id !== p));

  // 3. Remove edges connected to that process
  setBaseEdges((prev) => prev.filter((e) => e.source !== p && e.target !== p));
  setEdges((prev) => prev.filter((e) => e.source !== p && e.target !== p));

  // 4. Clear popup
  setDeadlockMessage("");

  // 5. Auto-check if deadlock is resolved
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
    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div className="w-[300px] p-5 border-r bg-slate-50">
        <h2 className="font-bold text-xl mb-4">Deadlock Detective</h2>

        <input
          placeholder="Process (P...)"
          value={processInput}
          onChange={(e) => setProcessInput(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          placeholder="Resource (R...)"
          value={resourceInput}
          onChange={(e) => setResourceInput(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="mt-3 flex gap-2">
          <button
            onClick={requestResource}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Request
          </button>

          <button
            onClick={allocateResource}
            className="bg-amber-500 text-white px-3 py-2 rounded"
          >
            Allocate
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            className="bg-blue-600 text-white py-2 rounded"
            onClick={addProcess}
          >
            ➕ Add Process
          </button>

          <button
            className="bg-orange-500 text-white py-2 rounded"
            onClick={addResource}
          >
            ➕ Add Resource
          </button>
        </div>

        <button
          onClick={detectDeadlock}
          className="bg-red-500 text-white px-4 py-2 rounded mt-6 w-full"
        >
          Detect Deadlock
        </button>

        <button
          onClick={killProcess}
          className="bg-gray-700 text-white px-4 py-2 rounded mt-3 w-full"
        >
          Kill Process
        </button>

        <pre className="mt-4 bg-slate-200 p-3 h-48 overflow-auto text-sm">
          {JSON.stringify(graph, null, 2)}
        </pre>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 relative">
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
          <MiniMap nodeColor={(n) => n.style?.background || "#ccc"} />
          <Controls />
          <Background />

          {/* DEADLOCK POPUP */}
          {deadlockMessage && (
            <div className="absolute top-5 right-5 bg-red-600 text-white px-5 py-3 rounded shadow-lg text-lg font-semibold animate-pulse">
              {deadlockMessage}
            </div>
          )}
        </ReactFlow>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[80%] 
                bg-white shadow-lg border rounded-lg p-4 text-center text-gray-700">
  <h3 className="font-bold text-lg mb-2">Explanation</h3>
  <p className="text-sm">{explanation}</p>
</div>

      </div>
    </div>
  );
}
