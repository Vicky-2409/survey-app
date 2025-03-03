import { Request, Response } from "express";
import { SurveyService } from "../services/survey.service";
import { HttpStatus } from "../constants/http-status.enum";
import { Messages } from "../constants/messages.constant";

export class SurveyController {
  private surveyService: SurveyService;

  constructor() {
    this.surveyService = new SurveyService();
  }

  createSurvey = async (req: Request, res: Response): Promise<void> => {
    try {
      const surveyData = req.body;
      const survey = await this.surveyService.createSurvey(surveyData);

      res.status(HttpStatus.CREATED).json({
        message: Messages.SURVEY_CREATED,
        data: survey,
      });
    } catch (error) {
      console.error("Error creating survey:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Messages.SERVER_ERROR,
      });
    }
  };

  getAllSurveys = async (req: Request, res: Response): Promise<void> => {
    try {
      const surveys = await this.surveyService.getAllSurveys();

      res.status(HttpStatus.OK).json({
        message: Messages.SURVEY_FETCH_SUCCESS,
        data: surveys,
      });
    } catch (error) {
      console.error("Error fetching surveys:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Messages.SERVER_ERROR,
      });
    }
  };

  getSurveyById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const survey = await this.surveyService.getSurveyById(id);

      if (!survey) {
        res.status(HttpStatus.NOT_FOUND).json({
          message: Messages.SURVEY_NOT_FOUND,
        });
        return;
      }

      res.status(HttpStatus.OK).json({
        message: Messages.SURVEY_FETCH_SUCCESS,
        data: survey,
      });
    } catch (error) {
      console.error("Error fetching survey:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: Messages.SERVER_ERROR,
      });
    }
  };
}
