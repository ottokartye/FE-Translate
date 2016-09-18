/// <reference path="../../../typings/index.d.ts" />
"use strict";
const Variable_1 = require('../../lib/Parsers/Variable');
const chai_1 = require('chai');
const sentences = [
    'Basic example with nothing',
    'Example with {ONE} match',
    'Example with {SEVERAL} matches on {DIFFERENT} keys',
    'Example with {SEVERAL}{NON_SPACE} keys',
    'Example with last word on token {several}',
    '{SINGLE}',
    '{FIRST_KEY} sentence',
    'This country has about {town_count} towns'
];
describe('VariableParser', () => {
    let matches = [];
    it('should contain keys', () => {
        chai_1.expect(Variable_1.default).to.include.keys(['regularExpression', 'callback']);
    });
    it('should be an instance of RegExp', () => {
        chai_1.expect(Variable_1.default.regularExpression).to.be.an.instanceOf(RegExp);
    });
    it('should not return anything when there are no keys found inside', () => {
        const matches = sentences[0].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.be.null;
    });
    it('should return one key from the provided text', () => {
        const matches = sentences[1].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.have.length(1);
    });
    it('should return 2 keys from the provided text', () => {
        const matches = sentences[2].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.have.length(2);
    });
    it('should return keys when it is in the immediate vicinity to each other', () => {
        const matches = sentences[3].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.have.length(2);
    });
    it('should return key when it has the last position in the sentence', () => {
        const matches = sentences[4].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.have.length(1);
    });
    it('should return key when it is the only element inside the text', () => {
        const matches = sentences[5].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.have.length(1);
    });
    it('should return key when it is the first element inside the sentence', () => {
        const matches = sentences[5].match(Variable_1.default.regularExpression);
        chai_1.expect(matches).to.have.length(1);
    });
    it('should return provided key without leading and trailing {} symbols', () => {
        let searchValue = '{town_count}';
        const replacements = { '{': '', '}': '' };
        searchValue = searchValue.replace(/{|}/, function (match) {
            return replacements[match];
        });
        chai_1.expect(searchValue).to.not.include(['{', '}']);
    });
    describe('Callback functionality', () => {
        it('should return the text with all the variables replaced', () => {
            const data = {
                town_count: 12
            };
            const result = Variable_1.default.callback(sentences[7].match(Variable_1.default.regularExpression), data, sentences[7]);
            return result.then((translatedText) => {
                chai_1.expect(translatedText).to.be.eql('This country has about 12 towns');
            });
        });
    });
});
