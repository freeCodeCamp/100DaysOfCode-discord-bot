import { MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { getCamperData } from "../modules/getCamperData";
import { overrideCamperData } from "../modules/overrideCamperData";
import { errorHandler } from "../utils/errorHandler";

export const override: CommandInt = {
  name: "override",
  desc: "Overrides a camper's data.",
  hidden: true,
  run: async (message) => {
    try {
      const { author, channel, content, mentions } = message;

      const targetCamperDiscord = mentions.users.first();

      const validModerators = ["465650873650118659"];

      if (!validModerators.includes(author.id)) {
        await channel.send(
          "This command is locked to specific users. You are unable to override settings."
        );
        return;
      }

      if (!targetCamperDiscord) {
        await channel.send(
          "You need to mention the @mention of the Discord user you want to override."
        );
        return;
      }

      const targetCamper = await getCamperData(targetCamperDiscord.id);

      if (!targetCamper) {
        await channel.send(
          "An error occurred when reading the database. Please try again later."
        );
        return;
      }

      const [, , round, day] = content.split(" ");

      if (isNaN(parseInt(round)) || isNaN(parseInt(day))) {
        await channel.send(
          "You need to provide valid numbers for the round and day."
        );
        return;
      }

      const overriddenCamper = await overrideCamperData(
        targetCamper,
        parseInt(round),
        parseInt(day)
      );

      if (!overriddenCamper) {
        await channel.send(
          "An error occurred when updating the database. Please try again later."
        );
        return;
      }

      const overrideEmbed = new MessageEmbed();
      overrideEmbed.setAuthor(
        targetCamperDiscord.username + "#" + targetCamperDiscord.discriminator,
        targetCamperDiscord.displayAvatarURL()
      );
      overrideEmbed.setTitle("Updated 100 Days of Code data.");
      overrideEmbed.setDescription(`Data manually set by <@!${author.id}>.`);
      overrideEmbed.addField("Round", overriddenCamper.round.toString());
      overrideEmbed.addField("Day", overriddenCamper.day.toString());
      overrideEmbed.setFooter(
        "Manually updated on: " +
          new Date(overriddenCamper.timestamp).toLocaleDateString()
      );

      await channel.send({ embeds: [overrideEmbed] });
      await message.delete();
    } catch (err) {
      errorHandler("override command", err);
    }
  },
};
