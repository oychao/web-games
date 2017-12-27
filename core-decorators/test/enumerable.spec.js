import { expect } from 'chai';

import { enumerable } from '../index';

describe('@enumerable', () => {
    let f;

    class Foo {
        sayHello() {
            return 'hello'
        }
        @enumerable
        greeting() {
            return 'greetings';
        }
    }

    beforeEach(function () {
        f = new Foo();
    });

    it('method greeting should be enumerable', function () {
        let greeting;
        for (let key in f) {
            greeting = key === 'greeting' ? key : greeting;
        }
        expect(greeting).to.equal('greeting');
    });
});
