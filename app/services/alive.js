const Axios = require('axios');

let AliveService = function () { }

AliveService.prototype.postImalive = async function (version) {
  try {
    await Axios({
      url: `https://whoisalive.azurewebsites.net/imalive`,
      method: 'post',
      data: {
        application: 'csgo-mm-server-picker',
        version: version
      }
    });
  } catch (error) { } // Do nothing 
}

module.exports = AliveService;