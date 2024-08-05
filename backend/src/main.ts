import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { authRouter } from "./auth/auth.routes";
import { initDatabase } from "./config/database";
import { authenticateJwt } from "./middlewares/authenticate-jwt.middleware";
import { postsRouter } from "./posts/posts.routes";
import { usersRouter } from "./users/users.routes";

dotenv.config();

initDatabase();

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Blog Api Server");
});

app.use("/users", authenticateJwt, usersRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
