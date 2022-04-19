// @ts-ignore:7016
import query from "samp-query";

const getServerStatus = async (): Promise<void> => {
  return await new Promise(async (resolve, reject) => {
    await query({
      host: "15.235.140.64",
      port: "7777",
    }, (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

export default getServerStatus;