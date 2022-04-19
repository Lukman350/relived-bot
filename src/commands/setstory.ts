import SetStory from "../database/helper/SetStory";
import CheckAccount from "../database/helper/CheckAccount";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { discordChannel, isRoleAdmin } from "../utils/any";
import { GuildMember } from "discord.js";

const setstory: Command = {
  data: new SlashCommandBuilder()
    .setName("setstory")
    .setDescription("Untuk memberi character story kepada karakter")
    .addStringOption(option => option
      .setName("character")
      .setDescription("Nama Karakter yang ingin diberi char story")
      .setRequired(true)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { channelId, member } = interaction;

      if (!isRoleAdmin(member as GuildMember)) {
        await interaction.editReply({
          content: ":x: Anda tidak memiliki hak akses untuk menggunakan perintah ini"
        });
        return;
      }

      if (channelId !== discordChannel.setStory) {
        await interaction.editReply({
          content: `:x: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.setStory}>`
        });
        return;
      }

      const character = interaction.options.getString("character");

      if (!character) {
        await interaction.editReply({
          content: "Nama karakter harus diisi!"
        });
        return;
      }

      if (!await CheckAccount("", "", "", character)) {
        await interaction.editReply({
          content: ":x: Nama karakter tidak terdaftar di server"
        })
        return;
      }

      await SetStory(character).then(async () => {
        await interaction.editReply({
          content: `:white_check_mark: Char story **${character}** telah berhasil diaccept`
        });
      }).catch(async () => {
        await interaction.editReply({
          content: `:x: Story karakter **${character}** sudah pernah diaccept`
        });
      });
    } catch (error) {
      errorHandler("setstory command", error);
    }
  }
}

export default setstory;