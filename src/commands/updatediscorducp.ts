import UpdateUcp from "../database/helper/UpdateUcp";
import CheckAccount from "../database/helper/CheckAccount";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { discordChannel } from "../utils/any";

const updatediscorducp: Command = {
  data: new SlashCommandBuilder()
    .setName("updatediscorducp")
    .setDescription("Untuk mengaitkan akun Discord ke akun UCP")
    .addStringOption(option => option
      .setName("ucp")
      .setDescription("UCP yang akan dikaitkan")
      .setRequired(true)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { channelId, user } = interaction;

      if (channelId !== discordChannel.updateUCP) {
        await interaction.editReply({
          content: `:x: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.updateUCP}>`
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

      await UpdateUcp(ucp, user.id).then(async () => {
        await interaction.editReply({
          content: `:white_check_mark: UCP **${ucp}** berhasil dikaitkan ke Discord User ID: <@${user.id}>`
        });
      }).catch(async (usr) => {
        if (usr.DiscordID) {
          await interaction.editReply({
            content: `:x: UCP **${ucp}** sudah terdaftar di Discord User ID: <@${usr.DiscordID}>`
          });
        } else {
          await interaction.editReply({
            content: `:x: ${usr}`
          });
        }
      });
    } catch (error) {
      errorHandler("updatediscorducp command", error);
    }
  }
};

export default updatediscorducp;