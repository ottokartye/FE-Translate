/// <reference path="../../typings/index.d.ts" />
"use strict";
const Format_1 = require('../lib/Format');
const Translate_1 = require('../lib/Parsers/Translate');
const Variable_1 = require('../lib/Parsers/Variable');
const chai_1 = require('chai');
describe('Format', () => {
    const subject = new Format_1.default();
    it('should be an instance of class Format', () => {
        chai_1.expect(subject).to.be.an.instanceOf(Format_1.default);
    });
    describe('addParser functionality', () => {
        it('should add new parsers to the parsers array', () => {
            subject.addParser(Translate_1.default);
            subject.addParser(Variable_1.default);
            chai_1.expect(subject.parsers).to.have.length(2);
        });
    });
    describe('addConverter functionality', () => {
        // TODO: write a converter first then implement this test
        it('should add a new converter to the converters array');
    });
    describe('format functionality', () => {
        it('should return a promise with the translated text', () => {
            let promise = subject.format('There is {count} %OFFER% in this %CITY%', { count: 4 });
            return promise.then((translatedText) => {
                chai_1.expect(translatedText).to.be.eql('There is 4 offer in this city');
            });
        });
    });
});
