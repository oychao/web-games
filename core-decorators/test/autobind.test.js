import assert from 'assert';

import { autobind } from "../index";

describe('@autobind', () => {
    describe('bindMethod', () => {
        let Foo;

        beforeEach(function () {
            Foo = class {
                @autobind
                sayHello() {
                    return this;
                }
            };
        });

        it('should bind this when "this" is an instance', function () {
            const f = new Foo();
            const sayHello = f.sayHello;
            assert(f === sayHello());
        });

        it('should contains "bound" in the method name', function () {
            const f = new Foo();
            assert(f.sayHello.name.split(' ')[0] === 'bound');
        });

        it('should not bind this when "this" is prototype', function () {
            assert(Foo.prototype.sayHello.name.split(' ')[0] !== 'bound');
        });

        it('should be able to set new function to value of the key', function () {
            const f = new Foo();
            f.sayHello = function () {
                return this;
            };
            const sayHello = f.sayHello;
            assert(sayHello() === f);
        });

        it('should not bind this if new value is not a function', function () {
            const f = new Foo();
            f.sayHello = 1;
            assert(f.sayHello === 1);
        });
    });

    describe('bindClass', () => {
        let Foo;

        beforeEach(function () {
            @autobind
            class _Foo {
                sayHello() {
                    return this;
                }
                sayHelloAgain() {
                    return this;
                }
            };
            Foo = _Foo;
        });

        it('"this" should be bound in all methods of a class', function () {
            const f = new Foo();
            const sayHello = f.sayHello;
            const sayHelloAgain = f.sayHelloAgain;
            assert(f === sayHello());
            assert(f === sayHelloAgain());
        });
    });
});
