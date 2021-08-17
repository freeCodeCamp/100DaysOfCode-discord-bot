import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInt } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";

export const edit: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("edit")
    .setDescription("Edit a previous 100 days of code post.")
    .addStringOption((option) =>
      option
        .setName("embed-id")
        .setDescription("ID of the message to edit.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to go in your 100 Days of Code update.")
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { channel, user } = interaction;
      const targetId = interaction.options.getString("embed-id");
      const text = interaction.options.getString("message");

      if (!text || !targetId || !channel) {
        await interaction.editReply({
          content: "Missing required parameters...",
        });
        return;
      }

      const targetMessage = await channel.messages.fetch(targetId);

      if (!targetMessage) {
        await interaction.editReply({
          content:
            "That does not appear to be a valid message ID. Be sure that the message is in the same channel you are using this command.",
        });
        return;
      }

      const targetEmbed = targetMessage.embeds[0];

      if (
        targetEmbed.author?.name !==
        user.username + "#" + user.discriminator
      ) {
        await interaction.editReply(
          "This does not appear to be your 100 Days of Code post. You cannot edit it."
        );
        return;
      }

      targetEmbed.setDescription(text);

      await targetMessage.edit({ embeds: [targetEmbed] });
      await interaction.editReply({ content: "Updated!" });
    } catch (err) {
      errorHandler("edit command", err);
    }
  },
};
