import { expect } from 'chai';
import 'mocha-sinon';

import { before } from '../index';

describe('@before', () => {
    const recognize = function (friend) {
        console.info(`Look! it's ${friend}`);
    };
    class Foo {
        @before(recognize)
        sayHello(friend) {
            console.info(`Hi! ${friend}`);
        }
    }

    beforeEach(function () {
        this.sinon.stub(console, 'info');
    });

    it('should invoke the @before method first', function () {
        const f = new Foo();
        f.sayHello('Jim Green')
        expect(console.info.calledTwice).to.be.true;
        expect(console.info.calledWith('Look! it\'s Jim Green')).to.be.true;
        expect(console.info.calledWith('Hi! Jim Green')).to.be.true;
    });
});
