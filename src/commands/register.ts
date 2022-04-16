import Register from "../database/helper/Register";
import CheckAccount from "../database/helper/CheckAccount";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import validateEmail from "../utils/validateEmail";
import { errorHandler } from "../utils/errorHandler";
import { discordChannel } from "../utils/any";

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
      .setDescription("Email yang ingin didaftarkan")
      .setRequired(true)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;
      const { channelId } = interaction;

      if (channelId !== discordChannel.register) {
        await interaction.editReply({
          content: `ERROR: Tidak dapat menggunakan perintah itu di channel ini. Silahkan coba di channel <#${discordChannel.register}>`
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
          content: "ERROR: Email yang anda masukkan tidak valid"
        })
        return;
      } else if (await CheckAccount(username)) {
        await interaction.editReply({
          content: "ERROR: Nama UCP sudah terdaftar di server, silahkan gunakan nama lain"
        })
        return;
      } else if (await CheckAccount("", email, "")) {
        await interaction.editReply({
          content: "ERROR: Email sudah terdaftar di server, silahkan gunakan email lain"
        })
        return;
      } else if (await CheckAccount("", "", user.id)) {
        await interaction.editReply({
          content: `Sepertinya Anda sudah pernah mendaftar sebelumnya, UCP ${CheckAccount(user.id)} sudah terkaitkan dengan akun Discord Anda`
        });
        return;
      } else {
        const success = await Register(username, email, user.id);
        if (success) {
          await interaction.editReply({
            content: `SUCCESS: Berhasil mendaftarkan akun UCP ${username}, silahkan cek email yang anda masukkan untuk verifikasi akun Anda`
          });
        } else {
          await interaction.editReply({
            content: "ERROR: Gagal mendaftarkan akun UCP"
          });
        }
      }
    } catch (error) {
      errorHandler("register command", error);
    }
  }
};

export default register;