import express from "express";
import cors from "cors";
import { detectDeadlock } from "./graphLogic.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server Running");
})

app.post("/check", (req, res) => {
  const { graph } = req.body;
  const result = detectDeadlock(graph);
  res.json(result);
});

app.listen( 8080, "0.0.0.0" , () => console.log("Server live on port 8080") );
