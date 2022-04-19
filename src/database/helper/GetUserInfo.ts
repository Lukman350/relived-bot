import { connection } from "..";

const GetUserInfo = async (UCP: string) => {
  return await new Promise(async (resolve, reject) => {
    const [result]: Array<any> = await connection.promise().execute(
      "SELECT `ID`, `Username`, `Email`, `RegisterDate`, `DiscordID` FROM `accounts` WHERE `Username` = ? LIMIT 1",
      [UCP]
    );

    if (result.length) resolve(result[0]);
    else reject(new Error(`Akun UCP ${UCP} tidak terdaftar`));
  });
}

export default GetUserInfo;