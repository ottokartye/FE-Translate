export interface ITranslation {
	[propName: string]: IWord;
}

export interface IWord {
	singular: string;
	plural?: string;
}
