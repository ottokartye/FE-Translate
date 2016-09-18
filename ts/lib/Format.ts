/// <reference path="../../typings/index.d.ts" />

import IFormat from './IFormat';
import IParser from './IParser';
import IConverter from './IConverter';
import ITranslationData from './ITranslationData'; 
import * as ITranslation from './Translate/ITranslation';

export default class Format implements IFormat {
	// Collection of parsers (translation keys, variables, etc...)
	parsers: Array<IParser> = new Array();
	converters: Array<IConverter> = new Array();

	/**
	 * Parse the list of parsers and hand the job to Translate instance
	 * @param {string} text [description]
	 * @param {any}    data [description]
	 */
	public format(rawText: string, data: ITranslationData): Promise<string> {
		let translatedText: string = rawText;
		let promise: Promise<string> = Promise.resolve(translatedText);

		this.parsers.forEach((parser) => {
			if (parser.regularExpression.test(translatedText)) {
				promise = promise.then((currentText) => {
					return parser.callback(currentText.match(parser.regularExpression), data, currentText);
				});
			}
		});

		return promise;
	}

	/**
	 * Add a parser to the list of parsers
	 * @param {RegExp} regexp   Regular expression used for identifying keys
	 * @param {any}    callback Callback function
	 */
	public addParser(parser:IParser) {
		this.parsers.push(parser);
	}

	/**
	 * Add a converter to the list of converters
	 * @param  {string}     name [description]
	 * @param  {string) =>   string        | Promise<string>} callback [description]
	 * @return {IFormat}         [description]
	 */
	public addConverter(converter: IConverter) {
		this.converters.push(converter);
	}

	/**
	 * Convert provided string to regular expression
	 * @param  {string | RegExp}      expression [description]
	 * @return {RegExp}      [description]
	 */
	private static regExpConverter(expression: string | RegExp): RegExp {
		let result: RegExp;

		if (expression instanceof RegExp) {
			result = expression as RegExp;
		} else {
			result = new RegExp(expression as string, 'g');
		}

		return result;
	}
}

