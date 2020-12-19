import express from "express";
import cors from "cors";

export const app = express();

app.use(cors({origin: "*"}))

app.get("/todos", (req, res) => {
  res.send([{ description: "Buy groceries" }, { description: "Do laundry" }]);
});
