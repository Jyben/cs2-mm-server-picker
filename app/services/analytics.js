const Axios = require('axios');

let AnalyticsService = function () { }

AnalyticsService.prototype.postImalive = async function (version) {
  try {
    await Axios({
      url: `https://jyben.dev/api/imalive`,
      method: 'post',
      headers: {
        Application: 'csgo-mm-server-picker',
        Version: version
      }
    });
  } catch (error) { } // Do nothing 
}

AnalyticsService.prototype.getMessage = async function () {
  try {
    return await Axios({
      url: `http://jyben.dev/api/message`,
      method: 'get',
      headers: {
        Application: 'csgo-mm-server-picker'
      }
    });
  } catch (error) { } // Do nothing 
}

module.exports = AnalyticsService;