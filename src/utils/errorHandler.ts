import * as Sentry from "@sentry/node";
import { logHandler } from "./logHandler";
export const errorHandler = (context: string, error: Error): void => {
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: error.message, errorStack: error.stack })
  );
  Sentry.captureException(error);
};
