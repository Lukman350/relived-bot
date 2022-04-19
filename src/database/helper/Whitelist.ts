import { connection } from "..";

const Whitelist = async (username: string) => {
  return await new Promise(async (resolve, reject) => {
    const [alreadyWhitelisted]: Array<any> = await connection.promise().execute(  
      "SELECT `WhiteList` FROM `accounts` WHERE `Username` = ? LIMIT 1",
      [username]
    );

    if (!alreadyWhitelisted.length) {
      reject(false);
    } else {
      if (alreadyWhitelisted[0].WhiteList === 1) {
        reject(false);
      } else {
        const [rows]: Array<any> = await connection.promise().execute(
          "UPDATE `accounts` SET `WhiteList` = '1' WHERE `Username` = ?",
          [username]
        );
    
        if (rows.affectedRows) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    }
  });
}

export default Whitelist;