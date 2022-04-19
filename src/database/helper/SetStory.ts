import { connection } from "..";

const SetStory = async (character: string) => {
  return await new Promise(async (resolve, reject) => {
    const [isAlreadySet]: Array<any> = await connection.promise().execute(
      "SELECT `Story` FROM `characters` WHERE `Character` = ?",
      [character]
    );

    if (isAlreadySet[0].Story) {
      reject(false);
    } else {
      const [result]: Array<any> = await connection.promise().execute(
        "UPDATE `characters` SET Story = '1' WHERE `Character` = ?",
        [character]
      )

      if (result.affectedRows) {
        resolve(true);
      } else {
        reject(false);
      }
    }
  });
}

export default SetStory;