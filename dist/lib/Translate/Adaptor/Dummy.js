"use strict";
// %track_count,IDS_Track%
// %rack_count,track,tracks%
let dummyData = [
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
function removeSymbolsFromWord(word, symbols) {
    let parsedWord = word;
    symbols.forEach((elem) => {
        parsedWord = parsedWord.replace(new RegExp(elem, 'g'), '');
    });
    return parsedWord;
}
class TranslateAdaptorDummy {
    get(key) {
        if (key.indexOf('%') !== -1) {
            key = removeSymbolsFromWord(key, ['%']);
        }
        let result = dummyData.find((elem) => {
            return elem.hasOwnProperty(key);
        });
        return Promise.resolve(result[key]);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TranslateAdaptorDummy;
