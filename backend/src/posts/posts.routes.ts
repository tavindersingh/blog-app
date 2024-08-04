import express from "express";
import { createPost, findAllPosts, findPostById } from "./posts.controller";
import { authenticateJwt } from "../middlewares/authenticate-jwt.middleware";

const router = express.Router();

router.post("/", authenticateJwt, createPost);
router.get("/", findAllPosts);
router.get("/:postId", findPostById);

export { router as postsRouter };
