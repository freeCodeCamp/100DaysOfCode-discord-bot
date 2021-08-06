import { connect } from "mongoose";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";

export const connectDatabase = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logHandler.log("info", "Database connection successful.");
  } catch (error) {
    errorHandler("database connection", error);
  }
};
