/**
 * @class ConsoleAppender
 * @classdesc ConsoleAppender writes to the console all entries at or above the specified level.
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 7/6/14 12:02 PM
 */
const Logger = require('./Logger' );
const AbstractAppender = require('./AbstractAppender' );

/*eslint no-console: "off"*/
const ConsoleAppender = function(opts) {
    'use strict';

    // get a copy of the opts
    const options = Object.assign({}, opts);

    const appender = this;
    const typeName = options.typeName || 'ConsoleAppender';
    const writer = options.writer || console.log;

    let level = options.level || Logger.STANDARD_LEVELS[0];
    let levels = options.levels || Logger.STANDARD_LEVELS;
    let currentLevel = levels.indexOf( level );

    options.typeName = typeName;
    AbstractAppender.extend( this, options );

    /**
     * default formatter for this appender;
     * @param entry
     */
    this.formatter = function(entry) {
        const fields = appender.formatEntry( entry );

        return fields.join( appender.separator );
    };

    /**
     * call formatter then write the entry to the console output
     * @param entry - the log entry
     */
    this.write = function(entry) {
        if (levels.indexOf( entry.level ) >= currentLevel) {
            writer( appender.formatter( entry ));
        }
    };

    this.setLevel = function(level) {
        const idx = levels.indexOf( level );
        if (idx >= 0) {
            currentLevel = idx;
        }
    };
};

module.exports = ConsoleAppender;
