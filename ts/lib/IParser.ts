import IFormat from './IFormat';

type ParserCallback = (params: string | string[], data?: any, sentence?: string) => string | Promise<string>;

interface IParser {
	regularExpression: RegExp;
	callback: ParserCallback;
}

export default IParser;