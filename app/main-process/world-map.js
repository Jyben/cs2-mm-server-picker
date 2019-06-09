const { ipcMain, BrowserWindow } = require('electron');

// Constitue la liste des IP à bannir lors des clique sur les boutons
ipcMain.on('add-cluster-in-ip-rules', (event, arg) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  let id = arg[0];
  let hostList = arg[1];
  let result = hostList.filter(host => host.continentId === id);
  let ipList = [];

  hostList.forEach(host => {
    ipList.push(host.ip);
  });

  win.webContents.send('add-specific-servers', [result, ipList, hostList]);
});