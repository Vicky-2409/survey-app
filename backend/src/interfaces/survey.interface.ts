export interface ISurvey {
  name: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISurveyRepository {
  create(survey: ISurvey): Promise<ISurvey>;
  findAll(): Promise<ISurvey[]>;
  findById(id: string): Promise<ISurvey | null>;
}
