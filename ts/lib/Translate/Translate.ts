import ITranslate from './ITranslate';
import ITranslateAdaptor from './IAdaptor';
import Format from '../Format';
import IFormat from '../IFormat';

class Translate implements ITranslate {
    _translateAdaptor: ITranslateAdaptor;
    _format: IFormat;

    constructor(translateAdaptor: ITranslateAdaptor, format: IFormat) {
        this._translateAdaptor = translateAdaptor;
        this._format = format;
    }

    get(key: string, data?: any): Promise<string> {
        return this._translateAdaptor.get(key).then((translation) => {
            let translatedKey: string;
            
            if (translation.singular.indexOf('{') === -1 && translation.singular.indexOf('%') === -1) {
                if (data != null && Object.keys(data).length !== 0 && typeof data[Object.keys(data)[0]] === 'number' && data[Object.keys(data)[0]] > 1) {
                    translatedKey = translation.plural;
                } else { 
                    translatedKey = translation.singular;
                }
                return translatedKey;
            } else {
                translatedKey = translation.singular;
            }

            return this._format.format(translatedKey, data);
        });
    }

}

export default Translate;