import { MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { getCamperData } from "../modules/getCamperData";
import { errorHandler } from "../utils/errorHandler";

export const view: CommandInt = {
  name: "view",
  desc: "View your current 100 Days of Code progress",
  run: async (message) => {
    try {
      const { author, channel } = message;

      const targetCamper = await getCamperData(author.id);

      if (!targetCamper) {
        await channel.send(
          "There was an error with the database lookup. Please try again later."
        );
        return;
      }

      if (!targetCamper.day) {
        await channel.send(
          "It looks like you have not started the 100 Days of Code challenge yet. Use `!100` and add your message to report your first day!"
        );
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
        author.username + "#" + author.discriminator,
        author.displayAvatarURL()
      );

      await channel.send({ embeds: [camperEmbed] });
      await message.delete();
    } catch (err) {
      errorHandler("view command", err);
    }
  },
};
