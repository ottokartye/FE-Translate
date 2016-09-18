interface ITranslate {
    get: (key: string, data?: any) => Promise<string>;
}

export default ITranslate;