import Axios from "axios";

export default class ServersService {

  getServersList() {
    return Axios({
      url: `https://raw.githubusercontent.com/SteamDatabase/SteamTracking/master/Random/NetworkDatagramConfig.json`,
      method: 'get'
    });
  }
}