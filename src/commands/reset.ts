import { SlashCommandBuilder } from "@discordjs/builders";
import { Message, MessageActionRow, MessageButton } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { getCamperData } from "../modules/getCamperData";
import { errorHandler } from "../utils/errorHandler";

export const reset: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Reset your 100 Days of Code progress."),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;
      const confirmButton = new MessageButton()
        .setCustomId("confirm")
        .setLabel("Confirm")
        .setEmoji("✅")
        .setStyle("PRIMARY");
      const row = new MessageActionRow().addComponents([confirmButton]);
      const response = (await interaction.editReply({
        content:
          "This will delete all of your stored 100 Days of Code progress. You will start at Round 1 Day 1. If you are sure this is what you want to do, click the button below.",
        components: [row],
      })) as Message;

      const collector = response.createMessageComponentCollector({
        time: 30000,
        filter: (click) => click.user.id === user.id,
        max: 1,
      });

      collector.on("collect", async (click) => {
        await click.deferUpdate();
        const camperData = await getCamperData(user.id);

        if (!camperData) {
          await interaction.editReply({
            content: "There was an error fetching your data.",
          });
          return;
        }

        await camperData.delete();

        await interaction.editReply({
          content: "Your 100 Days of Code progress has been reset.",
        });
        return;
      });

      collector.on("end", async () => {
        const disabledButton = confirmButton.setDisabled(true);
        const row = new MessageActionRow().addComponents([disabledButton]);
        await interaction.editReply({
          components: [row],
        });
      });
    } catch (err) {
      errorHandler("reset command", err);
    }
  },
};
