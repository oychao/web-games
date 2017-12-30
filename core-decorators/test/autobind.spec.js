import assert from 'assert';
import { expect } from 'chai';

import { autobind } from "../index";

describe('@autobind', () => {
    let f;

    describe('bindMethod', () => {
        class Foo {
            @autobind
            sayHello() {
                return this;
            }
        };

        beforeEach(function () {
            f = new Foo();
        });

        it('should bind this when "this" is an instance', function () {
            const sayHello = f.sayHello;
            expect(f).to.equal(sayHello());
        });

        it('should contains "bound" in the method name', function () {
            expect(f.sayHello.name).to.have.string('bound');
        });

        it('should not bind this when "this" is prototype', function () {
            expect(Foo.prototype.sayHello.name).to.not.have.string('bound');
        });

        it('should be able to set new function to value of the key', function () {
            f.sayHello = function () {
                return this;
            };
            const sayHello = f.sayHello;
            expect(f).to.equal(sayHello());
        });

        it('should not bind this if new value is not a function', function () {
            expect(function () {
                f.sayHello = 1;
            }).to.not.throw();
            expect(f.sayHello).to.equal(1);
        });
    });

    describe('bindClass', () => {
        @autobind
        class Foo {
            sayHello() {
                return this;
            }
            sayHelloAgain() {
                return this;
            }
        };

        beforeEach(function () {
            f = new Foo();
        });

        it('"this" should be bound in all methods of a class', function () {
            const sayHello = f.sayHello;
            const sayHelloAgain = f.sayHelloAgain;
            expect(f).to.equal(sayHello());
            expect(f).to.equal(sayHelloAgain());
        });
    });
});
