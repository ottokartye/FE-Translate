"use strict";

import TranslateParser from '../../lib/Parsers/Translate';
import ITranslate from '../../lib/Translate/ITranslate';
import { expect } from 'chai';

const sentences = [
    'Basic example with nothing',
    'Example with %ONE% match',
    'Example with %SEVERAL% matches on %DIFFERENT% keys',
    'Example with %SEVERAL%%NON_SPACE% keys',
    'Example with last word on token %several%',
    '%SINGLE%',
    '%FIRST_KEY% sentence',
    'This %IDS_Album% has only a few %IDS_Track%'
];

describe('TranslateParser', () => {
    describe('RegularExpression validity', () => {

        it('should contain keys', () => {
            expect(TranslateParser).to.include.keys(['regularExpression','callback']);
        });

        it('should be instance of RegExp', () => {
            expect(TranslateParser.regularExpression).to.be.an.instanceOf(RegExp);
        });

        it('should not return anything when there is no key inside text', () => {
            const matches = sentences[0].match(TranslateParser.regularExpression);
            expect(matches).to.be.null;
        });

        it('should return one key from the provided text', () => {
            const matches = sentences[1].match(TranslateParser.regularExpression);
            expect(matches).to.have.length(1);
        });
        
        it('should return 2 keys from the provided text', () => {
            const matches = sentences[2].match(TranslateParser.regularExpression);
            expect(matches).to.have.length(2);
        });

        it('should return keys when it is in the immediate vicinity to each other', () => {
            const matches = sentences[3].match(TranslateParser.regularExpression);
            expect(matches).to.have.length(2);
        });

        it('should return key when it has the last position in the sentence', () => {
            const matches = sentences[4].match(TranslateParser.regularExpression);
            expect(matches).to.have.length(1);
        });

        it('should return key when it is the only element inside the text', () => {
            const matches = sentences[5].match(TranslateParser.regularExpression);
            expect(matches).to.have.length(1);
        });

        it('should return key when it is the first element inside the sentence', () => {
            const matches = sentences[5].match(TranslateParser.regularExpression);
            expect(matches).to.have.length(1);
        });

    });

    describe('Callback functionality', () => {
        it('should return the translated text using the translations singular form', () => {        
            const result = TranslateParser.callback(sentences[7].match(TranslateParser.regularExpression), null, sentences[7]);
            return (result as Promise<string>).then((translatedText) => {
                expect(translatedText).to.be.eql('This album has only a few track');
            });
            
        });
    });

});