const { app } = require('electron');
const opts = {
    errorEventName: 'error',
    logDirectory: `./`,
    fileNamePattern: 'csgo-mm-server-picker.log',
    dateFormat: 'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger(opts);

module.exports = log;