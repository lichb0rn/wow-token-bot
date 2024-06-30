# World of Warcraft discord bot

## Setup

### Getting tokens

For the bot to work you need to get all tokens and ids from appropriate developer portals:

- Battle.net:
  - <https://develop.battle.net>
  - Battle.net client id
  - Battle.net secret key
- Discord:
  - <https://discord.com/developers>
  - Discord bot token
  - Discrod app id
  - Discrod guild id

## Run

On the first run you should deploy bot commands: `npm run deploy`

Now you can start the container: `docker compose up`

After that you will have `/price` command on your discord server.
