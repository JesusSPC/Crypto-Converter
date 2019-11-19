const request = require("request");
const http = require("http");
const url = require("url");
const cryptocoin = require("./Cryptocoin.js");

exports.Server = class {
  constructor(port){
    this.port = port;
    this.coins = [];
    
    http
      .createServer((req, res) => {
        const urlQuery = url.parse(req.url, true).query;
        const coin1Name = urlQuery.from;
        const coin2Name = urlQuery.to;
    
        let coin1 = undefined;
        let coin2 = undefined;
    
        this.coins.forEach(coin => {
          if (coin.id === coin1Name) {
            coin1 = coin;
          } else if (coin.id === coin2Name) {
            coin2 = coin;
          }
        });
    
        res.writeHead(200, { "Content-Type": "text/plain" });
        if (coin1 && coin2) {
          const conversionFactor = coin1.convertTo(coin2);
          res.end(`${coin1.name} costs ${conversionFactor} ${coin2.name}s`);
        } else {
          res.end("We could not find such coins.");
        }
      })
      .listen(this.port);

      const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        headers: {
            'X-CMC_PRO_API_KEY': `${process.env.COINMARKETCAP_API}`
        },
        json: true,
        gzip: true
      };

      request(requestOptions, (err, request_res, body) => {
        if (err) throw err;
        
        let coin_data = body.data;
          console.log(coin_data);
        coin_data.forEach((coin) => this.coins.push(new cryptocoin.Cryptocoin(coin.slug, coin.name, coin.quote.USD.price)));
        });
  }
}

