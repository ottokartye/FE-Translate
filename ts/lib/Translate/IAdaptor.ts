import * as IWord from './ITranslation';

interface ITranslateAdaptor {
    get: (key: string, data?: any) => Promise<IWord.IWord>;
}

export default ITranslateAdaptor;