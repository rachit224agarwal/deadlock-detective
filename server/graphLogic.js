export function detectDeadlock(graph) {
  const visited = new Set();
  const recStack = new Set();
  const path = [];

  const dfs = (node) => {
    if (!graph[node]) return null;
    if (recStack.has(node)) return [...path, node];
    if (visited.has(node)) return null;

    visited.add(node);
    recStack.add(node);
    path.push(node);

    for (let neighbor of graph[node]) {
      const cycle = dfs(neighbor);
      if (cycle) return cycle;
    }

    recStack.delete(node);
    path.pop();
    return null;
  };

  for (let node in graph) {
    const cycle = dfs(node);
    if (cycle) return { deadlock: true, cycle };
  }
  return { deadlock: false, cycle: [] };
}
