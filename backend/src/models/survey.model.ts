import mongoose, { Schema, Document } from "mongoose";
import { ISurvey } from "../interfaces/survey.interface";

export interface ISurveyDocument extends ISurvey, Document {}

const SurveySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISurveyDocument>("Survey", SurveySchema);
