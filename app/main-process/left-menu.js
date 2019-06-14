const PingWrapper = require('./ping');
const ServersService = require('../services/servers');
const { Clusters } = require('../models/clusters');
const Firewall = require('./firewall');
const { ipcMain, BrowserWindow } = require('electron');

// Exécute un ping ordonné par l'utilisateur
ipcMain.on('request-ping', (event) => {
  ping(event);
});

ipcMain.on('request-block-firewall', (event, ipList) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.send('spinner', [true]);
  win.webContents.send('reset-worldmap-iplist');

  const firewall = new Firewall(win);
  firewall.exec(ipList);
});

ipcMain.on('request-reset-firewall', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.send('spinner', [true]);
  win.webContents.send('reset-worldmap-iplist');

  const request = async () => {
    return new ServersService().getServersList();
  }

  request().then((response) => {
    const clusters = new Clusters(response.data);
    clusters.convert();

    if (process.platform === 'linux') {
      new Firewall(win, clusters.clustersId, clusters).reset();
    }

    if (process.platform === 'win32') {
      new Firewall(win).reset();
    }
  }).catch((error) => {
    console.log(error);
  });
});

function ping(event) {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.send('spinner', [true]);
  win.webContents.send('reset-worldmap-iplist');

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
