# Deadlock Detective – Interactive Deadlock Visualizer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=node.js&logoColor=3C873A)
![ReactFlow](https://img.shields.io/badge/ReactFlow-ffffff?style=for-the-badge&logo=react&logoColor=000000)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Vite](https://img.shields.io/badge/Vite-0a0a0a?style=for-the-badge&logo=vite&logoColor=FFD62E)


---

## Overview

**Deadlock Detective** is an interactive tool that visualizes how deadlocks occur in Operating Systems and DBMS.  
Users can add processes, resources, and edges to form a resource allocation graph, and the backend analyzes it to detect deadlocks through cycle detection.

Created to simplify concepts like circular wait and resource contention, this project is useful for students, viva preparation, and portfolios.

---

## Story Behind the Project

This project began in a **2nd-year Operating Systems lecture**.  
Like most classes, I was sitting at the back, not paying much attention and talking to friends. But the moment my professor introduced **deadlocks**, something about the topic immediately stood out — the idea of processes, resources, and circular wait felt surprisingly interesting and visual.

Right after that class, I wrote down a small note:

> “Build a deadlock visualizer someday.”

I even created a short PDF draft for the idea.

Later in **3rd year**, while freeing up storage on my Mac, I unexpectedly came across that old PDF again.  
At the same time, we were studying deadlocks in DBMS, which brought the idea back into focus.

That rediscovery pushed me to finally turn the original classroom thought into a full-stack project — resulting in **Deadlock Detective**.


## Live Demo
Video demo: `https://youtu.be/your-video-link`  
(Screenshots can be added inside a `screenshots/` folder.)

---

## Features

**Core**
- Add processes & resources dynamically
- Create Request (P → R) and Allocation (R → P) edges
- DFS-based deadlock detection
- Cycle highlighting with animated edges
- Kill process to resolve deadlock
- Explanation panel for viva/reports

**Game Mode** 
- 60-second timed challenge
- Create a deadlock before time runs out
- Score based on speed
- Confetti on win!

**UI/UX**
- Built-in docs & OS theory
- Desktop-only optimized layout
---

## Deadlock Theory (Quick Summary)

A deadlock occurs when the four Coffman conditions hold:

1. Mutual Exclusion  
2. Hold and Wait  
3. No Preemption  
4. Circular Wait  

This project detects **Circular Wait** by identifying cycles in the resource allocation graph.

Backend example:

```json
{
  "deadlock": true,
  "cycle": ["P1", "R1", "P2", "R2", "P1"]
}
```

Developed as a practical and interactive approach to understanding OS/DBMS concepts.
---

If you found the project helpful, consider ⭐️ the repository.
