const fs = require('fs');
const { app, dialog } = require('electron');

let Files = function () { }

Files.prototype.create = function (content) {

  const fileName = `${app.getPath('home')}/csgo-mm-server-picker/ipRules.sh`;

  console.log(app.getPath('home'));

  if (!fs.existsSync(`${app.getPath('home')}/csgo-mm-server-picker`)) {
    fs.mkdirSync(`${app.getPath('home')}/csgo-mm-server-picker`);
  }

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.log("An error ocurred creating the file " + err.message);
      dialog.showErrorBox("An error ocurred creating the file " + err.message);
    }

    console.log("The file has been succesfully saved");
  });
}

module.exports = Files; 