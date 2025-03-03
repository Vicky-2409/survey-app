import { ISurvey } from "../interfaces/survey.interface";
import { SurveyRepository } from "../repositories/survey.repository";

export class SurveyService {
  private surveyRepository: SurveyRepository;

  constructor() {
    this.surveyRepository = new SurveyRepository();
  }

  async createSurvey(surveyData: ISurvey): Promise<ISurvey> {
    return this.surveyRepository.create(surveyData);
  }

  async getAllSurveys(): Promise<ISurvey[]> {
    return this.surveyRepository.findAll();
  }

  async getSurveyById(id: string): Promise<ISurvey | null> {
    return this.surveyRepository.findById(id);
  }
}
