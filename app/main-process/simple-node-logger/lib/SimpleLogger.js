/**
 * @class SimpleLogger
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014-07-06
 */
const dash = require( 'lodash' );
const Logger = require('./Logger' );
const ConsoleAppender = require('./ConsoleAppender' );
const FileAppender = require( './FileAppender' );
const RollingFileAppender = require( './RollingFileAppender' );

const SimpleLogger = function(opts) {
    'use strict';

    const options = Object.assign({}, opts);

    const manager = this;
    const domain = options.domain;
    const appenders = options.appenders || [];
    const loggers = options.loggers || [];

    let dfltLevel = options.level || Logger.DEFAULT_LEVEL,
        loggerConfigFile = options.loggerConfigFile,
        refresh = options.refresh,
        fs = options.fs || require('fs' ),
        createInterval = options.createInterval || setInterval,
        minRefresh = options.minRefresh || 10 * 1000,
        errorEventName = options.errorEventName;

    /**
     * create a logger with optional category and level
     *
     * @param category
     * @param level
     */
    this.createLogger = function(category, level) {
        const opts = Object.prototype.toString.call(category) === '[object String]' ? options : dash.merge({}, options, category);
        
        opts.category  = dash.isString(category) ? category : opts.category;
        opts.level     = level ? level : opts.level || dfltLevel;
        opts.appenders = appenders;

        if (errorEventName) {
            opts.errorEventName = errorEventName;
        }
        
        const logger = new Logger( opts );
        loggers.push( logger );
        
        return logger;
    };

    /**
     * create the console appender and add it to the appenders list
     *
     * @param opts - appender settings
     * @returns ConsoleAppender -
     */
    this.createConsoleAppender = function(opts) {
        return manager.addAppender( new ConsoleAppender( Object.assign({}, opts ) ));
    };

    /**
     * create a file appender and add it to the appenders list
     *
     * @param opts
     * @returns a FileAppender object
     */
    this.createFileAppender = function(opts) {
        if (!opts) {
            throw new Error('file appender must be created with log file path set in options');
        }

        return manager.addAppender( new FileAppender( opts ) );
    };

    /**
     * create a rolling file appender and add it to the appender list
     *
     * @param opts
     * @returns the appender
     */
    this.createRollingFileAppender = function( opts ) {
        return manager.addAppender( new RollingFileAppender( opts ) );
    };

    /**
     * add the appender to list
     *
     * @param appender
     * @returns the new appender
     */
    this.addAppender = function(appender) {
        appenders.push( appender );

        return appender;
    };

    this.getAppenders = function() {
        return appenders;
    };

    this.getLoggers = function() {
        return loggers;
    };

    /**
     * start the refresh thread; minimum cycle time = 10 seconds...
     */
    this.startRefreshThread = function() {
        // TODO replace with watcher thread
        if (fs.existsSync( loggerConfigFile ) && dash.isNumber( refresh )) {
            const t = Math.max( minRefresh, refresh );
            createInterval( manager.readConfig, t);
        }
    };

    /**
     * set the level of all loggers to the specified level
     *
     * @param level - one of the know levels
     */
    this.setAllLoggerLevels = function(level) {
        loggers.forEach(function(logger) {
            logger.setLevel( level );
        });
    };

    /**
     * read and parse the config file; change settings if required
     */
    this.readConfig = function(completeCallback) {
        // TODO refactor into configuration delegate to read stats and then process file only if stats change
        const callback = (err, buf) => {
            if (err) {
                /*eslint no-console: "off"*/
                console.log( err );
            } else {
                const conf = JSON.parse( buf.toString() );
                if (conf.appenders && conf.appenders.length > 0) {
                    // find each appender and set the level
                    conf.appenders.forEach(function(app) {
                        const level = app.level;

                        const appender = dash.find( appenders, (item) => {
                            if (item.getTypeName() === app.typeName && app.level) {
                                return item;
                            }
                        });

                        if (appender && typeof appender.setLevel === 'function') {
                            appender.setLevel( level );
                        }
                    });
                }

                if (conf.loggers && conf.loggers.length > 0) {
                    conf.loggers.forEach(item => {
                        if (item.category === 'all') {
                            manager.setAllLoggerLevels( item.level );
                        }
                    });
                }
            }

            if (completeCallback) {
                return completeCallback( err );
            }
        };

        fs.readFile( loggerConfigFile, callback );
    };

    this.__protected = function() {
        return {
            domain:domain,
            dfltLevel:dfltLevel,
            refresh:refresh,
            loggerConfigFile:loggerConfigFile
        };
    };
};

module.exports = SimpleLogger;

/**
 * static convenience method to create a simple console logger; see options for details
 *
 * @param options - optional, if present then it could be 1) a string or 2) and object.  if it's a string it's assumed
 * to be the logFilePath; if it's a string or an object with logFilePath property, then a file appender is created.
 *
 * Valid options:
 *  - logFilePath : a path to the file appender
 *  - domain : the logger domain, e.g., machine or site id
 *  - dfltLevel : the default log level (overrides info level)
 *  - timestampFormat : the format used for log entries (see moment date formats for all possibilities)
 *
 * @returns logger
 */
SimpleLogger.createSimpleLogger = function(options) {
    'use strict';

    let opts;

    // if options is a string then it must be the
    if (typeof options === 'string') {
        opts = {
            logFilePath: options
        };
    } else {
        opts = Object.assign( {}, options );
    }

    const manager = new SimpleLogger(opts);

    // pass options in to change date formats, etc
    manager.createConsoleAppender( opts );

    if (opts.logFilePath) {
        manager.createFileAppender( opts );
    }

    return manager.createLogger();
};

/**
 * static convenience method to create a file logger (no console logging);
 *
 * @param options - if string then it's the logFilePath, else options with the logFilePath
 * @returns logger
 */
SimpleLogger.createSimpleFileLogger = function(options) {
    'use strict';

    if (!options) {
        throw new Error('must create file logger with a logFilePath');
    }

    let opts;

    // if options is a string then it must be the
    if (typeof options === 'string') {
        opts = {
            logFilePath: options
        };
    } else {
        opts = Object.assign({}, options );
    }

    const manager = new SimpleLogger( opts );

    manager.createFileAppender( opts );

    return manager.createLogger();
};

/**
 * create a rolling file logger by passing options to SimpleLogger and Logger.  this enables setting
 * of domain, category, etc.
 *
 * @param options
 * @returns rolling logger
 */
SimpleLogger.createRollingFileLogger = function(options) {
    'use strict';

    if (!options) {
        throw new Error('createRollingFileLogger requires configuration options for this constructor');
    }

    var opts;

    // read a dynamic config file if available
    if (typeof options.readLoggerConfig === 'function') {
        opts = options.readLoggerConfig();

        opts.readLoggerConfig = options.readLoggerConfig;
    } else {
        opts = options;
    }

    var manager = new SimpleLogger( opts );

    manager.createRollingFileAppender( opts );

    if (opts.refresh && opts.loggerConfigFile) {
        process.nextTick( manager.startRefreshThread );
    }

    return manager.createLogger( opts );
};

/**
 * create a log manager
 *
 * @param options - file or rolling file specs;
 */
SimpleLogger.createLogManager = function(options) {
    'use strict';

    let opts; 

    // read a dynamic config file if available
    if (options && typeof options.readLoggerConfig === 'function') {
        opts = options.readLoggerConfig();

        opts.readLoggerConfig = options.readLoggerConfig;
    } else {
        opts = Object.assign({}, options);
    }

    var manager = new SimpleLogger( opts );

    if (opts.logDirectory && opts.fileNamePattern) {
        manager.createRollingFileAppender( opts );
    }

    // create at least one appender
    if (manager.getAppenders().length === 0) {
        manager.createConsoleAppender( opts );
    }

    return manager;
};
