import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod"

import { AppError } from "@/utils/AppError";

export function errorHandling(error: any, request: Request, response: Response, _: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "Validation error", issues: error.format() })
  }
  
  return response.status(500).json({ message: error.message });
}