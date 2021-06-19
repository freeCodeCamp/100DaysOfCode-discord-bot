import { MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
  name: "help",
  desc: "Returns information on the bot's available commands.",
  run: async (message) => {
    try {
      const { channel } = message;

      const helpEmbed = new MessageEmbed();
      helpEmbed.setTitle("Available Commands!");
      helpEmbed.setDescription(
        "These are the available commands for this bot. You can view [the source code](https://github.com/nhcarrigan/100-days-of-code-bot) or read the [documentation site](https://www.nhcarrigan.com/100-days-of-code-bot) for more information."
      );
      helpEmbed.addField(
        "Commands:",
        CommandList.filter((el) => el && !el.hidden)
          .map((el) => `\`!${el.name}\`: ${el.desc}`)
          .join("\n")
      );
      await channel.send(helpEmbed);
      return;
    } catch (err) {
      errorHandler("help command", err);
    }
  },
};
