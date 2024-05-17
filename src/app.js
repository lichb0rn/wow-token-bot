const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const { readCommands } = require('./utils/readCommands');
const { readEvents } = require('./utils/readEvents');
require('dotenv').config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_BOT_TOKEN) {
  throw new Error('Discord token environment variable is not defined');
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

const commands = readCommands([__dirname, 'discord', 'commands']);
commands.forEach((command) => {
  client.commands.set(command.data.name, command);
});

const events = readEvents([__dirname, 'discord', 'events']);
events.forEach((event) => {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

client.login(DISCORD_BOT_TOKEN);
