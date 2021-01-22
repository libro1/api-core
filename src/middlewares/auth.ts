import { Request, Response, NextFunction } from "express";

import Utils from "../utils/responseParser";
import Token from "../domain/token";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const tokenString = req.headers["user-token"] as string;
  if (!tokenString || tokenString === "")
    return res.status(401).json(Utils.getResposeError("Token no encontrado"));

  let userToken = new Token(tokenString);

  if (!userToken.isValid())
    return res.status(401).json(Utils.getResposeError("Token invalido o expirado"));
  else {
    req.headers.userId = userToken.getUserId();
    next();
  }
};
