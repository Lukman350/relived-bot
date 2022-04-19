import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { MessageEmbed } from "discord.js";

const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Untuk menampilkan daftar perintah yang tersedia"),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const helpEmbed = new MessageEmbed()
        .setColor("#e8c02a")
        .setTitle("Daftar Perintah")
        .setDescription(
          `Perintah yang tersedia saat ini adalah:
          \`/whitelist\` - Untuk menambahkan akun UCP ke WhiteList
          \`/register\` - Untuk mendaftarkan akun UCP ke server Relived Roleplay
          \`/help\` - Untuk menampilkan daftar perintah yang tersedia
          \`/setstory\` - Untuk memberi character story kepada karakter
          \`/updatediscorducp\` - Untuk mengaitkan akun Discord ke akun UCP
          \`/getuserinfo\` - Untuk menampilkan informasi akun UCP
          \`/botinfo\` - Untuk menampilkan informasi bot
          \`/quote\` - Untuk menampilkan random quotes
          \`/urban\` - Untuk mencari kata kata di Urban Dictionary
          \`/cat\` - Untuk menampilkan gambar kucing secara random
          \`/dog\` - Untuk menampilkan gambar anjing secara random
          `
        )
        .setThumbnail("https://cdn.discordapp.com/icons/914691384345239592/a_63d5fde381cb34664516332e190c8b84.webp?size=96")
        .setFooter({
          text: "Copyright © 2022 Relived Roleplay",
          iconURL: "https://cdn.discordapp.com/icons/914691384345239592/a_63d5fde381cb34664516332e190c8b84.webp?size=96",
        });

      await interaction.editReply({
        embeds: [helpEmbed],
      });
    } catch (error) {
      errorHandler("help command", error);
    }
  }
}

export default help;