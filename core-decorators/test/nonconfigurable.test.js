import assert from 'assert';

import { nonconfigurable, readonly } from '../index';

describe('@nonconfigurable', () => {
    let Foo;

    beforeEach(function () {
        Foo = class {
            @readonly
            @nonconfigurable
            sayHello() {
                return 'hello'
            }
        };
    });

    it('should not be configurable', function () {
        assert.throws(function () {
            const f = new Foo();
            Object.defineProperty(Foo.prototype, 'sayHello', {
                value: 'simply cannot'
            });
        }, Error, 'should not be configurable');
    });
});