import TranslateAdaptorDummy from '../../../lib/Translate/Adaptor/Dummy';
import { expect } from 'chai';

describe('TranslateAdaptorDummy', () => {

    const subject: TranslateAdaptorDummy = new TranslateAdaptorDummy;

    it('should be an instance of TranslateAdaptorDummy', () => {
        expect(subject).to.be.an.instanceOf(TranslateAdaptorDummy);
    });

    it('should return the translation for the provided OFFER key', () => {
        const promise = subject.get('OFFER');
        return promise.then((result) => {
            expect(result).to.be.eql({ singular: 'offer', plural: 'offers'});
        });
        
    });
});