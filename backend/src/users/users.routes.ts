import express from "express";
import { createUser, findAllUsers, getCurrentUser } from "./users.controller";

const router = express.Router();

router.post("/", createUser);
router.get("/", findAllUsers);
router.get("/me", getCurrentUser);
export { router as usersRouter };
