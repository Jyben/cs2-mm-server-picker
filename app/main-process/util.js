const fs = require('fs');
const { app, dialog } = require('electron');
const log = require('./log');

let Files = function () { }

Files.prototype.create = function (content) {

  if (process.platform !== 'linux') {
    return;
  }

  const fileName = `${app.getPath('home')}/csgo-mm-server-picker/ipRules.sh`;

  if (!fs.existsSync(`${app.getPath('home')}/csgo-mm-server-picker`)) {
    fs.mkdirSync(`${app.getPath('home')}/csgo-mm-server-picker`);
  }

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      log.error("An error ocurred creating the file " + err.message);
      dialog.showErrorBox("An error ocurred creating the file " + err.message);
    }
  });
}

module.exports = Files; 