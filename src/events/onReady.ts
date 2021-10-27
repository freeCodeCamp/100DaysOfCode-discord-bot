import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";
import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_CommandList";
import { Client } from "discord.js";

export const onReady = async (BOT: Client): Promise<void> => {
  try {
    const rest = new REST({ version: "9" }).setToken(
      process.env.BOT_TOKEN as string
    );

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach((command) => commandData.push(command.data.toJSON()));
    await rest.put(
      Routes.applicationGuildCommands(
        BOT.user?.id || "missing token",
        process.env.GUILD_ID as string
      ),
      { body: commandData }
    );
    logHandler.log("info", "Bot has connected to Discord!");
  } catch (err) {
    errorHandler("onReady event", err);
  }
};
