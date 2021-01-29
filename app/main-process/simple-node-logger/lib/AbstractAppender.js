/**
 * @class AbstractAppender
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 7/7/14 5:58 PM
 */
const util = require( 'util' );
const moment = require( 'moment' );
const dash = require( 'lodash' );

const AbstractAppender = function(options) {
    'use strict';

    const appender = this;
    const typeName = options.typeName;
    const timestampFormat = options.timestampFormat || 'HH:mm:ss.SSS';
    const prettyPrint = options.prettyPrint;

    this.separator = options.separator || ' ';

    /**
     * format the entry and return the field list
     *
     * @param entry the log entry
     * @param thisArg - use this to override the base object
     *
     * @returns field array
     */
    this.formatEntry = function(entry, thisArg) {
        const apdr = thisArg || appender;

        const fields = [];

        if (entry.domain) {
            fields.push( entry.domain );
        }

        fields.push( apdr.formatTimestamp( entry.ts ) );
        fields.push( apdr.formatLevel( entry.level ) );

        if (entry.category) {
            fields.push( entry.category );
        }

        fields.push( apdr.formatMessage( entry.msg ) );

        return fields;
    };

    /**
     * format the message
     *
     * @param msg the log message
     * @param thisArg - use this to override the base object
     *
     * @returns field array
     */
    this.formatMessage = function(msg, thisArg) {
        const apdr = thisArg || appender;

        if (!msg) {
            return '';
        }

        if (util.isArray( msg )) {
            const list = msg.map(function(item) {
                if (util.isDate( item )) {
                    return apdr.formatDate( item );
                } else {
                    return apdr.formatObject( item );
                }
            });

            return list.join('');
        } else {
            return msg;
        }
    };

    this.formatDate = function(value) {
        return value.toJSON();
    };

    this.formatObject = function(value) {
        if (!value) {
            return '';
        }

        if (dash.isObject( value )) {
            try {
                if (value instanceof Error) {
                    return [
                        value.message,
                        (prettyPrint) ? JSON.stringify( value, null, 2) : JSON.stringify( value ),
                        value.stack
                    ].join('\n');
                }
                
                return (prettyPrint) ? JSON.stringify( value, null, 2) : JSON.stringify( value );
            } catch (ignore) {
                return 'json error: ' + value.toString();
            }
        } else {
            var s = value.toString();
            if (s === '[object Object]') {
                return util.inspect( value );
            } else {
                return s;
            }
        }
    };

    /**
     * format the level string by forcing to upper case and padding to 5 chars
     *
     * @param level
     * @returns {string}
     */
    this.formatLevel = function(level) {
        let str = level.toUpperCase();
        if (str.length < 5) {
            str += ' ';
        }

        return str;
    };

    /**
     * format the timestamp to HH:mm:ss.SSS
     *
     * @param ts the unix milliseconds
     * @returns formatted string
     */
    this.formatTimestamp = function(ts) {
        return moment( ts ).format( timestampFormat );
    };

    /**
     * return the type name of this appender (ConsoleAppender)
     */
    this.getTypeName = function() {
        return typeName;
    };

    // constructor tests
    if (!typeName) {
        throw new Error('appender must be constructed with a type name');
    }
};

module.exports = AbstractAppender;

AbstractAppender.extend = function(child, options) {
    'use strict';

    const parent = new AbstractAppender( options );

    dash.extend( child, parent );

    return parent;
};
