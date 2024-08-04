import { Request, Response } from "express";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import createHttpError from "http-errors";

interface AuthorizedRequest extends Request {
  userId: number;
}

export const createUser = async (req: Request, res: Response) => {
  const createUserDto = req.body as CreateUserDto;
  const usersService = new UsersService();
  const user = await usersService.create(createUserDto);

  return res.status(201).json(user);
};

export const findAllUsers = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const users = await usersService.findAll();
  return res.status(200).json(users);
};

export const getCurrentUser = async (req: any, res: Response) => {
  if (!req.userId) {
    throw createHttpError(401, "Unauthorized");
  }

  const userId = req.userId;
  const usersService = new UsersService();

  const user = await usersService.findById(userId);

  return res.status(200).json(user);
};
