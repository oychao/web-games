import { expect } from 'chai';
import 'mocha-sinon';

import { before } from '../index';

describe('@before', () => {
    let f;

    const recognize = function (friend) {
        console.info(`Look! it's ${friend}`);
    };

    const think = function (friend) {
        console.info(`Is that ${friend}?`);
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

        @before(think, recognize)
        sayHiAgain(friend) {
            console.info(`Hi! ${friend}`);
        }

        @before([think, recognize])
        sayHelloAgain(friend) {
            console.info(`Hi! ${friend}`);
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

    it('should not throw any error if multiple arguments is given', function () {
        f.sayHiAgain('Ouyang');
        expect(console.info.calledThrice).to.be.true;
        expect(console.info.calledWith('Is that Ouyang?')).to.be.true;
        expect(console.info.calledWith('Look! it\'s Ouyang')).to.be.true;
        expect(console.info.calledWith('Hi! Ouyang')).to.be.true;
    });

    it('should not throw any error if multiple arguments is given as one array', function () {
        f.sayHelloAgain('Ouyang');
        expect(console.info.calledThrice).to.be.true;
        expect(console.info.calledWith('Is that Ouyang?')).to.be.true;
        expect(console.info.calledWith('Look! it\'s Ouyang')).to.be.true;
        expect(console.info.calledWith('Hi! Ouyang')).to.be.true;
    });
});
