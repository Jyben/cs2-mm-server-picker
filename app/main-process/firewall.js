const { app } = require('electron');
const sudo = require('sudo-prompt');
const { Clusters } = require('../models/clusters');
const PingWrapper = require('./ping');
const ServersService = require('../services/servers');
const Files = require('./util');
const log = require('./log');
const Darwin = require("../services/darwin");

let Firewall = function (win, clusters) {
  this._clusters = clusters;
  this._win = win;
  this._darwin = new Darwin(this._win, _execBash);
}

Firewall.prototype.exec = function (ipList) {
  const multipleIp = ipList.join();

  switch (process.platform) {
    case 'win32':
      _execBash(`netsh advfirewall firewall add rule name="csgo-mm-server-picker" dir=out action=block remoteip=${multipleIp}`, this._win);
      break;

    case 'linux':
      _execBash(`iptables -A INPUT -s ${multipleIp} -j DROP`, this._win);
      break;

    case 'darwin':
      this._darwin.block(ipList);
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
      let command = '';

      this._clusters.clustersId.forEach(id => {

        this._clusters.pops[id].relayAddresses.forEach(relayAddresse => {
          this._clusters.pops[id].relayAddresses.splice(this._clusters.pops[id].relayAddresses.indexOf(relayAddresse), 1, relayAddresse.split(':')[0]);
        });

        this._clusters.pops[id].relayAddresses.forEach(addresse => {
          command += `iptables -D INPUT -s ${addresse} -j DROP\n`;
        });
      });

      command = `#!/bin/bash\n${command}`;

      new Files().create(command);

      _execBash(`sh ${app.getPath('home')}/csgo-mm-server-picker/ipRules.sh`, this._win);
      break;

    case 'darwin':
      this._darwin.reset();
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
      _ping(win);
      if (stderr !== '' && stderr !== undefined && !stderr.toUpperCase().includes('BAD RULE')) {
        log.error(`stderr: ${stderr}`);
      }
    }
  );
}

function _ping(win) {
  const request = async () => {
    return new ServersService().getServersList();
  }

  request().then((response) => {
    const clusters = new Clusters(response.data);
    clusters.convert();

    const ping = new PingWrapper(clusters, win);
    ping.execute();
  }).catch((error) => {
    log.error(error.stack);
  });
}

module.exports = Firewall;
