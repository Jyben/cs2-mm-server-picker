const { app } = require('electron');
const opts = {
    errorEventName: 'error',
    logDirectory: `${app.getPath('home')}/csgo-mm-server-picker/`,
    fileNamePattern: 'csgo-mm-server-picker-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger(opts);

module.exports = log;