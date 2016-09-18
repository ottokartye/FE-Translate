/// <reference path="../../../typings/index.d.ts" />
"use strict";

import VariableParser from '../../lib/Parsers/Variable';
import { expect } from 'chai';

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
        expect(VariableParser).to.include.keys(['regularExpression', 'callback']);
    });

    it('should be an instance of RegExp', () => {
        expect(VariableParser.regularExpression).to.be.an.instanceOf(RegExp);
    });

    it('should not return anything when there are no keys found inside', () => {
        const matches = sentences[0].match(VariableParser.regularExpression);
        expect(matches).to.be.null;
    });

    it('should return one key from the provided text', () => {
        const matches = sentences[1].match(VariableParser.regularExpression);
        expect(matches).to.have.length(1);        
    });

    it('should return 2 keys from the provided text', () => {
        const matches = sentences[2].match(VariableParser.regularExpression);
        expect(matches).to.have.length(2);        
    });

    it('should return keys when it is in the immediate vicinity to each other', () => {
        const matches = sentences[3].match(VariableParser.regularExpression);
        expect(matches).to.have.length(2);
    });

    it('should return key when it has the last position in the sentence', () => {
        const matches = sentences[4].match(VariableParser.regularExpression);
        expect(matches).to.have.length(1);
    });

    it('should return key when it is the only element inside the text', () => {
        const matches = sentences[5].match(VariableParser.regularExpression);
        expect(matches).to.have.length(1);
    });

    it('should return key when it is the first element inside the sentence', () => {
        const matches = sentences[5].match(VariableParser.regularExpression);
        expect(matches).to.have.length(1);
    });

    it('should return provided key without leading and trailing {} symbols', () => {
        let searchValue = '{town_count}';
        const replacements = { '{': '', '}': ''};
        searchValue = searchValue.replace(/{|}/, function(match) {
            return replacements[match];
        });
        expect(searchValue).to.not.include(['{','}']);
    });

    describe('Callback functionality', () => {
        it('should return the text with all the variables replaced', () => {

            const data = {
                town_count: 12
            };
    
            const result = VariableParser.callback(sentences[7].match(VariableParser.regularExpression), data, sentences[7]);
            return (result as Promise<string>).then((translatedText) => {
                expect(translatedText).to.be.eql('This country has about 12 towns');
            });
            
        });
    });
});