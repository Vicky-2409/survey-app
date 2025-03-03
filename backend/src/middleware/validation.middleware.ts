import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { HttpStatus } from "../constants/http-status.enum";
import { Messages } from "../constants/messages.constant";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      message: Messages.VALIDATION_ERROR,
      errors: errors.array(),
    });
  };
};
