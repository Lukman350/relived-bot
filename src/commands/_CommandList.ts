import { Command } from "../interfaces/Command";
import register from "./register";
import help from "./help";
import whitelist from "./whitelist";
import setstory from "./setstory";

export const CommandList: Command[] = [register, help, whitelist, setstory];