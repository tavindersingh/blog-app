import { Request, Response } from "express";
import { SignupDto } from "./dtos/signup.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

export const signup = async (req: Request, res: Response) => {
  const signupDto = req.body as SignupDto;

  const authService = new AuthService();

  const tokens = await authService.signup(signupDto);
  return res.status(201).json(tokens);
};

export const login = async (req: Request, res: Response) => {
  const loginDto = req.body as LoginDto;

  const authService = new AuthService();

  const tokens = await authService.login(loginDto);
  return res.status(200).json(tokens);
};
