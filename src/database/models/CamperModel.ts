import { Document, model, Schema } from "mongoose";

export interface CamperInt extends Document {
  discordId: string;
  round: number;
  day: number;
  timestamp: number;
}

export const Camper = new Schema({
  discordId: String,
  round: {
    type: Number,
    default: 1,
  },
  day: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

export default model<CamperInt>("Camper", Camper);
