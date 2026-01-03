export interface EldoradoOrder {
  id: string;
  status: string;
  createdAt: string;
  amount: number;
  currency: string;
  product?: string;
  buyerUsername?: string;
  // Add more fields based on actual API response
}

export interface BotConfig {
  discordBotToken: string;
  discordUserId: string;
  eldoradoApiKey: string;
  eldoradoApiUrl: string;
  pollInterval: number;
}
