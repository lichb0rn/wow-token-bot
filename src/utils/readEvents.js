const fs = require('node:fs');
const path = require('node:path');

const readEvents = (eventsFolder) => {
  const events = [];
  const eventsPath = path.join(...eventsFolder);
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if ('name' in event && 'execute' in event) {
      events.push(event);
    } else {
      console.warn(`The event at ${filePath} is missing`);
    }
  }
  return events;
};

module.exports.readEvents = readEvents;
