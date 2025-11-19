import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import App from "./App.jsx";
import "./index.css";
import "reactflow/dist/style.css";

createRoot(document.getElementById("root")).render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
