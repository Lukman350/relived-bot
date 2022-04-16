import { connection } from "..";

const CheckAccount = async (username: string = "", email: string = "", discordID: string = "", charName: string = "") => {
  let isExists: boolean;
  if (username !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT ID FROM accounts WHERE Username = ? LIMIT 1`,
      [username]
    );
    
    isExists = rows.length > 0;
    return isExists;
  } else if (email !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT ID FROM accounts WHERE Email = ? LIMIT 1`,
      [email]
    );
    
    isExists = rows.length > 0;
    return isExists;
  } else if (discordID !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT Username FROM accounts WHERE DiscordID = ? LIMIT 1`,
      [discordID]
    );
    
    isExists = rows.length > 0;
    return isExists;
  } else if (charName !== "") {
    const [rows]: Array<any> = await connection.promise().execute(
      `SELECT ID FROM characters WHERE Character = ? LIMIT 1`,
      [charName]
    );
    
    isExists = rows.length > 0;
    return isExists;
  }
}

export default CheckAccount;