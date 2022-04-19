import { connection } from "..";

const UpdateUcp = async (ucp: string, discordId: string) => {
  return await new Promise(async (resolve, reject) => {
    const [isAlreadySet]: Array<any> = await connection.promise().execute(
      "SELECT `DiscordID` FROM `accounts` WHERE `Username` = ?",
      [ucp]
    );

    if (isAlreadySet[0].DiscordID !== null) {
      reject(isAlreadySet[0]);
    } else {
      const [isDiscordIdExist]: Array<any> = await connection.promise().execute(
        "SELECT `DiscordID` FROM `accounts` WHERE `DiscordID` = ?",
        [discordId]
      );

      if (isDiscordIdExist[0].DiscordID !== null) {
        reject("Akun Discord mu sudah pernah mengaitkan akun UCP lain");
      } else {
        const [result]: Array<any> = await connection.promise().execute(
          "UPDATE `accounts` SET `DiscordID` = ? WHERE `Username` = ?",
          [discordId, ucp]
        );

        if (result.affectedRows) {
          resolve(true);
        } else {
          reject(
            new Error(`Failed to update DiscordID for UCP ${ucp} to ${discordId}`)
          );
        }
      }
    }
  });
};

export default UpdateUcp;