import Register from "../database/helper/Register";
import CheckAccount from "../database/helper/CheckAccount";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import validateEmail from "../utils/validateEmail";
import { errorHandler } from "../utils/errorHandler";
import { discordChannel } from "../utils/any";
import getUcpFromDiscordID from "../database/helper/GetUcp";

const register: Command = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Untuk mendaftarkan akun UCP ke server Relived Roleplay")
    .addStringOption(option => option
      .setName("username")
      .setDescription("UCP yang ingin didaftarkan")
      .setRequired(true)
    )
    .addStringOption(option => option
      .setName("email")
      .setDescription("Email yang ingin didaftarkan, pastikan email aktif")
      .setRequired(true)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;
      const { channelId } = interaction;

      if (channelId !== discordChannel.register) {
        await interaction.editReply({
          content: `:x: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.register}>`
        });
        return;
      }
  
      const username = interaction.options.getString("username");
      const email = interaction.options.getString("email");
  
      if (!username || !email) {
        await interaction.editReply({
          content: "Username dan email harus diisi!"
        });
        return;
      }
  
      if (!validateEmail(email)) {
        await interaction.editReply({
          content: ":x: Email yang anda masukkan tidak valid"
        })
        return;
      } else if (await CheckAccount(username)) {
        await interaction.editReply({
          content: ":x: Nama UCP sudah terdaftar di server, silahkan gunakan nama lain"
        })
        return;
      } else if (await CheckAccount("", email, "")) {
        await interaction.editReply({
          content: ":x: Email sudah terdaftar di server, silahkan gunakan email lain"
        })
        return;
      } else if (await CheckAccount("", "", user.id)) {
        await interaction.editReply({
          content: `:x: Sepertinya Anda sudah pernah mendaftar sebelumnya, UCP **${(await getUcpFromDiscordID(user.id)).toString()}** sudah terkaitkan dengan akun Discord Anda`
        });
        return;
      } else {
        await Register(username, email, user.id).then(async () => {
          await interaction.editReply({
            content: `:white_check_mark: Berhasil mendaftarkan akun UCP **${username}**, silahkan cek email yang anda masukkan untuk verifikasi akun Anda`
          });
        }).catch(async (error) => {
          await interaction.editReply({
            content: `:x: Gagal mendaftarkan akun UCP, **${error}**`
          });
        });
      }
    } catch (error) {
      errorHandler("register command", error);
    }
  }
};

export default register;