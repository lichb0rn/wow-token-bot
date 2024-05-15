require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.Client, (readyClient) => {
  console.log('Ready for action');
});

client.login(DISCORD_BOT_TOKEN);
