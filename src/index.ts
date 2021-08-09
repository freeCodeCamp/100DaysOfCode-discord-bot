import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { validateEnv } from "./utils/validateEnv";
import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { onReady } from "./events/onReady";
import { onMessage } from "./events/onMessage";
import { IntentOptions } from "./config/IntentOptions";

(async () => {
  validateEnv();

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
      new RewriteFrames({
        root: global.__dirname,
      }),
    ],
  });

  const BOT = new Client({ intents: IntentOptions });

  BOT.on("ready", async () => await onReady());

  BOT.on("message", async (message) => await onMessage(message, BOT));

  await connectDatabase();

  await BOT.login(process.env.BOT_TOKEN as string);
})();
