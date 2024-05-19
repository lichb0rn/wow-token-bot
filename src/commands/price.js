const { SlashCommandBuilder } = require('discord.js');

const price = (cb) => {
  return {
    data: new SlashCommandBuilder()
      .setName('price')
      .setDescription('Replies with the current token price'),
    async execute(interaction) {
      const answer = await cb();
      await interaction.reply(answer);
    },
  };
};

module.exports = price;
