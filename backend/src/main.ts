import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { initDatabase } from "./config/database";

dotenv.config();

initDatabase();

const app: Express = express();
const port = process.env.PORT || 3333;

app.get("/", (req: Request, res: Response) => {
  res.send("Blog Api Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
