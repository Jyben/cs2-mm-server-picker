/**
 * @class RollingFileAppender
 *
 * roll on size and/or date/time;
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 7/27/14 9:52 AM
 */
const Logger = require( './Logger' );
const AbstractAppender = require( './AbstractAppender' );
const dash = require( 'lodash' );
const moment = require( 'moment' );
const path = require( 'path' );

const RollingFileAppender = function(options) {
    'use strict';

    const appender = this;
    const fs = options.fs || require( 'fs' );
    const newline = /^win/.test(process.platform) ? '\r\n' : '\n';

    let typeName = options.typeName,
        autoOpen = dash.isBoolean( options.autoOpen ) ? options.autoOpen : true,
        logDirectory = options.logDirectory,
        fileNamePattern = options.fileNamePattern,
        dateFormat = options.dateFormat || 'YYYY.MM.DD',
        level = options.level || Logger.DEFAULT_LEVEL,
        levels = options.levels || Logger.STANDARD_LEVELS,
        currentLevel = levels.indexOf( level ),
        currentFile = options.currentFile,
        rollTimer,
        createInterval = options.createInterval || setInterval,
        writers = [];

    if (!typeName) {
        typeName = options.typeName = 'RollingFileAppender';
    }

    AbstractAppender.extend( this, options );

    const getWriter = function() {
        return writers[0];
    };

    const openWriter = function(fname) {
        const filename = fname || appender.createFileName();
        const file = path.join( logDirectory, filename );
        const opts = {
            flags:'a',
            encoding:'utf8'
        };

        let writer = fs.createWriteStream( file, opts );

        // make this the current writer...
        writers.unshift( writer );
        currentFile = file;

        // now close the current logger and remove from the writers list
        while (writers.length > 1) {
            // close the old writer
            writer = writers.pop();
            writer.removeAllListeners();
            writer.end('\n');
        }
    };

    // check once per minute to see if we need to roll
    const startRollTimer = function() {
        rollTimer = createInterval(function() {
            if (appender.checkForRoll()) {
                openWriter();
            }
        }, 60 * 1000);
    };

    /**
     * default formatter for this appender;
     * @param entry
     */
    this.formatter = function(entry) {
        const fields = appender.formatEntry( entry );

        fields.push( newline );

        return fields.join( appender.separator );
    };

    /**
     * call formatter then write the entry to the console output
     * @param entry - the log entry
     */
    this.write = function(entry) {
        if (levels.indexOf( entry.level ) >= currentLevel) {
            const writer = getWriter();
            if (writer) {
                writer.write( appender.formatter( entry ) );
            } else {
                /*eslint no-console: "off"*/
                console.log( 'no writer...' );
            }
        }
    };

    this.checkForRoll = function(now) {
        // check to see if the
        const fn = appender.createFileName( now );
        const current = path.basename( currentFile );

        return fn !== current;
    };

    this.createFileName = function(now) {
        let dt;

        if (now || now instanceof moment) {
            dt = now.format( dateFormat );
        } else {
            dt = moment().format( dateFormat );
        }

        return fileNamePattern.replace( /<DATE>/i, dt );
    };

    this.setLevel = function(level) {
        const idx = levels.indexOf( level );
        if (idx >= 0) {
            currentLevel = idx;
        }
    };

    this.__protected = function() {
        return {
            openWriter:openWriter,
            currentFile:currentFile,
            rollTimer:rollTimer,
            writers:writers
        };
    };

    // constructor tests
    (function() {
        if (!logDirectory) {
            throw new Error('appender must be constructed with a log directory');
        }
        if (!fileNamePattern) {
            throw new Error('appender must be constructed with a file name pattern');
        }
    }());
    

    // now validate the date pattern and file format
    // date may only contain YMDHAa-.

    if (autoOpen) {
        openWriter();
        startRollTimer();
    }
};

module.exports = RollingFileAppender;
