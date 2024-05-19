require('dotenv').config();

const { REST, Routes } = require('discord.js');
const price = require('./commands/price');

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

if (!clientId || !guildId || !token) {
  throw new Error('Credentials environment varibales are not defined');
}

const priceCommand = price();
const json = [priceCommand.data.toJSON()];

const rest = new REST().setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: json });
    console.log('Successfully registered commands');
  } catch (error) {
    console.error(error);
  }
})();
