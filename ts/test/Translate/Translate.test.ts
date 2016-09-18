"use strict";

import Format from '../../lib/Format';
import Translate from '../../lib/Translate/Translate';
import ITranslate from '../../lib/Translate/ITranslate';
import TranslateAdaptorDummy from '../../lib/Translate/Adaptor/Dummy';

import TranslateParser from '../../lib/Parsers/Translate';
import TranslateCounterParser from '../../lib/Parsers/TranslateCounter';
import VariableParser from '../../lib/Parsers/Variable';


import { expect } from 'chai';

describe('Translate', () => {
    let subject: ITranslate;

    beforeEach(() => {
        // Init Translate and also Format with all parsers
        const format = new Format;
        format.addParser(TranslateParser);
        format.addParser(TranslateCounterParser);
        format.addParser(VariableParser);
        subject = new Translate(new TranslateAdaptorDummy, format);
    });

    it('should be an instance of Translate class', () => {
        expect(subject).to.be.an.instanceOf(Translate);
    });

    it('should return the translated text for provided key', () => {
        let result: Promise<string> = subject.get('%IDS_ComplexText%', {track_count: 1});
        return result.then((translatedText) => {
            expect(translatedText).to.be.eql('There is 1 track on this album');
        });
    });

});
