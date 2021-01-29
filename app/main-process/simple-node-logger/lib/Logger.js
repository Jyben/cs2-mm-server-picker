/**
 * @class Logger
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 7/5/14 6:28 PM
 */

const Logger = function(options) {
    'use strict';

    const logger = this,
        pid = options.pid || process.pid,
        errorEventName = options.errorEventName,
        stats = new Map();

    let domain = options.domain,
        category = options.category,
        level = options.level || Logger.DEFAULT_LEVEL,
        levels = options.levels || Logger.STANDARD_LEVELS,
        currentLevel = levels.indexOf( level ),
        appenders = options.appenders || [];

    // helper method
    const isLevelAt = function(lvl) {
        const idx = levels.indexOf( lvl );

        return idx >= currentLevel;
    };

    /**
     * log the statement message
     *
     * @param level the level of this message (label, i.e, info, warn, etc)
     * @param msg
     */
    this.log = function(level, msg) {
        const entry = logger.createEntry( level, msg );

        process.nextTick(function() {
            // write the message to the appenders...
            appenders.forEach(function(appender) {
                appender.write( entry );
            });

            if (level === 'error' && typeof(errorEventName) === 'string' || typeof(errorEventName) === String) {
                process.emit(errorEventName, entry);
            }
        });

        return entry;
    };

    /**
     * create the entry object used to log messages
     *
     * @param level - info, debug, etc.
     * @param messageList - a list of message objects
     * @returns then entry object
     */
    this.createEntry = function(level, messageList) {
        const entry = {};

        entry.ts = Date.now();

        entry.pid = pid;
        if (domain) {
            entry.domain = domain;
        }
        if (category) {
            entry.category = category;
        }

        entry.level = level;
        entry.msg = messageList;

        return entry;
    };

    /**
     * set the level
     *
     * @param lvl one of the recognized logger levels
     */
    this.setLevel = function(lvl) {
        currentLevel = levels.indexOf(lvl);
        level = lvl;
        appenders.forEach(app => {
            app.setLevel( lvl );
        });
    };

    /**
     * return the current level string
     */
    this.getLevel = function() {
        return level;
    };

    /**
     * set the list of appenders
     * @param app
     */
    this.setAppenders = function(appenderList) {
        appenders = appenderList;
    };

    /**
     * add an appender to the list
     *
     * @param appender - implements write method
     */
    this.addAppender = function(appender) {
        appenders.push( appender );
    };

    /**
     * remove the appender using the type name
     */
    this.removeAppender = function(typeName) {
        throw new Error(`remove appender ${typeName} is not implemented yet...`);
    };

    this.getAppenders = function() {
        return appenders;
    };

    this.isDebug = function() {
        return isLevelAt( 'debug' );
    };

    this.isInfo = function() {
        return isLevelAt( 'info' );
    };

    /**
     * return the status map with log counts for each level
     */
    this.getStats = function() {
        return stats;
    };

    /**
     * return the category name
     */
    this.getCategory = function() {
        return category;
    };

    /**
     * return the domain name
     */
    this.getDomain = function() {
        return domain;
    };

    // now initialize the methods for the standard levels
    const init = function() {
        levels.forEach(function(lvl) {
            stats.set(lvl, 0);
            logger[ lvl ] = function() {
                stats.set(lvl, stats.get(lvl) + 1);
                if (levels.indexOf( lvl ) >= currentLevel) {
                    const args = Array.prototype.slice.call( arguments );
                    logger.log( lvl, args );
                }
            };
        });
    };

    this.__protected = function() {
        return {
            pid:pid,
            domain:domain,
            category:category
        };
    };

    init();
};

Logger.STANDARD_LEVELS = [ 'all', 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ];
Logger.DEFAULT_LEVEL = 'info';

module.exports = Logger;
