import CheckAccount from "../database/helper/CheckAccount";
import Whitelist from "../database/helper/Whitelist";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { discordChannel, isRoleAdmin } from "../utils/any";
import { GuildMember } from "discord.js";

const whitelist: Command = {
  data: new SlashCommandBuilder()
    .setName("whitelist")
    .setDescription("Untuk menambahkan akun UCP ke WhiteList")
    .addStringOption(option => option
      .setName("username")
      .setDescription("UCP yang ingin ditambahkan")
      .setRequired(true)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const { channelId } = interaction;

      if (!isRoleAdmin(interaction.member as GuildMember)) {
        await interaction.editReply({
          content: "ERROR: Anda tidak memiliki hak akses untuk menggunakan perintah ini"
        });
        return;
      }

      if (channelId !== discordChannel.whitelist) {
        await interaction.editReply({
          content: `ERROR: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.whitelist}>`
        });
        return;
      }

      const username = interaction.options.getString("username");

      if (!username) {
        await interaction.editReply({
          content: "ERROR: Username harus diisi!"
        });
        return;
      }

      if (await CheckAccount(username)) {
        await interaction.editReply({
          content: "ERROR: Nama UCP tidak ditemukan di server, silahkan coba lagi"
        })
        return;
      }

      if (await Whitelist(username) === false) {
        await interaction.editReply({
          content: "ERROR: Nama UCP sudah terdaftar dalam WhiteList, silahkan coba lagi"
        })
        return;
      }

      await interaction.editReply({
        content: `SUCCESS: Berhasil menambahkan ${username} ke WhiteList`
      });
    } catch (error) {
      errorHandler("whitelist command", error);
    }
  }
}

export default whitelist;