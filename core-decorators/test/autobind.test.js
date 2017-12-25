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

    it('should return this correctly', function () {
        const f = new Foo();
        const sayHello = f.sayHello;
        assert(f === sayHello());
    });
});
