const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('price')
    .setDescription('Replies with the current token price'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
