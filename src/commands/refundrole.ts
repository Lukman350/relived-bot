import CheckAccount from "../database/helper/CheckAccount";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import getUcpFromDiscordID from "../database/helper/GetUcp";
import { GuildMember } from "discord.js";
import { discordChannel, userRoles, hasRole } from "../utils/any";
import { errorHandler } from "../utils/errorHandler";

const refundrole: Command = {
  data: new SlashCommandBuilder()
    .setName("refundrole")
    .setDescription("Untuk mengembalikan role UCP"),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const { user, channelId, member } = interaction;

      if (hasRole(member as GuildMember, userRoles.verifyUCP)) {
        interaction.editReply({
          content: ":x: Anda sudah terdaftar di server kami"
        });

        return;
      }

      if (channelId !== discordChannel.refundRole) {
        await interaction.editReply({
          content: `:x: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.refundRole}>`
        });
        return;
      }

      if (!await CheckAccount("", "", user.id)) {
        await interaction.editReply({
          content: ":x: Anda belum terdaftar di server kami"
        });
        return;
      }

      const ucp = await getUcpFromDiscordID(user.id);
      let role = await interaction.guild?.roles.cache.find(r => r.id === userRoles.verifyUCP);

      if (role) {
        await (member as GuildMember).roles.add(role);
      }

      await (member as GuildMember).setNickname(ucp, "Refund Role").catch(async () => {
        await interaction.editReply({
          content: `:x: Gagal mengubah nickname mu, silahkan minta Admin untuk mengubah nickname mu`
        });
      });

      await interaction.editReply({
        content: `:white_check_mark: Selamat datang kembali, **${ucp}**! Role kamu sudah dikembalikan, mohon hindari untuk tidak keluar masuk ke server kami. Terimakasih selamat bermain kembali 😊`
      });
    } catch (error) {
      errorHandler("refundrole command", error);
    }
  }
};

export default refundrole;