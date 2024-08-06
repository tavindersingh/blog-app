import express from "express";
import { authenticateJwt } from "../middlewares/authenticate-jwt.middleware";
import {
    createPost,
    findAllPosts,
    findPostById,
    getCurrentUserPosts,
} from "./posts.controller";

const router = express.Router();

router.post("/", authenticateJwt, createPost);
router.get("/me", authenticateJwt, getCurrentUserPosts);
router.get("/", findAllPosts);
router.get("/:postId", findPostById);

export { router as postsRouter };
