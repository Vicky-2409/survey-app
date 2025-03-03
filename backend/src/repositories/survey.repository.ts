import { ISurvey, ISurveyRepository } from "../interfaces/survey.interface";
import SurveyModel, { ISurveyDocument } from "../models/survey.model";

export class SurveyRepository implements ISurveyRepository {
  async create(surveyData: ISurvey): Promise<ISurvey> {
    const survey = new SurveyModel(surveyData);
    await survey.save();
    return survey.toObject();
  }

  async findAll(): Promise<ISurvey[]> {
    const surveys = await SurveyModel.find().sort({ createdAt: -1 });
    return surveys.map((survey) => survey.toObject());
  }

  async findById(id: string): Promise<ISurvey | null> {
    const survey = await SurveyModel.findById(id);
    return survey ? survey.toObject() : null;
  }
}
