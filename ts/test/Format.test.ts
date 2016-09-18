/// <reference path="../../typings/index.d.ts" />
"use strict";

import Format from '../lib/Format';
import IParser from '../lib/IParser';
import TranslateParser from '../lib/Parsers/Translate';
import VariableParser from '../lib/Parsers/Variable';

import { expect } from 'chai';

describe('Format', () => {

	const subject = new Format();

	it('should be an instance of class Format', () => {
		expect(subject).to.be.an.instanceOf(Format);
	});

	describe('addParser functionality', () => {
		it('should add new parsers to the parsers array', () => {
			subject.addParser(TranslateParser);
			subject.addParser(VariableParser);
			expect(subject.parsers).to.have.length(2);
		});
	});

	describe('addConverter functionality', () => {
		// TODO: write a converter first then implement this test
		it('should add a new converter to the converters array');
	});

	describe('format functionality', () => {
		it('should return a promise with the translated text', () => {
			let promise = subject.format('There is {count} %OFFER% in this %CITY%', {count: 4});
			return promise.then((translatedText) => {
				expect(translatedText).to.be.eql('There is 4 offer in this city');
			});
		});
	});
});