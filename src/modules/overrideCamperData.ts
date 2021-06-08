import { CamperInt } from "../database/models/CamperModel";
import { errorHandler } from "../utils/errorHandler";

export const overrideCamperData = async (
  Camper: CamperInt,
  round: number,
  day: number
): Promise<CamperInt | undefined> => {
  try {
    Camper.round = round;
    Camper.day = day;
    Camper.timestamp = Date.now();
    await Camper.save();
    return Camper;
  } catch (err) {
    errorHandler("overrideCamperData module", err);
  }
};
