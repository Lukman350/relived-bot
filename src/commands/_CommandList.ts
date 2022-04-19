import { Command } from "../interfaces/Command";
import register from "./register";
import help from "./help";
import whitelist from "./whitelist";
import setstory from "./setstory";
import updatediscorducp from "./updatediscorducp";
import getuserinfo from "./getuserinfo";
import botinfo from "./botinfo";
import quote from "./quote";
import urban from "./urban";
import dog from "./dog";
import cat from "./cat";

export const CommandList: Command[] = [
  register,
  help,
  whitelist,
  setstory,
  updatediscorducp,
  getuserinfo,
  botinfo,
  quote,
  urban,
  dog,
  cat
];