import dotenv from 'dotenv';
import { BotConfig } from './types';

dotenv.config();

export function loadConfig(): BotConfig {
  const requiredVars = [
    'DISCORD_BOT_TOKEN',
    'DISCORD_USER_ID',
    'ELDORADO_API_KEY',
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }

  return {
    discordBotToken: process.env.DISCORD_BOT_TOKEN!,
    discordUserId: process.env.DISCORD_USER_ID!,
    eldoradoApiKey: process.env.ELDORADO_API_KEY!,
    eldoradoApiUrl: process.env.ELDORADO_API_URL || 'https://api.eldorado.io/api',
    pollInterval: parseInt(process.env.POLL_INTERVAL || '300000', 10),
  };
}
