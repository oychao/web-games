import { expect } from 'chai';

import { nonconfigurable } from '../index';

describe('@nonconfigurable', () => {
    let f;

    class Foo {
        @nonconfigurable
        sayHello() {
            return 'hello'
        }
    };

    beforeEach(function () {
        f = new Foo();
    });

    it('should not be configurable', function () {
        expect(function () {
            Object.defineProperty(Foo.prototype, 'sayHello', {
                value: 'simply cannot'
            });
        }).to.throw(Error);
    });
});
