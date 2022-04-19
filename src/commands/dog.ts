import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { MessageEmbed } from "discord.js";
import axios from "axios";

const dog: Command = {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Untuk menampilkan gambar anjing secara random"),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      await axios.get("https://random.dog/woof.json").then(async (response) => {
        const { data } = response;

        const dogEmbed = new MessageEmbed()
          .setColor("#e8c02a")
          .setImage(data.url);

        await interaction.editReply({
          embeds: [dogEmbed],
        });
      }).catch(async () => {
        await interaction.editReply({
          content: ":x: Tidak ada gambar kucing yang ditemukan",
        });
      });
    } catch (error) {
      errorHandler("dog command", error);
    }
  }
}

export default dog;