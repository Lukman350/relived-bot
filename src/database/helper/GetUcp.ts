import { connection } from "..";

const getUcpFromDiscordID = async (discordID: string): Promise<string> => {
  let ucp:string;

  const [rows]: Array<any> = await connection.promise().execute(
    "SELECT `Username` FROM `accounts` WHERE `DiscordID` = ? LIMIT 1",
    [discordID]
  );

  if (rows.length > 0) {
    ucp = rows[0].Username;
  } else {
    ucp = "";
  }

  return ucp;
}

export default getUcpFromDiscordID;