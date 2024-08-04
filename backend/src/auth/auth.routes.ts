import express from "express";
import { login, signup } from "./auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export { router as authRouter };
