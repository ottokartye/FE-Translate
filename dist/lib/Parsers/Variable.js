"use strict";
function findValue(key, data) {
    if (key in data) {
        return data[key];
    }
    return null;
}
function removeSymbolsFromWord(word, symbols) {
    let parsedWord = word;
    symbols.forEach((elem) => {
        parsedWord = parsedWord.replace(new RegExp(elem), '');
    });
    return parsedWord;
}
var VariableParser = {
    regularExpression: /\{\w*\}/g,
    callback: function (params, data, sentence) {
        let replacedText = sentence;
        params.map((searchValue) => {
            // Remove leading and trailing {} symbols from the key
            let replaceValue = findValue(removeSymbolsFromWord(searchValue, ['{', '}']), data);
            replacedText = replacedText.replace(searchValue, replaceValue);
        });
        return Promise.resolve(replacedText);
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VariableParser;
