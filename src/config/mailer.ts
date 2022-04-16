import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
}));

const sendMail = async (email: string, code: string, username: string) => {
  return new Promise(async (resolve, reject) => {
    const html = `
      <table>
        <thead style='background-color: red; color: white'>
          <tr>
            <th>
              <h1 style='color: white;'>Relived Roleplay</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style='color: black; margin: 10px'>
                <p>Untuk: <b>${username}</b></p>
                <p>Terimakasih telah mendaftar di server kami, berikut adalah informasi akun Anda:</p>
                <p>UCP: <b>${username}</b></p>
                <p>Email: <b>${email}</b></p>
                <p>Verify Code: <b>${code}</b></p>
                <p>Silahkan login ke game menggunakan nama UCP yang didaftarkan untuk membuat password akun Anda serta memasukkan kode verifikasi diatas.</p>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div style='color: #8e8e8e; text-align: center; font-size: 1em'>
                Copyright &copy; ${new Date().getFullYear()} Relived Roleplay. All rights reserved.
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  
    const options = {
      from: `Relived Roleplay <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "RRP - UCP Registration",
      html
    };
  
    await transporter.sendMail(options, async (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

export default sendMail;

