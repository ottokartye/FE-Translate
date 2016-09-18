"use strict";
const Translate_1 = require('../Translate/Translate');
const Format_1 = require('../Format');
const Dummy_1 = require('../Translate/Adaptor/Dummy');
function removeSymbolsFromWord(word, symbols) {
    let parsedWord = word;
    symbols.forEach((elem) => {
        parsedWord = parsedWord.replace(new RegExp(elem), '');
    });
    return parsedWord;
}
function findValue(key, data) {
    if (key in data) {
        return data[key];
    }
    return null;
}
function getVariableValue(key, data) {
    // Get variable element from string
    const variable = key.substring(0, key.indexOf(','));
    // Get variable value
    return findValue(variable, data);
}
var TranslateCounterParser = {
    regularExpression: /%\w*,\w*%/g,
    callback: function (params, data, sentence) {
        let translatedText = sentence;
        if (!(params instanceof Array)) {
            params = [params];
        }
        let promises = params.map((param) => {
            // Remove leading and trailing symbols from param
            const strippedParam = removeSymbolsFromWord(param, ['%', '%']);
            // Get variable value
            const value = getVariableValue(strippedParam, data);
            // Get key from param
            const startPosition = strippedParam.indexOf(',') + 1;
            const key = strippedParam.substring(startPosition, strippedParam.length);
            // Get singular or plural translation for the key
            const translate = new Translate_1.default(new Dummy_1.default, new Format_1.default);
            return translate.get(key, data)
                .then((translatedValue) => {
                translatedText = translatedText.replace(param, translatedValue);
                return translatedText;
            });
        });
        return Promise.all(promises).then(() => {
            return translatedText;
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TranslateCounterParser;
