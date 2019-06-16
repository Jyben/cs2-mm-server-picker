const { app, BrowserWindow } = require('electron');
const path = require('path');
const glob = require('glob');
const ServersService = require('./app/services/servers');
const { Clusters } = require('./app/models/clusters');
const PingWrapper = require('./app/main-process/ping');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let win;

function initialize() {

  loadMainFiles();

  function createWindow() {
    // Créer le browser window.
    win = new BrowserWindow({ show: false, width: 1200, height: 475, webPreferences: { nodeIntegration: true } });

    // et charge le index.html de l'application.
    win.loadFile('./index.html');

    // Ouvre les DevTools.
    win.webContents.openDevTools();

    win.setMenuBarVisibility(false);

    // Émit lorsque la fenêtre est fermée.
    win.on('closed', () => {
      // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
      // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
      // où vous devez supprimer l'élément correspondant.
      win = null;
    });

    win.once('ready-to-show', () => {
      win.show();
      getServersFile();
      getUpdate();
      win.webContents.send('version', [app.getVersion()]);
    });
  }

  // Cette méthode sera appelée quant Electron aura fini
  // de s'initialiser et sera prêt à créer des fenêtres de navigation.
  // Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
  app.on('ready', createWindow);

  // Quitte l'application quand toutes les fenêtres sont fermées.
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
    console.log(error);
  });
}

function loadMainFiles() {
  try {
    const files = glob.sync(path.join(__dirname, './app/main-process/*.js'));

    files.forEach((file) => { require(file) });
  } catch (error) {
    console.log(error);
  }
}

function getUpdate() {
  log.transports.file.level = "debug";
  autoUpdater.logger = log;
  autoUpdater.checkForUpdatesAndNotify();
}

initialize();