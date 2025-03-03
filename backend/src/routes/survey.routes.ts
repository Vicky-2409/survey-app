import { Router } from "express";
import { SurveyController } from "../controllers/survey.controller";
import { body } from "express-validator";
import { validate } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const surveyController = new SurveyController();

const surveyValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("gender")
    .isIn(["male", "female", "other", "prefer_not_to_say"])
    .withMessage("Invalid gender"),
  body("nationality").notEmpty().withMessage("Nationality is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("message").notEmpty().withMessage("Message is required"),
];

router.post(
  "/",
  validate(surveyValidationRules),
  surveyController.createSurvey
);

router.get("/", authenticate, surveyController.getAllSurveys);
router.get("/:id", authenticate, surveyController.getSurveyById);

export default router;
