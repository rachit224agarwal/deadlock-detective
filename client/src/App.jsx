import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

// Required empty nodeTypes + edgeTypes
const nodeTypes = {};
const edgeTypes = {};

// Build nodes + edges
function buildNodesAndEdgesFromGraph(graph) {
  const ids = new Set();

  Object.keys(graph).forEach((from) => {
    ids.add(from);
    (graph[from] || []).forEach((to) => ids.add(to));
  });

  const nodes = Array.from(ids).map((id, i) => {
    const isProcess = id[0].toUpperCase() === "P";

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

  useEffect(() => {
    const { nodes, edges } = buildNodesAndEdgesFromGraph(graph);
    setNodes(nodes);
    setEdges(edges);
  }, [graph]);

  const requestResource = () => {
    const p = processInput.trim();
    const r = resourceInput.trim();
    if (!p || !r) return;

    setGraph((prev) => {
      const g = { ...prev };
      g[p] = [...(g[p] || []), r];
      if (!g[r]) g[r] = [];
      return g;
    });
  };

  const allocateResource = () => {
    const p = processInput.trim();
    const r = resourceInput.trim();
    if (!p || !r) return;

    setGraph((prev) => {
      const g = { ...prev };
      g[r] = [...(g[r] || []), p];
      if (!g[p]) g[p] = [];
      return g;
    });
  };

  const detectDeadlock = async () => {
    try {
      const res = await fetch("http://localhost:8080/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graph }),
      });

      const data = await res.json();
      console.log("Deadlock result:", data);

      if (data.cycle?.length > 0) {
        const highlightEdges = new Set();

        for (let i = 0; i < data.cycle.length - 1; i++) {
          highlightEdges.add(`${data.cycle[i]}__${data.cycle[i + 1]}`);
        }

        setEdges((prev) =>
          prev.map((e) =>
            highlightEdges.has(e.id)
              ? { ...e, style: { stroke: "red", strokeWidth: 3 }, animated: true }
              : { ...e, style: { stroke: "#555" }, animated: false }
          )
        );
      } else {
        setEdges((prev) =>
          prev.map((e) => ({ ...e, style: { stroke: "#555" }, animated: false }))
        );
      }
    } catch (err) {
      console.error("Deadlock check failed:", err);
    }
  };

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
      <div className="w-72 p-5 border-r bg-slate-50">
        <h2 className="font-bold text-xl mb-4">Deadlock Detective</h2>

        <input
          placeholder="Process (P1)"
          value={processInput}
          onChange={(e) => setProcessInput(e.target.value)}
          className="w-full p-2 mb-3 border rounded outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          placeholder="Resource (R1)"
          value={resourceInput}
          onChange={(e) => setResourceInput(e.target.value)}
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="mt-4 space-x-3">
          <button
            onClick={requestResource}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Request (P → R)
          </button>

          <button
            onClick={allocateResource}
            className="px-3 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Allocate (R → P)
          </button>
        </div>

        <button
          onClick={detectDeadlock}
          className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Detect Deadlock
        </button>

        <pre className="mt-5 bg-white p-3 rounded border h-64 overflow-auto text-sm">
          {JSON.stringify(graph, null, 2)}
        </pre>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1">
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
        </ReactFlow>
      </div>
    </div>
  );
}
