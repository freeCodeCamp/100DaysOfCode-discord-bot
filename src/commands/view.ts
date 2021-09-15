import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { getCamperData } from "../modules/getCamperData";
import { errorHandler } from "../utils/errorHandler";

export const view: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("Shows your latest 100 days of code check in."),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;
      const targetCamper = await getCamperData(user.id);

      if (!targetCamper) {
        await interaction.editReply({
          content:
            "There was an error with the database lookup. Please try again later.",
        });
        return;
      }

      if (!targetCamper.day) {
        await interaction.editReply({
          content:
            "It looks like you have not started the 100 Days of Code challenge yet. Use `/100` and add your message to report your first day!",
        });
        return;
      }

      const camperEmbed = new MessageEmbed();
      camperEmbed.setTitle("My 100DoC Progress");
      camperEmbed.setDescription(
        `Here is my 100 Days of Code progress. I last reported an update on ${new Date(
          targetCamper.timestamp
        ).toLocaleDateString()}.`
      );
      camperEmbed.addField("Round", targetCamper.round.toString(), true);
      camperEmbed.addField("Day", targetCamper.day.toString(), true);
      camperEmbed.setAuthor(
        user.username + "#" + user.discriminator,
        user.displayAvatarURL()
      );

      await interaction.editReply({ embeds: [camperEmbed] });
    } catch (err) {
      errorHandler("view command", err);
    }
  },
};
