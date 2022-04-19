import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { MessageEmbed } from "discord.js";
import axios from "axios";

const quote: Command = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Untuk menampilkan random quotes")
    .addStringOption(option => option
      .setName("tags")
      .setDescription("Tags yang ingin dicari")
      .setRequired(false)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const tags = interaction.options.getString("tags");

      const arrayTags = tags ? tags.split(" ") : [];
      let url = "https://api.quotable.io/random";

      if (arrayTags.length > 0) {
        url = `https://api.quotable.io/random?tags=${arrayTags.join(",")}`;
      }

      await axios.get(url).then(async (response) => {
        const { data } = response;

        const quoteEmbed = new MessageEmbed()
          .setColor("#e8c02a")
          .setTitle(data.author)
          .setDescription(`*"${data.content}*"`)
          .setFooter({
            text: `Tags: ${data.tags.join(", ")}`,
          });
  
        await interaction.editReply({
          embeds: [quoteEmbed],
        });
      }).catch(async () => {
        await interaction.editReply({
          content: ":x: Tidak ada quotes yang ditemukan",
        });
      });

    } catch (error) {
      errorHandler("quote command", error);
    }
  }
};

export default quote;