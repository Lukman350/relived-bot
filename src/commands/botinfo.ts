import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { MessageEmbed } from "discord.js";

const botinfo: Command = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Untuk menampilkan informasi bot"),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const botinfoEmbed = new MessageEmbed()
        .setColor("#e8c02a")
        .setTitle("Informasi Bot")
        .setDescription(
          `
          Versi: 1.5.0
          Terakhir diupdate: 19 April 2022
          Dibuat oleh: @Lukman#6677

          Credits:
          - **discordjs** for Discord API
          - **mysql2** for MySQL API
          - **JJJ4n** for SA-MP Query API
          - **nodemailer** for mailer
          `
        )
        .setThumbnail("https://cdn.discordapp.com/icons/914691384345239592/a_63d5fde381cb34664516332e190c8b84.webp?size=96")
        .setFooter({
          text: "Copyright © 2022 Relived Roleplay",
          iconURL: "https://cdn.discordapp.com/icons/914691384345239592/a_63d5fde381cb34664516332e190c8b84.webp?size=96",
        });
      
      await interaction.editReply({
        embeds: [botinfoEmbed],
      });
    } catch (error) {
      errorHandler("botinfo command", error);
    }
  }
};

export default botinfo;