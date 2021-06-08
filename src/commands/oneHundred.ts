import { Message, MessageEmbed } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";
import { errorHandler } from "../utils/errorHandler";

export const oneHundred: CommandInt = {
  name: "100",
  desc: "Generates a 100 days of code update.",
  run: async (message: Message) => {
    try {
      const { author, channel, content } = message;
      const [, ...text] = content.split(" ");

      const targetCamper = await getCamperData(author.id);

      if (!targetCamper) {
        await channel.send(
          "There is an error with the database lookup. Please try again later."
        );
        return;
      }

      const updatedCamper = await updateCamperData(targetCamper);

      if (!updatedCamper) {
        await channel.send(
          "There is an error with the database update. Please try again later."
        );
        return;
      }

      const oneHundredEmbed = new MessageEmbed();
      oneHundredEmbed.setTitle("100 Days of Code");
      oneHundredEmbed.setDescription(text.join(" "));
      oneHundredEmbed.setAuthor(author.username, author.displayAvatarURL());
      oneHundredEmbed.addField("Round", updatedCamper.round, true);
      oneHundredEmbed.addField("Day", updatedCamper.day, true);
      oneHundredEmbed.setFooter(
        "Day completed: " +
          new Date(updatedCamper.timestamp).toLocaleDateString()
      );

      await channel.send(oneHundredEmbed);
      await message.delete();
    } catch (err) {
      errorHandler("100 command", err);
    }
  },
};
