import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { initDatabase } from "./config/database";
import { usersRouter } from "./users/users.routes";
import { authRouter } from "./auth/auth.routes";
import { authenticateJwt } from "./middlewares/authenticate-jwt.middleware";

dotenv.config();

initDatabase();

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Blog Api Server");
});

app.use("/users", authenticateJwt, usersRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
