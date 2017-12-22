const assert = require('assert');

const co = require('../index');

const f = function (x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 5e2);
    });
};

describe('test', () => {
    it('async function should be invoked correctly', async function () {
        this.timeout(3000);
        const a = await f(1);
        const b = await f(2);
        assert(a + b === 3);
    });

    it('promise async control should be run correctly', function (done) {
        co(function* gen() {
            const a = yield f(1);
            const b = yield f(2);
            assert(a + b === 3);
            done();
        });
    });
});
