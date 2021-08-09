import { CommandInt } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";

export const edit: CommandInt = {
  name: "edit",
  desc: "Edit a previous 100 Days of Code post.",
  run: async (message) => {
    try {
      const { author, channel, content } = message;

      const [, targetId, ...text] = content.split(" ");

      const targetMessage = await channel.messages.fetch(targetId);

      if (!targetMessage) {
        await channel.send(
          "That does not appear to be a valid message ID. Be sure that the message is in the same channel you are using this command."
        );
        return;
      }

      const targetEmbed = targetMessage.embeds[0];

      if (
        targetEmbed.author?.name !==
        author.username + "#" + author.discriminator
      ) {
        await channel.send(
          "This does not appear to be your 100 Days of Code post. You cannot edit it."
        );
        return;
      }

      targetEmbed.setDescription(text.join(" ").replace(/\\n/g, "\n"));

      await targetMessage.edit({ embeds: [targetEmbed] });

      await message.delete();
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
