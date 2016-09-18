import IParser from '../IParser';
import Translate from '../Translate/Translate';
import Format from '../Format';
import TranslateAdaptorDummy from '../Translate/Adaptor/Dummy';

var TranslateParser: IParser = {
    regularExpression: /%\w*%/g,
    callback: function(params: string | string[], data: any, sentence: string): string | Promise<string> {

        if (!(params instanceof Array)) {
            params = [params as string];
        }

        let translatedText: string = sentence;

        let promises = (params as Array<string>).map((key) => {
            const translate: Translate = new Translate(new TranslateAdaptorDummy, new Format);

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

export default TranslateParser;