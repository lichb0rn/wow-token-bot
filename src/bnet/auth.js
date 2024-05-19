class AuthClient {
  constructor(options) {
    this.options = options;
    this.token = null;
    this.expiration = null;
  }

  async getToken() {
    if (this.token && !this.isTokenExpired) {
      return this.token;
    } else {
      await this.authenticate();
      return this.token;
    }
  }

  async authenticate() {
    const { clientId, secret } = this.options;
    try {
      const data = await fetch(`https://oauth.battle.net/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + secret,
      });
      const json = await data.json();
      this.token = json['access_token'];
      const expirationTime = json['expires_in'];
      const now = new Date();
      this.expiration = new Date(+now + expirationTime * 1000);
    } catch (error) {
      console.error(error);
    }
  }

  isTokenExpired() {
    const now = new Date();
    return now > this.expiration;
  }
}

module.exports = AuthClient;
