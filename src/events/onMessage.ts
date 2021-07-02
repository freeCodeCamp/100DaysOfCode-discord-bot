import { Client, Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { help } from "../commands/help";
import { errorHandler } from "../utils/errorHandler";

export const onMessage = async (
  message: Message,
  BOT: Client
): Promise<void> => {
  try {
    if (message.mentions.users.first()?.id === BOT.user?.id) {
      await help.run(message);
      return;
    }

    if (message.author.bot || !message.content.startsWith("!")) {
      return;
    }

    if (message.channel.type === "dm") {
      await message.channel.send(
        "Commands are not supported in DMs. Please use the 100 Days of Code channel."
      );
      return;
    }

    for (const Command of CommandList) {
      if (message.content.startsWith(`!${Command.name}`)) {
        await Command.run(message);
        break;
      }
    }
  } catch (err) {
    errorHandler("onMessage event", err);
  }
};
