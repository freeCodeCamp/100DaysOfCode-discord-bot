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
        "These are the available commands for this bot. You can view [the source code](https://github.com/freeCodeCamp/100-days-of-code-bot) or read the [documentation](https://opensource.freecodecamp.org/100DaysOfCode-discord-bot/#/) for more information."
      );
      helpEmbed.addField(
        "Commands:",
        CommandList.filter((el) => el && !el.hidden)
          .map((el) => `\`!${el.name}\`: ${el.desc}`)
          .join("\n")
      );
      helpEmbed.setFooter(`Version ${process.env.npm_package_version}`);
      await channel.send({ embeds: [helpEmbed] });
      return;
    } catch (err) {
      errorHandler("help command", err);
    }
  },
};
