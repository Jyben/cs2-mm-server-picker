import PingWrapper from './ping';
import ServersService from '../services/servers';
import Clusters from '../models/clusters';
import Firewall from './firewall';

const { ipcMain, BrowserWindow } = require('electron');

// Exécute un ping ordonné par l'utilisateur
ipcMain.on('request-ping', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  
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
});

ipcMain.on('request-block-firewall', (event, ipList) => {
  const firewall = new Firewall(ipList);
  firewall.exec();
});

ipcMain.on('request-reset-firewall', (event) => {
  const request = async () => {
    return new ServersService().getServersList();
  }

  request().then((response) => {
    const clusters = new Clusters(response.data);
    clusters.convert();

    clusters.clustersId.forEach(id => {

      clusters.pops[id].relayAddresses.forEach(relayAddresse => {
        clusters.pops[id].relayAddresses.splice(clusters.pops[id].relayAddresses.indexOf(relayAddresse), 1, relayAddresse.split(':')[0]);
      });

      if (process.platform == 'linux') {
        new Firewall(clusters.pops[id].relayAddresses).reset();
      }
    });

    if (process.platform == 'win32') {
      new Firewall().reset();
    }

  }).catch((error) => {
    console.log(error);
  });
});
