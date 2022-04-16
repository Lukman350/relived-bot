import * as Sentry from "@sentry/node";
import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import { RewriteFrames } from "@sentry/integrations";

(async () => {
  validateEnv()
  
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
      new RewriteFrames({
        root: global.__dirname,
      }),
    ],
  } as Sentry.NodeOptions);

  const BOT = new Client({intents: IntentOptions});

  BOT.on("ready", async () => await onReady(BOT));

  BOT.on("interactionCreate", async interaction => await onInteraction(interaction));

  await BOT.login(process.env.BOT_TOKEN as string);
})();