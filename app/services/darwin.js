const { app } = require('electron');
const fs = require("fs");

let Darwin = function (win, execCallback) {
    this._win = win;
    this._execCallback = execCallback;
}

let readPfFileToArray = function() {
    return fs
        .readFileSync("/etc/pf.conf", 'utf-8')
        .split("\n")
        .filter(line => line.substring(0, 1) !== "#");
}

Darwin.prototype.block = function(ipList) {
    let block = function (ipAddresses) {
        return ipAddresses.map(ip => {
            return `block drop from any to ${ip}`
        });
    };
    let newPf = readPfFileToArray().concat(block(ipList)).join("\n") + "\n";

    fs.writeFileSync(`${app.getPath('home')}/csgo-mm-server-picker-pf.conf`, newPf);
    this._execCallback(`pfctl -e -f ${app.getPath('home')}/csgo-mm-server-picker-pf.conf`, this._win);
};

Darwin.prototype.reset = function() {
    this._execCallback(`rm -rf ${app.getPath('home')}/csgo-mm-server-picker-pf.conf && pfctl -ef /etc/pf.conf`, this._win);
};

module.exports = Darwin;
