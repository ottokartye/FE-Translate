"use strict";
const Dummy_1 = require('../../../lib/Translate/Adaptor/Dummy');
const chai_1 = require('chai');
describe('TranslateAdaptorDummy', () => {
    const subject = new Dummy_1.default;
    it('should be an instance of TranslateAdaptorDummy', () => {
        chai_1.expect(subject).to.be.an.instanceOf(Dummy_1.default);
    });
    it('should return the translation for the provided OFFER key', () => {
        const promise = subject.get('OFFER');
        return promise.then((result) => {
            chai_1.expect(result).to.be.eql({ singular: 'offer', plural: 'offers' });
        });
    });
});
