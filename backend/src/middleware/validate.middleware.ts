import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

// Define the middleware for validating DTOs
export function validateDTO<T extends object>(DTOClass: new () => T) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance(DTOClass, req.body);
    const errors = await validate(dtoObject, { whitelist: true });

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => ({
        property: e.property,
        constraints: e.constraints,
      }));
      res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
    }

    req.body = dtoObject;
    next();
  };
}
