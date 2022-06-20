const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const glob = require('glob');
const ServersService = require('./app/services/servers');
const { Clusters } = require('./app/models/clusters');
const PingWrapper = require('./app/main-process/ping');
const { autoUpdater } = require('electron-updater');
const logE = require('electron-log');
const Files = require('./app/main-process/util');
const log = require('./app/main-process/log');
const AnalyticsService = require('./app/services/analytics');
const { exec } = require('child_process');

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
      getMessage();
      getFirewallStatusOnWindows();
      win.webContents.send('version', [app.getVersion()]);
    });
  }

  app.allowRendererProcessReuse = true;

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
  logE.transports.file.level = 'debug';
  autoUpdater.logger = logE;
  autoUpdater.checkForUpdatesAndNotify();
}

function imAlive() {
  try {
    new AnalyticsService().postImalive(app.getVersion());
  } catch (error) {
    log.error(error.stack);
  }
}

async function getMessage() {
  try {
    var result = await new AnalyticsService().getMessage();

    if (result === undefined || result.data === undefined || result.data.message === undefined) {
      return;
    }

    const options = {
      type: 'info',
      buttons: ['Ok'],
      defaultId: 2,
      title: result.data.message.title,
      message: result.data.message.content,
    };

    var response = dialog.showMessageBox(null, options);
    response.then(() => {
      if (result.data.message.action !== undefined && result.data.message.action.type === "url") {
        shell.openExternal(result.data.message.action.content);
      }
    });

  } catch (error) {
    log.error(error.stack);
  }
}

function getFirewallStatusOnWindows() {
  var cmd = "Invoke-Command -ScriptBlock {[Microsoft.Win32.RegistryKey]::OpenRemoteBaseKey(\"LocalMachine\",$env:COMPUTERNAME).OpenSubKey(\"System\\CurrentControlSet\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\StandardProfile\").GetValue(\"EnableFirewall\")}";

  if (process.platform !== 'win32') {
    return;
  }

  try {
    exec(cmd, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
      if (stdout != 1) {
        win.webContents.send('enableFirewallMessage');
      }
    });
  } catch (error) {
    log.error(error.stack);
  }
}

initialize();