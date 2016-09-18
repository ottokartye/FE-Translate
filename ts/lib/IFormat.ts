/// <reference path="../../typings/index.d.ts" />

import IParser from './IParser';
import IConverter from './IConverter';
import ITranslationData from './ITranslationData';

interface IFormat {
	parsers: Array<IParser>;
	converters: Array<IConverter>;
	
	addParser(parser: IParser);
	addConverter(converter: IConverter);
	format(text: string, data: ITranslationData): Promise<string>;
}

export default IFormat;