import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";
import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_CommandList";
import { Client } from "discord.js";
import getServerStatus from "../database/helper/getServerStatus";

export const onReady = async (BOT: Client): Promise<void> => {
  try {
    const rest = new REST({ version: "9" }).setToken(
      process.env.BOT_TOKEN as string
    );

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach((command) =>
      commandData.push(
        command.data.toJSON() as {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        }
      )
    );
    await rest.put(
      Routes.applicationGuildCommands(
        BOT.user?.id || "missing token",
        process.env.GUILD_ID as string
      ),
      { body: commandData }
    );

    setInterval(async () => {
      await getServerStatus().then(async (data: any) => {
        BOT.user?.setPresence({
          activities: [
            {
              name: `${data.hostname}\nGamemode: ${data.gamemode}\nPlayers: ${data.online} / ${data.maxplayers}\nVersion: ${data.rules.version}\nWebsite: ${data.rules.weburl}`,
              type: "PLAYING",
            },
          ],
          status: "online",
        });
      }).catch(async (err) => {
        BOT.user?.setPresence({
          activities: [
            {
              name: `Error getting server status: ${err}`,
              type: "PLAYING",
            },
          ],
          status: "online",
        });
      });
    }, 90000);

    logHandler.log("info", "Bot has connected to Discord!");
  } catch (err) {
    errorHandler("onReady event", err);
  }
};