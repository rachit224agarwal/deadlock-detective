# Deadlock Detective – Interactive Deadlock Visualizer

A modern, interactive **Deadlock Visualization Tool** built using  
**React, ReactFlow, TailwindCSS, Node.js, and Express**.

This tool visualizes how **deadlocks form**, shows **cycles**,  
and explains the concept in clean English — perfect for **OS/DBMS viva** and **portfolio**.

---

## 🚀 Live Demo

👉 **Video Demo:** https://youtu.be/your-video-link  
👉 **Screenshots below**

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styling-38BDF8?logo=tailwindcss&logoColor=white)
![ReactFlow](https://img.shields.io/badge/ReactFlow-Graph_Engine-8A2BE2)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)

---

## 📸 Screenshots

> Create a folder: `screenshots/` in your repo  
> Add your screenshot images and update paths below.

| Feature | Screenshot |
|--------|------------|
| Dashboard | ![dashboard](screenshots/dashboard.png) |
| Add Processes/Resources | ![add-nodes](screenshots/add_nodes.png) |
| Deadlock Highlighting | ![deadlock](screenshots/deadlock.png) |
| Safe State (Confetti) | ![resolved](screenshots/resolved.png) |
| Explanation Panel | ![explanation](screenshots/explanation.png) |

---

# 📘 Project Story — *How This Project Started*

## 1. A Random Boring OS Lecture

This journey surprisingly began in a regular Operating Systems lecture.  
The class was dull — until the professor introduced **Deadlocks**.

The concept immediately felt “visual”:  
processes → resources → arrows → cycle.

Right there, I wrote a small line in my notes:

> “Make a visual deadlock simulator someday.”

I even drafted a small PDF describing the idea.  
Then life continued — and the idea got lost in my laptop.

---

## 2. Rediscovered After Years (DBMS Lecture)

In my 3rd year, DBMS introduced deadlocks again.  
Suddenly, I remembered that old OS idea.

After digging through folders, backups and even the Recycle Bin…  
I actually found the **original draft**.

That moment I decided:

> “This time, I will build it for real.”

---

## 3. 21-Day Consistency Plan

I created a simple Notion tracker:

- 30–60 minutes per day  
- One feature per day  
- No rushing  
- Use AI only as a helper  
- Daily logging  

Slowly, the project grew:

- **Day 1:** Setup client/server  
- **Day 5:** ReactFlow basic graph  
- **Day 8:** Dynamic processes/resources  
- **Day 10:** Backend DFS deadlock detection  
- **Day 12:** Explanation panel  
- **Day 14:** Fun elements (alerts + confetti)  
- **Day 15:** Documentation + cleanup  

What started in a boring class is now a complete **full-stack OS project**.

---

# 🎯 Features

## Core

- Add Process nodes (Chrome, Zoom, Spotify…)
- Add Resource nodes (RAM, GPU, Camera…)
- Create:
  - Request edges (P → R)
  - Allocation edges (R → P)
- Detect Deadlock using backend cycle detection
- Highlight exact deadlock edges in red
- Explanation panel for each detection
- Kill Process to resolve deadlock instantly

## UI/UX

- Clean Tailwind dashboard  
- Draggable nodes (ReactFlow)  
- MiniMap, zoom, pan, controls  
- Confetti when system becomes safe  
- Alerts when deadlock occurs  
- Dark UX theme

---

# 🧠 OS / DBMS Theory Included

Deadlock occurs when these **Coffman conditions** hold:

1. **Mutual Exclusion**  
2. **Hold and Wait**  
3. **No Preemption**  
4. **Circular Wait**

This project specifically **detects circular wait** using cycle detection.

Example backend result:

```json
{
  "deadlock": true,
  "cycle": ["P1", "R1", "P2", "R2", "P1"]
}
```
🔍 Deadlock Detection Logic (Backend)
Located in: /backend/graphLogic.js

js
Copy code
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
Algorithm used:
✔ DFS
✔ Recursion stack tracking
✔ Cycle detection

🧩 Folder Structure
text
Copy code
deadlock-detective/
│
├── backend/
│   ├── index.js
│   └── graphLogic.js
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   └── DeadlockVisualizer.jsx
│   │   └── ...
│   ├── index.html
│
├── screenshots/
│   ├── dashboard.png
│   ├── deadlock.png
│   ├── resolved.png
│   ├── explanation.png
│   └── demo.gif
│
└── README.md
⚙ Installation
Backend
bash
Copy code
cd backend
npm install
node index.js
Runs at:

arduino
Copy code
http://localhost:8080
Frontend
bash
Copy code
cd client
npm install
npm run dev
Runs at:

arduino
Copy code
http://localhost:5173
🔮 Future Enhancements
Export graph as PNG / JSON

Add Banker's Algorithm visualizer

Add CPU Scheduling visualizer (FCFS, SJF, RR)

Add animations for node connections

Save sessions locally

👨‍💻 Author
Rachit Agarwal

This project is the result of a long-forgotten idea revived during 3rd year, built with consistency and curiosity.
A full OS/DBMS concept turned into a real working full-stack tool.

⭐ If you like this project
Please star ⭐ the repository — it motivates continued development!
