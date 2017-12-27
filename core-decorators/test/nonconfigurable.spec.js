import { expect } from 'chai';

import { nonconfigurable } from '../index';

describe('@nonconfigurable', () => {
    class Foo {
        @nonconfigurable
        sayHello() {
            return 'hello'
        }
    };

    it('should not be configurable', function () {
        expect(function () {
            const f = new Foo();
            Object.defineProperty(Foo.prototype, 'sayHello', {
                value: 'simply cannot'
            });
        }).to.throw(Error);
    });
});
