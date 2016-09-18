"use strict";
const Translate_1 = require('../../lib/Parsers/Translate');
const chai_1 = require('chai');
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
            chai_1.expect(Translate_1.default).to.include.keys(['regularExpression', 'callback']);
        });
        it('should be instance of RegExp', () => {
            chai_1.expect(Translate_1.default.regularExpression).to.be.an.instanceOf(RegExp);
        });
        it('should not return anything when there is no key inside text', () => {
            const matches = sentences[0].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.be.null;
        });
        it('should return one key from the provided text', () => {
            const matches = sentences[1].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
        it('should return 2 keys from the provided text', () => {
            const matches = sentences[2].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(2);
        });
        it('should return keys when it is in the immediate vicinity to each other', () => {
            const matches = sentences[3].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(2);
        });
        it('should return key when it has the last position in the sentence', () => {
            const matches = sentences[4].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
        it('should return key when it is the only element inside the text', () => {
            const matches = sentences[5].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
        it('should return key when it is the first element inside the sentence', () => {
            const matches = sentences[5].match(Translate_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
    });
    describe('Callback functionality', () => {
        it('should return the translated text using the translations singular form', () => {
            const result = Translate_1.default.callback(sentences[7].match(Translate_1.default.regularExpression), null, sentences[7]);
            return result.then((translatedText) => {
                chai_1.expect(translatedText).to.be.eql('This album has only a few track');
            });
        });
    });
});
