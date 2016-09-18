"use strict";
const TranslateCounter_1 = require('../../lib/Parsers/TranslateCounter');
const chai_1 = require('chai');
const sentences = [
    'Basic example with nothing',
    'There are 3 %track_count,IDS_Track% in this album',
    'Should be either 1 %track_count,IDS_Track% or 3 %track_count,IDS_Track% in this album',
    'Example with %track_count,IDS_Track%%track_count,IDS_Track% keys',
    'Example with last word on token %track_count,IDS_Track%',
    '%track_count,IDS_Track%',
    '%track_count,IDS_Track% sentence',
    'There are 3 %track_count,IDS_Track% in this album'
];
describe('TranslateCounterParser', () => {
    describe('RegularExpression validity', () => {
        it('should contain keys', () => {
            chai_1.expect(TranslateCounter_1.default).to.include.keys(['regularExpression', 'callback']);
        });
        it('should be instance of RegExp', () => {
            chai_1.expect(TranslateCounter_1.default.regularExpression).to.be.an.instanceOf(RegExp);
        });
        it('should not return anything when there is no key inside text', () => {
            const matches = sentences[0].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.be.null;
        });
        it('should return one key from the provided text', () => {
            const matches = sentences[1].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
        it('should return 2 keys from the provided text', () => {
            const matches = sentences[2].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(2);
        });
        it('should return keys when it is in the immediate vicinity to each other', () => {
            const matches = sentences[3].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(2);
        });
        it('should return key when it has the last position in the sentence', () => {
            const matches = sentences[4].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
        it('should return key when it is the only element inside the text', () => {
            const matches = sentences[5].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
        it('should return key when it is the first element inside the sentence', () => {
            const matches = sentences[5].match(TranslateCounter_1.default.regularExpression);
            chai_1.expect(matches).to.have.length(1);
        });
    });
    describe('Callback functionality', () => {
        it('should return the translated text using the translations singular form', () => {
            const result = TranslateCounter_1.default.callback(sentences[7].match(TranslateCounter_1.default.regularExpression), { track_count: 3 }, sentences[7]);
            return result.then((translatedText) => {
                chai_1.expect(translatedText).to.be.eql('There are 3 tracks in this album');
            });
        });
    });
});
