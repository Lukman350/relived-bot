import { connection } from "..";

const Whitelist = async (username: string) => {
  let success: boolean = false;

  const [alreadyWhitelisted]: Array<any> = await connection.promise().execute(  
    `SELECT * FROM accounts WHERE Username = ? AND WhiteList = '1'`,
    [username]
  );

  if (alreadyWhitelisted.length) {
    success = false;
  } else {
    const [rows]: Array<any> = await connection.promise().execute(
      `UPDATE accounts SET WhiteList = '1' WHERE Username = ?`,
      [username]
    );

    if (rows.affectedRows) {
      success = true;
    } else {
      success = false;
    }
  }

  return success;
}

export default Whitelist;