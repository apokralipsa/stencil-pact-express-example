import express from "express";
import cors from "cors";
import { todos } from './todos';

export const app = express();

app.use(cors({origin: "*"}))

app.get("/todos", (req, res) => {
  res.send(todos);
});
