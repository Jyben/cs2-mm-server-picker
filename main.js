const { app, BrowserWindow } = require('electron');
const path = require('path');
const glob = require('glob');
const ServersService = require('./app/services/servers');
const { Clusters } = require('./app/models/clusters');
const PingWrapper = require('./app/main-process/ping');
const { autoUpdater } = require('electron-updater');
const logE = require('electron-log');
const Files = require('./app/main-process/util');
const log = require('./app/main-process/log');
const AliveService = require('./app/services/alive');

let win;

function initialize() {

  loadMainFiles();
  imAlive();

  function createWindow() {
    win = new BrowserWindow({ show: false, width: 1200, height: 475, webPreferences: { nodeIntegration: true }, resizable: false });
    win.loadFile('./index.html');

    win.setMenuBarVisibility(false);

    win.on('closed', () => {
      win = null;
    });

    win.once('ready-to-show', () => {
      win.show();
      getServersFile();
      getUpdate();
      win.webContents.send('version', [app.getVersion()]);
    });
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
}

async function getServersFile() {

  win.webContents.send('spinner', [true]);

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

function loadMainFiles() {
  try {
    new Files().create();
    const files = glob.sync(path.join(__dirname, './app/main-process/*.js'));

    files.forEach((file) => { require(file) });
  } catch (error) {
    log.error(error.stack);
  }
}

function getUpdate() {
  logE.transports.file.level = "debug";
  autoUpdater.logger = logE;
  autoUpdater.checkForUpdatesAndNotify();
}

function imAlive() {
  try {
    new AliveService().postImalive();
  } catch (error) {
    log.error(error.stack);
  }
}

initialize();