const DEFAULT_LOCALE = 'en_US';
const regions = require('./regions');
const { formatPrice, formatDate } = require('./utils');

class WoWAPI {
  constructor(authClient, options) {
    this.authClient = authClient;
    this.options = options;
  }

  async getCurrentTokenPrice() {
    const tokenIndex = '/data/wow/token/index';
    const json = await this.request(tokenIndex);
    const timestamp = json['last_updated_timestamp'];
    const rawTokenValue = json['price'];

    const price = formatPrice(rawTokenValue);
    const time = formatDate(timestamp, { locale: this.options.locale, tz: this.options.timezone });

    return { price, time };
  }

  async request(index) {
    const token = await this.authClient.getToken();
    const url = this.getURL(index, token);
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(data.statusText);
      }
      const result = await data.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  getURL(index, token) {
    const { endpoint, namespace, loc } = this.getParams();

    const url = new URL(index, endpoint);
    url.searchParams.set('namespace', namespace);
    url.searchParams.set('locale', loc);
    url.searchParams.set('access_token', token);
    return url;
  }

  getParams() {
    const region = this.options.region;
    const locale = this.options.locale || DEFAULT_LOCALE;

    const endpoint = regions.apiHosts[region];
    const namespace = regions.namespaces[region];
    const loc = regions.locales[locale];

    if (!endpoint || !namespace) {
      throw new Error(`Could not define endpoint/namespace for the region: ${region}`);
    }

    return { endpoint, namespace, loc };
  }
}

module.exports = WoWAPI;
