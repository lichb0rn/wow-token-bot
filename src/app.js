require('dotenv').config();

const config = require('./config');
const AuthClient = require('./bnet/auth');
const WoWAPI = require('./bnet/api');
const Discord = require('./discord/discord');
const price = require('./commands/price');

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const BNET_CLIENT_ID = process.env.BNET_CLIENT_ID;
const BNET_SECRET = process.env.BNET_SECRET;

if (!DISCORD_BOT_TOKEN || !BNET_CLIENT_ID || !BNET_SECRET) {
  throw new Error('Discord or battle.net environment variables are not defined');
}

const authOptions = {
  clientId: BNET_CLIENT_ID,
  secret: BNET_SECRET,
};

const auth = new AuthClient(authOptions);
const api = new WoWAPI(auth, config);

const priceCommand = price(async () => {
  const { price, time } = await api.getCurrentTokenPrice();
  return `Current token price: ${price} gold.\nLast update was: ${time}`;
});

const discord = new Discord({ token: DISCORD_BOT_TOKEN }, [priceCommand]);
discord.login();
