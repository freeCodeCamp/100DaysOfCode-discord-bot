import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";

export const help: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides information on using this bot."),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const helpEmbed = new MessageEmbed();
      helpEmbed.setTitle("100 Days of Code Bot!");
      helpEmbed.setDescription(
        "This discord bot is designed to help you track and share your 100 Days of Code progress."
      );
      helpEmbed.addField(
        "Create today's update",
        "Use the `/100` command to create your update for today. The `message` will be displayed in your embed."
      );
      helpEmbed.addField(
        "Edit today's update",
        "Do you see a typo in your embed? Right click it and copy the ID (you may need developer mode on for this), and use the `/edit` command to update that embed with a new message."
      );
      helpEmbed.addField(
        "Show your progress",
        "To see your current progress in the challenge, and the day you last checked in, use `/view`."
      );
      helpEmbed.setFooter(`Version ${process.env.npm_package_version}`);
      await interaction.editReply({ embeds: [helpEmbed] });
      return;
    } catch (err) {
      errorHandler("help command", err);
    }
  },
};
