import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { body } from "express-validator";
import { validate } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

const loginValidationRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/login", validate(loginValidationRules), authController.login);

router.get("/validate", authenticate, authController.validateToken);

export default router;
