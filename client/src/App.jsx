import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

// Required empty nodeTypes + edgeTypes (fixes warnings in ReactFlow v11)
const nodeTypes = {};
const edgeTypes = {};

/* ----------------------------------------------------------
   Convert adjacency list graph -> React Flow nodes + edges
-----------------------------------------------------------*/
function buildNodesAndEdgesFromGraph(graph) {
  const ids = new Set();

  // collect node IDs
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

      // Valid positions for ReactFlow v11
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

/* ----------------------------------------------------------
   MAIN COMPONENT
-----------------------------------------------------------*/
export default function App() {
  const [processInput, setProcessInput] = useState("");
  const [resourceInput, setResourceInput] = useState("");
  const [graph, setGraph] = useState({});

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Build nodes & edges whenever graph changes
  useEffect(() => {
    const { nodes, edges } = buildNodesAndEdgesFromGraph(graph);
    setNodes(nodes);
    setEdges(edges);
  }, [graph]);

  /* ----------------------------------------------------------
     Button Actions
  -----------------------------------------------------------*/
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

  /* ----------------------------------------------------------
     ReactFlow handlers (official v11 versions)
  -----------------------------------------------------------*/
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

  /* ----------------------------------------------------------
     UI Layout
  -----------------------------------------------------------*/
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT PANEL */}
      <div
        style={{
          width: 300,
          padding: 20,
          borderRight: "1px solid #ddd",
          background: "#f8fafc",
        }}
      >
        <h2 style={{ fontWeight: 700, marginBottom: 10 }}>Deadlock Detective</h2>

        <input
          placeholder="Process (P1)"
          value={processInput}
          onChange={(e) => setProcessInput(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />

        <input
          placeholder="Resource (R1)"
          value={resourceInput}
          onChange={(e) => setResourceInput(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />

        <div style={{ marginTop: 12 }}>
          <button onClick={requestResource} style={{ padding: 8 }}>
            Request (P → R)
          </button>

          <button
            onClick={allocateResource}
            style={{ padding: 8, marginLeft: 10 }}
          >
            Allocate (R → P)
          </button>
        </div>

        <button
          onClick={detectDeadlock}
          style={{
            padding: "10px 14px",
            marginTop: 12,
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: 6,
          }}
        >
          Detect Deadlock
        </button>

        <pre
          style={{
            marginTop: 20,
            background: "#f1f5f9",
            padding: 10,
            height: 200,
            overflow: "auto",
          }}
        >
          {JSON.stringify(graph, null, 2)}
        </pre>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1 }}>
        <div style={{ width: "100%", height: "100%" }}>
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
    </div>
  );
}
