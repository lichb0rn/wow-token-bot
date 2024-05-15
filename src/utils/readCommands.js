const fs = require('node:fs');
const path = require('node:path');

const readCommands = (commandsFolder) => {
  const commands = [];
  const foldersPath = path.join(...commandsFolder);
  const commandsFolders = fs.readdirSync(foldersPath);

  for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ('data' in command && 'execute' in command) {
        commands.push(command);
      } else {
        console.warn(`The command at ${filePath} is missing`);
      }
    }
  }
  return commands;
};

module.exports.readCommands = readCommands;
