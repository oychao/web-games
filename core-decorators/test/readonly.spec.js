import { expect } from 'chai';

import { readonly } from '../index';

describe('@readonly', () => {
    class Foo {
        @readonly
        sayHello() {
            return 'hello';
        }
    };

    it('should not be writable', function () {
        expect(function () {
            const f = new Foo();
            f.sayHello = function () { };
        }).to.throw(Error);
    });
});
