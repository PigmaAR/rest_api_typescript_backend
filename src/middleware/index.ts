import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

export function handleInputErrors(
  req: Request,
  res: Response,
  next: NextFunction,
): RequestHandler {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
}
