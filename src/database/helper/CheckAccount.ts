import { connection } from "..";

const CheckAccount = async (username: string = "", email: string = "", discordID: string = "") => {
  let isExists;
  if (username !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT ID FROM accounts WHERE Username = ?`,
      [username]
    );
    
    isExists = rows.length > 0;
    return isExists;
  } else if (email !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT ID FROM accounts WHERE Email = ?`,
      [email]
    );
    
    isExists = rows.length > 0;
    return isExists;
  } else if (discordID !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT Username FROM accounts WHERE DiscordID = ?`,
      [discordID]
    );
    
    isExists = rows.length > 0;

    if (isExists) return rows[0].Username;
    else return isExists;
  }
}

export default CheckAccount;