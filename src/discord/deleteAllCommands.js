require('dotenv').config();

const { REST, Routes } = require('discord.js');

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

if (!clientId || !guildId || !token) {
  throw new Error('Credentials environment varibales are not defined');
}

const rest = new REST().setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

rest
  .put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);
