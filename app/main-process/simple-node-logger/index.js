
/** darryl.west@raincitysoftware.com **/

module.exports = require('./lib/SimpleLogger');
module.exports.AbstractAppender = require('./lib/AbstractAppender');
module.exports.Logger = require('./lib/Logger');

module.exports.appenders = {
    ConsoleAppender: require('./lib/ConsoleAppender'),
    FileAppender: require('./lib/FileAppender'),
    RollingFileAppender: require('./lib/RollingFileAppender')
};
