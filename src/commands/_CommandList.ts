import { CommandInt } from "../interfaces/CommandInt";
import { edit } from "./edit";
import { help } from "./help";
import { oneHundred } from "./oneHundred";
import { reset } from "./reset";
import { view } from "./view";

export const CommandList: CommandInt[] = [oneHundred, view, help, edit, reset];
