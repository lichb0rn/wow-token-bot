const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { readEvents } = require('../utils/readEvents');

class Discord {
  constructor(options, commands) {
    this.options = options;
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.commands = new Collection();

    commands.forEach((command) => {
      client.commands.set(command.data.name, command);
    });

    const events = readEvents([__dirname, 'events']);
    events.forEach((event) => {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    });

    this.client = client;
  }

  login() {
    this.client.login(this.options.token);
  }
}

module.exports = Discord;
