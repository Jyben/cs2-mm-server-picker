import { app, BrowserWindow } from 'electron';
import path from 'path';
import glob from 'glob';
import ServersService from './app/services/servers';
import Clusters from './app/models/clusters';
import PingWrapper from './app/main-process/ping';

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win;

function initialize() {

  loadMainFiles();

  function createWindow() {
    // Créer le browser window.
    win = new BrowserWindow({ show: false, width: 1640, height: 705, webPreferences: {nodeIntegration: true} });
  
    // et charge le index.html de l'application.
    win.loadFile('./index.html');
  
    // Ouvre les DevTools.
    win.webContents.openDevTools();

    win.setMenu(null);
  
    // Émit lorsque la fenêtre est fermée.
    win.on('closed', () => {
      // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
      // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
      // où vous devez supprimer l'élément correspondant.
      win = null;
    });
  
    win.once('ready-to-show', () =>{
      win.show();
      getServersFile();
    });
  }
  
  // Cette méthode sera appelée quant Electron aura fini
  // de s'initialiser et sera prêt à créer des fenêtres de navigation.
  // Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
  app.on('ready', createWindow);
  
  // Quitte l'application quand toutes les fenêtres sont fermées.
  app.on('window-all-closed', () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
      createWindow();
    }
  
  });
}

async function getServersFile() {

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

initialize();