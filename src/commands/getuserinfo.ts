import GetUserInfo from "../database/helper/GetUserInfo";
import CheckAccount from "../database/helper/CheckAccount";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { convertTimestamp, discordChannel, isRoleAdmin } from "../utils/any";
import { GuildMember } from "discord.js";

const getuserinfo: Command = {
  data: new SlashCommandBuilder()
    .setName("getuserinfo")
    .setDescription("Untuk menampilkan informasi akun UCP")
    .addStringOption(option => option
      .setName("ucp")
      .setDescription("UCP yang akan ditampilkan")
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

      if (channelId !== discordChannel.getUserInfo) {
        await interaction.editReply({
          content: `:x: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.getUserInfo}>`
        });
        return;
      }

      const ucp = interaction.options.getString("ucp");

      if (!ucp) {
        await interaction.editReply({
          content: ":x: UCP harus diisi!"
        });
        return;
      }

      if (!await CheckAccount(ucp)) {
        await interaction.editReply({
          content: ":x: UCP tidak terdaftar di server"
        })
        return;
      }

      await GetUserInfo(ucp).then(async (user: any) => {
        await interaction.editReply({
          content: `:white_check_mark: Informasi akun UCP **${ucp}**:

**ID:** ${user.ID}
**Username:** ${user.Username}
**Email:** ${user.Email}
**Register date:** ${convertTimestamp(user.RegisterDate).toString()}
**Discord user ID:** ${user.DiscordID} (<@${user.DiscordID}>)`
        });
      }).catch(async (usr) => {
        await interaction.editReply({
          content: `:x: ${usr.message}`
        });
      });
    } catch (error) {
      errorHandler("getuserinfo command", error);
    }
  }
};

export default getuserinfo;