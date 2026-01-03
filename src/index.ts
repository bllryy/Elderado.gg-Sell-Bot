import { Client, GatewayIntentBits, TextChannel, User } from 'discord.js';
import { loadConfig } from './config';
import { EldoradoClient } from './eldoradoClient';
import { EldoradoOrder } from './types';

class EldoradoBot {
  private discordClient: Client;
  private eldoradoClient: EldoradoClient;
  private config: ReturnType<typeof loadConfig>;
  private pollIntervalId?: NodeJS.Timeout;

  constructor() {
    this.config = loadConfig();

    // Initialize Discord client
    this.discordClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
    });

    // Initialize Eldorado API client
    this.eldoradoClient = new EldoradoClient(
      this.config.eldoradoApiKey,
      this.config.eldoradoApiUrl
    );

    this.setupDiscordHandlers();
  }

  private setupDiscordHandlers(): void {
    this.discordClient.once('ready', () => {
      console.log(`✅ Discord bot logged in as ${this.discordClient.user?.tag}`);
      this.startPolling();
    });

    this.discordClient.on('error', (error) => {
      console.error('Discord client error:', error);
    });
  }

  private startPolling(): void {
    console.log(`🔄 Starting to poll Eldorado API every ${this.config.pollInterval / 1000} seconds`);

    // Initial check
    this.checkForNewOrders();

    // Set up interval
    this.pollIntervalId = setInterval(() => {
      this.checkForNewOrders();
    }, this.config.pollInterval);
  }

  private async checkForNewOrders(): Promise<void> {
    try {
      const newOrders = await this.eldoradoClient.checkForNewOrders();

      for (const order of newOrders) {
        await this.sendNotification(order);
      }
    } catch (error) {
      console.error('Error checking for new orders:', error);
    }
  }

  private async sendNotification(order: EldoradoOrder): Promise<void> {
    try {
      const user = await this.discordClient.users.fetch(this.config.discordUserId);

      const message = this.formatOrderMessage(order);
      await user.send(message);

      console.log(`📬 Notification sent for order ${order.id}`);
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
  }

  private formatOrderMessage(order: EldoradoOrder): string {
    const lines = [
      '🎉 **New Purchase on Eldorado.gg!**',
      '',
      `**Order ID:** ${order.id}`,
      `**Status:** ${order.status}`,
      `**Amount:** ${order.amount} ${order.currency}`,
      `**Date:** ${new Date(order.createdAt).toLocaleString()}`,
    ];

    if (order.product) {
      lines.push(`**Product:** ${order.product}`);
    }

    if (order.buyerUsername) {
      lines.push(`**Buyer:** ${order.buyerUsername}`);
    }

    return lines.join('\n');
  }

  async start(): Promise<void> {
    try {
      await this.discordClient.login(this.config.discordBotToken);
    } catch (error) {
      console.error('Failed to start bot:', error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    if (this.pollIntervalId) {
      clearInterval(this.pollIntervalId);
    }
    await this.discordClient.destroy();
    console.log('Bot stopped');
  }
}

// Start the bot
const bot = new EldoradoBot();
bot.start();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await bot.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down...');
  await bot.stop();
  process.exit(0);
});
