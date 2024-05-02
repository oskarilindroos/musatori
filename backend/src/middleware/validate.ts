import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
