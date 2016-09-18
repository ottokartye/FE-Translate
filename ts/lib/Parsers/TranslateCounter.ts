import IParser from '../IParser';
import Translate from '../Translate/Translate';
import Format from '../Format';
import TranslateAdaptorDummy from '../Translate/Adaptor/Dummy';

function removeSymbolsFromWord(word: string, symbols: string[]) {
    let parsedWord: string = word;

    symbols.forEach((elem) => {
        parsedWord = parsedWord.replace(new RegExp(elem), '');
    });

    return parsedWord;
}

function findValue(key: string, data: any): number {
    if (key in data) {
        return data[key];
    }

    return null;
}

function getVariableValue(key, data): number {
    // Get variable element from string
    const variable = key.substring(0, key.indexOf(','));
    // Get variable value
    return findValue(variable, data);
}

var TranslateCounterParser: IParser = {
    regularExpression: /%\w*,\w*%/g,
    callback: function(params: string | string[], data: any, sentence: string): string | Promise<string> {
        let translatedText: string = sentence;
        
        if (!(params instanceof Array)) {
            params = [params as string];
        }

        let promises = (params as Array<string>).map((param) => {
            // Remove leading and trailing symbols from param
            const strippedParam = removeSymbolsFromWord(param, ['%', '%']);
            // Get variable value
            const value = getVariableValue(strippedParam, data);
            // Get key from param
            const startPosition = strippedParam.indexOf(',') + 1;
            const key = strippedParam.substring(startPosition, strippedParam.length);
            // Get singular or plural translation for the key
            const translate: Translate = new Translate(new TranslateAdaptorDummy, new Format);
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
} 

export default TranslateCounterParser;