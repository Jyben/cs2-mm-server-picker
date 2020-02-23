const Axios = require('axios');

let ServersService = function () { }
let serversList = null;

ServersService.prototype.getServersList = function () {
  if (serversList === null) {
    serversList = Axios({
      url: `https://raw.githubusercontent.com/SteamDatabase/SteamTracking/master/Random/NetworkDatagramConfig.json`,
      method: 'get'
    })
  }

  return serversList;

}

module.exports = ServersService;