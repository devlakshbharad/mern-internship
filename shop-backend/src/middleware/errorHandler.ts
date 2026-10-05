import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  // Zod validation error
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: error.issues,
    });

    return;
  }

  // PostgreSQL errors
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const dbError = error as { code: string };

    // Duplicate value
    if (dbError.code === "23505") {
      res.status(409).json({
        message: "Duplicate value already exists",
      });

      return;
    }

    // Foreign key error
    if (dbError.code === "23503") {
      res.status(400).json({
        message: "Referenced record does not exist",
      });

      return;
    }
  }

  // Unknown/server error
  res.status(500).json({
    message: "Internal server error",
  });
};