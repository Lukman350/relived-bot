import { logHandler } from "./logHandler";

export const validateEnv = (): void => {

  const requiredEnvVars: string[] = [
    "BOT_TOKEN",
    "MYSQL_HOST",
    "MYSQL_USER",
    "MYSQL_DB",
    "SENTRY_DSN"
  ];

  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      logHandler.log("warn", `Missing ${envVar} environment variable`);
      process.exit(1);
    }
  });
};