import { connection } from "..";
import sendMail from "../../config/mailer";
import { errorHandler } from "../../utils/errorHandler";

const getRandomVerifyCode = async () => {
  let rand = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  let code = `RRP-${rand}`;
  return code;
}

const Register = async (username: string, email: string, userDiscord: string) => {
  return await new Promise(async (resolve, reject) => {
    const registerDate = Math.floor(Date.now() / 1000);
  
    const verifyCode = await getRandomVerifyCode();
  
    await sendMail(email, verifyCode, username).then(async () => {
      const [rows]: Array<any> = await connection.promise().execute(
        `INSERT INTO accounts (Username, Password, Salt, RegisterDate, VerifyCode, WhiteList, Email, DiscordID) VALUES (?, 'None', 'None', ?, ?, '1', ?, ?)`,
        [username, registerDate, verifyCode, email, userDiscord]
      );
    
      if (rows.affectedRows) {
        resolve(true);
      } else {
        reject(false);
      }
    }).catch(err => {
      errorHandler("register helper", err);
      reject(err);
    });
  });
}

export default Register;