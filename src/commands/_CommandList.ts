import { CommandInt } from "../interfaces/CommandInt";
import { edit } from "./edit";
import { help } from "./help";
import { oneHundred } from "./oneHundred";
import { override } from "./override";
import { view } from "./view";

export const CommandList: CommandInt[] = [
  oneHundred,
  view,
  override,
  help,
  edit,
];
