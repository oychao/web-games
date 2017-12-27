import { expect } from 'chai';

import { enumerable } from '../index';

describe('@enumerable', () => {
    class Foo {
        sayHello() {
            return 'hello'
        }
        @enumerable
        greeting() {
            return 'greetings';
        }
    }

    it('method greeting should be enumerable', function () {
        const f = new Foo();
        let greeting;
        for (let key in f) {
            greeting = key === 'greeting' ? key : greeting;
        }
        expect(greeting).to.equal('greeting');
    });
});
