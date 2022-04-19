import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { MessageEmbed } from "discord.js";
import axios from "axios";

const cat: Command = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Untuk menampilkan gambar kucing secara random"),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      await axios.get("https://aws.random.cat/meow").then(async (response) => {
        const { data } = response;

        const catEmbed = new MessageEmbed()
          .setColor("#e8c02a")
          .setImage(data.file);

        await interaction.editReply({
          embeds: [catEmbed],
        });
      }).catch(async () => {
        await interaction.editReply({
          content: ":x: Tidak ada gambar kucing yang ditemukan",
        });
      });
    } catch (error) {
      errorHandler("cat command", error);
    }
  }
}

export default cat;