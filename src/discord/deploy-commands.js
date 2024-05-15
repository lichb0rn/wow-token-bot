const { REST, Routes } = require('discord.js');
const { readCommands } = require('../utils/readCommands');

require('dotenv').config();

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

if (!clientId || !guildId || !token) {
  throw new Error('Credentials environment varibales are not defined');
}

const commands = readCommands([__dirname, 'commands']);
const json = commands.map((command) => command.data.toJSON());

const rest = new REST().setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: json });
  } catch (error) {
    console.error(error);
  }
})();
