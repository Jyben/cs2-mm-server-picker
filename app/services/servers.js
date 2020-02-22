const Axios = require('axios');

let ServersService = function () { }

ServersService.prototype.getServersList = function () {
  return Axios({
    url: `https://raw.githubusercontent.com/SteamDatabase/SteamTracking/master/Random/NetworkDatagramConfig.json`,
    method: 'get'
  });
}

module.exports = ServersService;