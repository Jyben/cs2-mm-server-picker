const fs = require('fs');

let Files = function () { }

Files.prototype.create = function (content) {

  const fileName = 'ipRules.sh';

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.log("An error ocurred creating the file " + err.message)
    }

    console.log("The file has been succesfully saved");
  });
}

module.exports = Files; 