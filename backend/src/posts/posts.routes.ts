import express from "express";
import { authenticateJwt } from "../middlewares/authenticate-jwt.middleware";
import { createPost, findAllPosts, findPostById } from "./posts.controller";

const router = express.Router();

router.post("/", authenticateJwt, createPost);
router.get("/", findAllPosts);
router.get("/:postId", findPostById);

export { router as postsRouter };
