import { expect } from 'chai';
import 'mocha-sinon';

import { before } from '../index';

describe('@before', () => {
    let f;

    const recognize = function (friend) {
        console.info(`Look! it's ${friend}`);
    };

    class Foo {
        @before(recognize)
        sayHello(friend) {
            console.info(`Hi! ${friend}`);
        }

        @before(recognize)
        sayHi(friend) {
            return `Hi! ${friend}`;
        }
    }

    beforeEach(function () {
        f = new Foo();
        this.sinon.stub(console, 'info');
    });

    it('should invoke the @before method first', function () {
        f.sayHello('Jim Green')
        expect(console.info.calledTwice).to.be.true;
        expect(console.info.calledWith('Look! it\'s Jim Green')).to.be.true;
        expect(console.info.calledWith('Hi! Jim Green')).to.be.true;
    });

    it('should return right result when passing arguments to the function', function () {
        expect(f.sayHi('Ouyang')).to.equal('Hi! Ouyang');
        expect(console.info.calledOnce).to.be.true;
        expect(console.info.calledWith('Look! it\'s Ouyang')).to.be.true;
    });
});
