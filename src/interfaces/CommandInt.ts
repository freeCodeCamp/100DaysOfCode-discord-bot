import { Message } from "discord.js";

export interface CommandInt {
  name: string;
  desc: string;
  hidden?: boolean;
  run: (message: Message) => Promise<void>;
}
