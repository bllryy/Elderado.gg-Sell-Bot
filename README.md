# Eldorado.gg Discord Notification Bot

A TypeScript Discord bot that sends you direct messages when someone makes a purchase on your Eldorado.gg store.

## Features

- Polls the Eldorado API for new orders (configurable interval)
- Sends Discord DM notifications for new purchases
- TypeScript for type safety
- Easy configuration via environment variables

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Discord Bot Token** - [Create a Discord Bot](#creating-a-discord-bot)
3. **Eldorado API Key** - [Get API Access](#getting-eldorado-api-access)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
DISCORD_USER_ID=your_discord_user_id_here
ELDORADO_API_KEY=your_eldorado_api_key_here
ELDORADO_API_URL=https://api.eldorado.io/api
POLL_INTERVAL=300000
```

**Configuration Details:**
- `DISCORD_BOT_TOKEN`: Your Discord bot token
- `DISCORD_USER_ID`: Your Discord user ID (the bot will DM you)
- `ELDORADO_API_KEY`: Your Eldorado API key
- `ELDORADO_API_URL`: Eldorado API base URL (default: https://api.eldorado.io/api)
- `POLL_INTERVAL`: How often to check for new orders in milliseconds (default: 300000 = 5 minutes)

### 3. Build and Run

```bash
# Build TypeScript
npm run build

# Run the bot
npm start

# Or run in development mode
npm run dev
```

## Creating a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" tab and click "Add Bot"
4. Under "Token", click "Reset Token" and copy it to your `.env` file
5. Enable "MESSAGE CONTENT INTENT" under "Privileged Gateway Intents"
6. Go to OAuth2 > URL Generator
7. Select scopes: `bot`
8. Select bot permissions: `Send Messages`
9. Copy the generated URL and open it in your browser to invite the bot to your server

### Getting Your Discord User ID

1. Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
2. Right-click your username and select "Copy User ID"
3. Paste this into your `.env` file

## Getting Eldorado API Access

1. Log in to your Eldorado.gg seller account
2. Visit https://www.eldorado.gg/seller-api
3. Follow the instructions to generate an API key
4. Copy the API key to your `.env` file

**Important Notes:**
- Once you have API access, you may need to update the API endpoint in `src/eldoradoClient.ts`
- Check the official Eldorado API documentation for the correct endpoint paths
- The current implementation uses a placeholder endpoint (`/orders`) that needs to be updated

## Project Structure

```
elderado-bot/
├── src/
│   ├── index.ts           # Main bot entry point
│   ├── config.ts          # Configuration loader
│   ├── eldoradoClient.ts  # Eldorado API client
│   └── types.ts           # TypeScript interfaces
├── .env.example           # Example environment variables
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## How It Works

1. Bot connects to Discord using your bot token
2. Starts polling the Eldorado API at the configured interval
3. When a new order is detected, it sends you a DM with order details
4. Tracks the last seen order to avoid duplicate notifications

## Troubleshooting

### Bot doesn't send messages

- Make sure you've enabled DMs from server members in your privacy settings
- Verify the bot has the correct permissions
- Check that `DISCORD_USER_ID` is correct

### API errors

- Verify your `ELDORADO_API_KEY` is valid
- Check that you have API access enabled on your Eldorado seller account
- Once you have API documentation, update the endpoint in `src/eldoradoClient.ts:22`

### TypeScript compilation errors

```bash
npm run build
```

Check the output for specific errors

## Next Steps

1. **Get Eldorado API Access**: Visit the seller API page and obtain your credentials
2. **Update API Endpoints**: Once you have the official API documentation, update `src/eldoradoClient.ts` with the correct endpoint paths
3. **Customize Notifications**: Modify `formatOrderMessage()` in `src/index.ts` to change how notifications look
4. **Adjust Poll Interval**: Change `POLL_INTERVAL` based on your needs (lower = more frequent checks)

## License

MIT
