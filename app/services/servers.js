const Axios = require('axios');

let ServersService = function () { }
let serversList = null;

ServersService.prototype.getServersList = function () {
  if (serversList === null) {
    serversList = Axios({
      url: `https://api.steampowered.com/ISteamApps/GetSDRConfig/v1?appid=730`,
      method: 'get'
    })
  }

  return serversList;

}

module.exports = ServersService;
