import ITranslateAdaptor from '../IAdaptor';
import * as ITranslation from '../ITranslation';
import Format from '../../Format';

// %track_count,IDS_Track%
// %rack_count,track,tracks%

let dummyData: ITranslation.ITranslation[] = [
    {
        'OFFER': {
            singular: 'offer',
            plural: 'offers'
        }
    },
    {
        'CITY': {
            singular: 'city',
            plural: 'cities'
        }
    },
    {
        'IDS_Album': {
            singular: 'album',
            plural: 'albums'
        }
    },
    {
        'IDS_Track': {
            singular: 'track',
            plural: 'tracks'
        }
    },
    {
        'IDS_Is': {
            singular: 'is',
            plural: 'are'
        }
    },
    {
        'IDS_ComplexText': {
            singular: 'There %track_count,IDS_Is% {track_count} %track_count,IDS_Track% on this %IDS_Album%'
        }
    }
];

function removeSymbolsFromWord(word: string, symbols: string[]) {
    let parsedWord: string = word;

    symbols.forEach((elem) => {
        parsedWord = parsedWord.replace(new RegExp(elem, 'g'), '');
    });

    return parsedWord;
}

class TranslateAdaptorDummy implements ITranslateAdaptor {

    get(key: string): Promise<ITranslation.IWord> {
        if (key.indexOf('%') !== -1) {
            key = removeSymbolsFromWord(key, ['%']);
        }
        let result = dummyData.find((elem) => {
            return elem.hasOwnProperty(key);
        });

        return Promise.resolve(result[key]);
    }
}

export default TranslateAdaptorDummy;