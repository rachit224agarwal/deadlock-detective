import express from "express";
import cors from "cors";
import { detectDeadlock } from "./graphLogic.js";

const app = express();


app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server Running");
})

app.post("/check", (req, res) => {
  console.log("GRAPH RECEIVED:", req.body.graph);
  const { graph } = req.body;
  const result = detectDeadlock(graph);
  res.json(result);
  console.log("SERVER RESPONSE:", result);

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`Server live on port ${PORT}`));
