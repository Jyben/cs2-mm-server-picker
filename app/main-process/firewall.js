const sudo = require('sudo-prompt');
const { Clusters } = require('../models/clusters');
const PingWrapper = require('./ping');
const ServersService = require('../services/servers');

let Firewall = function (win, clustersId, clusters) {
  this._clustersId = clustersId;
  this._clusters = clusters;
  this._win = win;
}

Firewall.prototype.exec = function (ipList) {
  const multipleIp = ipList.join();

  // this.reset();

  switch (process.platform) {
    case 'win32':
      _execBash(`netsh advfirewall firewall add rule name="csgo-mm-server-picker" dir=out action=block remoteip=${multipleIp}`, this._win);
      break;

    case 'linux':
      _execBash(`iptables -A INPUT -s ${multipleIp} -j DROP`, this._win);
      break;

    case 'darwin':

      break;

    default:
      break;
  }
}

Firewall.prototype.reset = function () {
  switch (process.platform) {
    case 'win32':
      _execBash(`netsh advfirewall firewall delete rule name="csgo-mm-server-picker"`, this._win);
      break;

    case 'linux':
      let multipleIp

      this._clusters.clustersId.forEach(id => {

        this._clusters.pops[id].relayAddresses.forEach(relayAddresse => {
          this._clusters.pops[id].relayAddresses.splice(this._clusters.pops[id].relayAddresses.indexOf(relayAddresse), 1, relayAddresse.split(':')[0]);
        });

        multipleIp += this._clusters.pops[id].relayAddresses.join();
      });

      let command = `iptables -D INPUT -s ${multipleIp} -j DROP`;

      _execBash(command, this._win);
      break;

    case 'darwin':

      break;

    default:
      break;
  }
}

function _execBash(command, win) {
  const options = {
    name: 'csgommserverpicker'
  };

  sudo.exec(command, options,
    function (error, stdout, stderr) {
      ping(win);
      console.log('stderr: ' + stderr);
    }
  );
}

function ping(win) {
  const request = async () => {
    return new ServersService().getServersList();
  }

  request().then((response) => {
    const clusters = new Clusters(response.data);
    clusters.convert();

    const ping = new PingWrapper(clusters, win);
    ping.execute();
  }).catch((error) => {
    console.log(error);
  });
}

module.exports = Firewall;