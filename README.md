# Eldorado.gg Discord Notification Bot

## **NOTE YOU MIGHT NEED 50 SALES FOR THIS TO ACTUALLY WORK**
1. You can send a email to the support team and try to get access.

A TypeScript Discord bot that sends you direct messages when someone makes a purchase on your Eldorado.gg store.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Discord Bot Token** - [Create a Discord Bot](#creating-a-discord-bot)
3. **Eldorado API Key** - [Get API Access](#getting-eldorado-api-access)
   1. **NOTE YOU MIGHT NEED 50 SALES FOR THIS TO ACTUALLY WORK**

## Setup 

Add the `.env`

```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
DISCORD_USER_ID=your_discord_user_id_here
ELDORADO_API_KEY=your_eldorado_api_key_here
ELDORADO_API_URL=https://api.eldorado.io/api
POLL_INTERVAL=300000
```

### 3. Build and Run

```bash
npm run build
npm start
npm run dev
```

## Creating the Discord Bot

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
5. NOTE YOU MIGHT NEED 50 SALES FOR THIS TO ACTUALLY WORK

**Important Notes:**
- Once you have API access, you may need to update the API endpoint in `src/eldoradoClient.ts`
- Check the official Eldorado API documentation for the correct endpoint paths
- The current implementation uses a placeholder endpoint (`/orders`) that needs to be updated


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
