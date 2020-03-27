const Axios = require('axios');

let AliveService = function () { }

AliveService.prototype.postImalive = async function () {
  try {
    await Axios({
      url: `https://whoisalive.azurewebsites.net/imalive`,
      method: 'post',
      data: {
        application: 'csgo-mm-server-picker'
      }
    });
  } catch (error) { } // Do nothing 
}

module.exports = AliveService;