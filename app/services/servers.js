const Axios = require('axios');

let ServersService = function () { }
let serversList = null;

ServersService.prototype.getServersList = function () {
  if (serversList === null) {
    serversList = Axios({
      url: `https://steamcdn-a.akamaihd.net/apps/sdr/network_config.json`,
      method: 'get'
    })
  }

  return serversList;

}

module.exports = ServersService;
