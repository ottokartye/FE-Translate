"use strict";
const Translate_1 = require('../Translate/Translate');
const Format_1 = require('../Format');
const Dummy_1 = require('../Translate/Adaptor/Dummy');
var TranslateParser = {
    regularExpression: /%\w*%/g,
    callback: function (params, data, sentence) {
        if (!(params instanceof Array)) {
            params = [params];
        }
        let translatedText = sentence;
        let promises = params.map((key) => {
            const translate = new Translate_1.default(new Dummy_1.default, new Format_1.default);
            return translate.get(key)
                .then((translatedValue) => {
                translatedText = translatedText.replace(key, translatedValue);
                return translatedText;
            });
        });
        return Promise.all(promises).then(() => {
            return translatedText;
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TranslateParser;
