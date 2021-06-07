import { Message } from "discord.js";
import { errorHandler } from "../utils/errorHandler";

export const onMessage = async (message: Message): Promise<void> => {
  try {
    const [command] = message.content.split(" ");
    console.log(command);
  } catch (err) {
    errorHandler("onMessage event", err);
  }
};
