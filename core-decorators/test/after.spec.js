import { expect } from 'chai';
import 'mocha-sinon';

import { after } from '../index';

describe('@after', () => {
    let f;

    const think = n => void console.info(n);
    const doAdd = (a, b) => void console.info(a + b);
    const doSub = (a, b) => void console.info(a - b);
    const doDiv = (a, b) => void console.info(a / b);
    const doMul = (a, b) => void console.warn(a * b);

    class Foo {
        @after(think)
        learnNumber(n) {
            console.info(n);
        }

        @after(doAdd)
        learnAdd(a, b) {
            return a + b;
        }

        @after(think, doSub)
        learnSub(a, b) {
            console.info(a - b);
        }

        @after([think, doDiv])
        learnDiv(a, b) {
            console.info(a / b);
        }

        @after(doMul)
        learnMul(a, b) {
            console.info(a * b);
        }
    }

    beforeEach(function () {
        f = new Foo();
        this.sinon.stub(console, 'info');
    });

    it('decorating method should be invoked without error', function () {
        f.learnNumber(1);
        expect(console.info.calledTwice).to.be.true;
        expect(console.info.calledWith(1)).to.be.true;
        expect(console.info.calledWith(1)).to.be.true;
    });

    it('should return right result when passing arguments to decorating function', function () {
        expect(f.learnAdd(1, 2)).to.equal(3);
        expect(console.info.calledOnce).to.be.true;
        expect(console.info.calledWith(3)).to.be.true;
    });

    it('should not throw any error if multiple arguments is given', function () {
        f.learnSub(4, 3);
        expect(console.info.calledThrice).to.be.true;
        expect(console.info.calledWith(4)).to.be.true;
        expect(console.info.calledWith(1)).to.be.true;
        expect(console.info.calledWith(1)).to.be.true;
    });

    it('should not throw any error if multiple arguments is given as one array', function () {
        f.learnDiv(6, 2);
        expect(console.info.calledThrice).to.be.true;
        expect(console.info.calledWith(6)).to.be.true;
        expect(console.info.calledWith(3)).to.be.true;
        expect(console.info.calledWith(3)).to.be.true;
    });

    it('decorating function should be called before decorated function', function () {
        this.sinon.stub(console, 'warn');
        f.learnMul(2, 3);
        expect(console.info.calledOnce).to.be.true;
        expect(console.warn.calledOnce).to.be.true;
        expect(console.warn.calledAfter(console.info)).to.be.true;
    });
});
