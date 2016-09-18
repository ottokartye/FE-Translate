"use strict";
class Translate {
    constructor(translateAdaptor, format) {
        this._translateAdaptor = translateAdaptor;
        this._format = format;
    }
    get(key, data) {
        return this._translateAdaptor.get(key).then((translation) => {
            let translatedKey;
            if (translation.singular.indexOf('{') === -1 && translation.singular.indexOf('%') === -1) {
                if (data != null && Object.keys(data).length !== 0 && typeof data[Object.keys(data)[0]] === 'number' && data[Object.keys(data)[0]] > 1) {
                    translatedKey = translation.plural;
                }
                else {
                    translatedKey = translation.singular;
                }
                return translatedKey;
            }
            else {
                translatedKey = translation.singular;
            }
            return this._format.format(translatedKey, data);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Translate;
