const Axios = require('axios');

let AliveService = function () { }

AliveService.prototype.postImalive = async function () {
  await Axios({
    url: `https://whoisalive.azurewebsites.net/imalive`,
    method: 'post',
    data: {
      application: 'csgo-mm-server-picker'
    }
  });
}

module.exports = AliveService;