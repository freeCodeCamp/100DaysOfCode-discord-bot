import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";

export const onReady = async (): Promise<void> => {
  try {
    logHandler.log("info", "Bot has connected to Discord!");
  } catch (err) {
    errorHandler("onReady event", err);
  }
};
