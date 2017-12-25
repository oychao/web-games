import assert from 'assert';

import { autobind } from "../index";

describe('@autobind', () => {
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
});
