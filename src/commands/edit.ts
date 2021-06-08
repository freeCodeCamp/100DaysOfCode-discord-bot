import { CommandInt } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";

export const edit: CommandInt = {
  name: "edit",
  desc: "Edit a previous 100 Days of Code post.",
  run: async (message) => {
    try {
      const { author, channel, content } = message;

      const [, target, ...text] = content.split(" ");

      const targetId = target.split("/").reverse()[0];

      const targetMessage = await channel.messages.fetch(targetId);

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

      await targetMessage.edit(targetEmbed);

      await message.delete();
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
