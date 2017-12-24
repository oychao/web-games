import assert from 'assert';

import { readonly } from '../index';

describe('readonly', () => {
    let Foo;
    beforeEach(function () {
        Foo = class {
            @readonly
            sayHello() {
                return 'hello';
            }
        };
    });

    it('should not be writable', function () {
        assert.throws(function () {
            const f = new Foo();
            f.sayHello = function () { };
        }, Error, 'method is not writable');
    });
});
