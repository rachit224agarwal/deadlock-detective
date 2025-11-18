import React, { useState } from "react";

function App() {
  const [process, setProcess] = useState("");
  const [resource, setResource] = useState("");
  const [graph, setGraph] = useState({});

  // Add P -> R
  const requestResource = () => {
    if (!process || !resource) return;

    setGraph((prev) => {
      const newGraph = { ...prev };
      if (!newGraph[process]) newGraph[process] = [];
      newGraph[process].push(resource);
      return newGraph;
    });

    console.log("Graph Updated:", graph);
  };

  // Add R -> P
  const allocateResource = () => {
    if (!process || !resource) return;

    setGraph((prev) => {
      const newGraph = { ...prev };
      if (!newGraph[resource]) newGraph[resource] = [];
      newGraph[resource].push(process);
      return newGraph;
    });

    console.log("Graph Updated:", graph);
  };

  const detectDeadlock = async () => {
    const res = await fetch("http://localhost:8080/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ graph }),
    });
    const data = await res.json();
    console.log("Deadlock Result:", data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Deadlock Detective (Day 6 UI)</h1>

      <input
        placeholder="Process like P1"
        value={process}
        onChange={(e) => setProcess(e.target.value)}
      />

      <input
        placeholder="Resource like R1"
        value={resource}
        onChange={(e) => setResource(e.target.value)}
      />

      <br /><br />

      <button onClick={requestResource}>Request Resource</button>
      <button onClick={allocateResource}>Allocate Resource</button>
      <button onClick={detectDeadlock}>Detect Deadlock</button>

      <pre>{JSON.stringify(graph, null, 2)}</pre>
    </div>
  );
}

export default App;

