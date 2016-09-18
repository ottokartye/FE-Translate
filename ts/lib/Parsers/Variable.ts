import IParser from '../IParser';

function findValue(key: string, data: any): string {
    if (key in data) {
        return data[key];
    }
    return null;
}

function removeSymbolsFromWord(word: string, symbols: string[]) {
    let parsedWord: string = word;

    symbols.forEach((elem) => {
        parsedWord = parsedWord.replace(new RegExp(elem), '');
    });

    return parsedWord;
}

var VariableParser: IParser = {
    regularExpression: /\{\w*\}/g,
    callback: function(params: string | string[], data: any, sentence: string): string | Promise<string> {

        let replacedText: string = sentence;

        (params as Array<string>).map((searchValue) => {
            // Remove leading and trailing {} symbols from the key
            let replaceValue = findValue(removeSymbolsFromWord(searchValue, ['{', '}']), data);
            replacedText = replacedText.replace(searchValue, replaceValue);
        });

        return Promise.resolve(replacedText);
    }    
};

export default VariableParser;