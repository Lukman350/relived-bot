import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { MessageEmbed } from "discord.js";
import axios from "axios";
import { trim } from "../utils/any";

const urban: Command = {
  data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("Untuk mencari kata kata di Urban Dictionary")
    .addStringOption(option => option
      .setName("word")
      .setDescription("Kata kata yang ingin dicari")
      .setRequired(true)
    ),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const word = interaction.options.getString("word", true).split(" ");

      await axios.get(`https://api.urbandictionary.com/v0/define?term=${word.join(" ")}`).then(async (response) => {
        const { data } = response;
        const [result] = data.list;

        const urbanEmbed = new MessageEmbed()
          .setColor("#e8c02a")
          .setTitle(`Definition of ${word}`)
          .setURL(result.permalink)
          .addFields(
            { name: "Definition", value: trim(result.definition, 1024) },
            { name: "Example", value: trim(result.example, 1024) },
            { name: "Author", value: result.author },
            { name: "Rating", value: result.thumbs_up + " :thumbsup: " + result.thumbs_down + " :thumbsdown:" }
          )
          .setFooter({
            text: `${result.defid} | ${result.written_on}`,
          });

        await interaction.editReply({
          embeds: [urbanEmbed],
        });
      }).catch(async () => {
        await interaction.editReply({
          content: ":x: Tidak ada kata yang ditemukan",
        });
      });

    } catch (error) {
      errorHandler("urban command", error);
    }
  }
};

export default urban;