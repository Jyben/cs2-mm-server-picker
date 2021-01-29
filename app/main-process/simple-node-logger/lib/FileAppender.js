/**
 * @class FileAppender
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 7/7/14 5:15 PM
 */
const Logger = require('./Logger' );
const AbstractAppender = require('./AbstractAppender' );
const dash = require( 'lodash' );
const path = require( 'path' );

const FileAppender = function(options) {
    'use strict';

    const appender = this;
    const fs = options.fs || require( 'fs' );        
    const newline = /^win/.test(process.platform) ? '\r\n' : '\n';
    const typeName = options.typeName || 'FileAppender';
    const autoOpen = dash.isBoolean( options.autoOpen ) ? options.autoOpen : true;
    const levels = options.levels || Logger.STANDARD_LEVELS;

    let level = options.level || Logger.DEFAULT_LEVEL;
    let currentLevel = levels.indexOf( level );
    let logFilePath = options.logFilePath;
    let writer = options.writer;

    options.typeName = typeName;
    AbstractAppender.extend( this, options );

    /**
     * default formatter for this appender;
     * @param entry
     */
    this.formatter = function(entry) {
        const fields = appender.formatEntry( entry );

        // add new line (for linux and windows)
        fields.push( newline );
        
        return fields.join( appender.separator );
    };

    /**
     * call formatter then write the entry to the console output
     * @param entry - the log entry
     */
    this.write = function(entry) {
        if (levels.indexOf( entry.level ) >= currentLevel) {
            writer.write( appender.formatter( entry ) );
        }
    };

    this.setLevel = function(level) {
        const idx = levels.indexOf( level );
        if (idx >= 0) {
            currentLevel = idx;
        }
    };

    // writer is opened on construction
    const openWriter = function() {
        if (!writer) {
            const file = path.normalize( logFilePath );
            const opts = {
                flags:'a',
                encoding:'utf8'
            };

            writer = fs.createWriteStream( file, opts );
        }
    };

    this.closeWriter = function() {
        if (writer) {
            writer.end('\n');
        }
    };

    // constructor tests
    (function() {
        if (!logFilePath) {
            throw new Error('appender must be constructed with a log file path');
        }
    }());

    if (autoOpen) {
        openWriter();
    }
};

module.exports = FileAppender;
