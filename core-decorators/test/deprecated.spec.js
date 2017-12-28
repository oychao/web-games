import { expect } from 'chai';
import 'mocha-sinon';

import { deprecated } from '../index';

describe('@deprecated', () => {
    let f;

    class Foo {
        @deprecated
        sayHello() {
            return 'hello';
        }

        @deprecated
        sayHi(friend) {
            return `Hi! ${friend}`;
        }

        @deprecated('this method is deprecated')
        greeting() {
            return 'greetings';
        }
    }

    beforeEach(function () {
        f = new Foo();
        this.sinon.stub(console, 'warn');
    });

    it('should output the warn message', function () {
        f.sayHello();
        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledWith('DEPRECATION: Foo#sayHello is deprecated and will not be supported in the future.')).to.be.true;
    });

    it('should output customized warn message', function () {
        f.greeting();
        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledWith('this method is deprecated')).to.be.true;
    });

    it('should return right result when passing arguments to the function', function () {
        expect(f.sayHi('Ouyang')).to.equal('Hi! Ouyang');
    });
});
