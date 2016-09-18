/// <reference path="../../typings/index.d.ts" />
"use strict";
class Format {
    constructor() {
        // Collection of parsers (translation keys, variables, etc...)
        this.parsers = new Array();
        this.converters = new Array();
    }
    /**
     * Parse the list of parsers and hand the job to Translate instance
     * @param {string} text [description]
     * @param {any}    data [description]
     */
    format(rawText, data) {
        let translatedText = rawText;
        let promise = Promise.resolve(translatedText);
        this.parsers.forEach((parser) => {
            if (parser.regularExpression.test(translatedText)) {
                promise = promise.then((currentText) => {
                    return parser.callback(currentText.match(parser.regularExpression), data, currentText);
                });
            }
        });
        return promise;
    }
    /**
     * Add a parser to the list of parsers
     * @param {RegExp} regexp   Regular expression used for identifying keys
     * @param {any}    callback Callback function
     */
    addParser(parser) {
        this.parsers.push(parser);
    }
    /**
     * Add a converter to the list of converters
     * @param  {string}     name [description]
     * @param  {string) =>   string        | Promise<string>} callback [description]
     * @return {IFormat}         [description]
     */
    addConverter(converter) {
        this.converters.push(converter);
    }
    /**
     * Convert provided string to regular expression
     * @param  {string | RegExp}      expression [description]
     * @return {RegExp}      [description]
     */
    static regExpConverter(expression) {
        let result;
        if (expression instanceof RegExp) {
            result = expression;
        }
        else {
            result = new RegExp(expression, 'g');
        }
        return result;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Format;
