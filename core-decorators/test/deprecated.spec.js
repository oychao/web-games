import { expect } from 'chai';
import 'mocha-sinon';

import { deprecated } from '../index';

describe('@deprecated', () => {
    class Foo {
        @deprecated
        sayHello() {
            return 'hello';
        }
    }

    beforeEach(function() {
        this.sinon.stub(console, 'warn');
    });

    it('should output the warn message', function () {
        const f = new Foo();
        f.sayHello();
        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledWith('DEPRECATION: Foo#sayHello is deprecated and will not be supported in the future.')).to.be.true;
    });
});
