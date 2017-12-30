import { expect } from 'chai';

import { readonly } from '../index';

describe('@readonly', () => {
    let f;

    class Foo {
        @readonly
        sayHello() {
            return 'hello';
        }
    };

    beforeEach(function () {
        f = new Foo();
    });

    it('should not be writable', function () {
        expect(function () {
            f.sayHello = function () { };
        }).to.throw(Error);
    });
});
