import { connection } from "..";
import sendMail from "../../config/mailer";

const Register = async (username: string, email: string, userDiscord: string) => {
  const registerDate = Math.floor(Date.now() / 1000);

  const getRandomVerifyCode = async () => {
    let rand = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    let code = `RRP-${rand}`;
    return code;
  }

  const verifyCode = await getRandomVerifyCode();

  let success:boolean = false;

  await sendMail(email, verifyCode, username).then(async () => {
    const [rows]: Array<any> = await connection.promise().execute(
      `INSERT INTO accounts (Username, Password, Salt, RegisterDate, VerifyCode, WhiteList, Email, DiscordID) VALUES (?, 'None', 'None', ?, ?, '1', ?, ?)`,
      [username, registerDate, verifyCode, email, userDiscord]
    );
  
    if (rows.affectedRows) {
      success = true;
    } else {
      success = false;
    }
  }).catch(err => {
    console.log(err);
    success = false;
  });

  return success;
}

export default Register;