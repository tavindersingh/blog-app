import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/tokens";

export const authenticateJwt = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const type = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (type !== "Bearer") {
      return res.sendStatus(401);
    }

    const payload = verifyToken(token);

    req["userId"] = payload.id;

    next();
  } else {
    res.sendStatus(401);
  }
};
