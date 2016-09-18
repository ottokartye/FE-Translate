"use strict";
const Format_1 = require('../../lib/Format');
const Translate_1 = require('../../lib/Translate/Translate');
const Dummy_1 = require('../../lib/Translate/Adaptor/Dummy');
const Translate_2 = require('../../lib/Parsers/Translate');
const TranslateCounter_1 = require('../../lib/Parsers/TranslateCounter');
const Variable_1 = require('../../lib/Parsers/Variable');
const chai_1 = require('chai');
describe('Translate', () => {
    let subject;
    beforeEach(() => {
        // Init Translate and also Format with all parsers
        const format = new Format_1.default;
        format.addParser(Translate_2.default);
        format.addParser(TranslateCounter_1.default);
        format.addParser(Variable_1.default);
        subject = new Translate_1.default(new Dummy_1.default, format);
    });
    it('should be an instance of Translate class', () => {
        chai_1.expect(subject).to.be.an.instanceOf(Translate_1.default);
    });
    it('should return the translated text for provided key', () => {
        let result = subject.get('%IDS_ComplexText%', { track_count: 1 });
        return result.then((translatedText) => {
            chai_1.expect(translatedText).to.be.eql('There is 1 track on this album');
        });
    });
});
