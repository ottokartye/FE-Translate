/// <reference path="../../typings/index.d.ts" />

type ConverterCallback = (value: string) => string | Promise<string>;

interface IConverter {
	name: string;
	callback: ConverterCallback;
}

export default IConverter;