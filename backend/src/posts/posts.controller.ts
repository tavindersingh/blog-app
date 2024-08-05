import { Request, Response } from "express";
import { CreatePostDto } from "./dtos/create-post.dto";
import { PostsService } from "./posts.service";

export const createPost = async (req: any, res: Response) => {
  const createPostDto = req.body as CreatePostDto;

  const postsService = new PostsService();

  const post = await postsService.create({
    ...createPostDto,
    authorId: req.userId,
  });

  return res.status(201).json(post);
};

export const findAllPosts = async (req: any, res: Response) => {
  const postsService = new PostsService();
  const posts = await postsService.findAll({
    author: req.userId,
  });
  return res.status(200).json(posts);
};

export const findPostById = async (req: Request, res: Response) => {
  const { postId } = req.params;
  console.log(req.params);

  const postsService = new PostsService();
  const post = await postsService.findById(Number(postId));

  return res.status(200).json(post);
};
