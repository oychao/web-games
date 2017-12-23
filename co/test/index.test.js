const assert = require('assert');

const co = require('../index');

const fPromise = function (x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 5e2);
    });
};

const fThunk = function (x) {
    return function (callback) {
        setTimeout(function () {
            callback(x);
        }, 5e2);
    };
};

describe('async await:', () => {
    it('async function should be invoked correctly', async function () {
        this.timeout(3000);
        const a = await fPromise(1);
        const b = await fPromise(2);
        assert(a + b === 3);
    });
});

describe('co:', () => {
    it('promise async control should be run correctly', function (done) {
        co(function* gen() {
            const a = yield fPromise(1);
            const b = yield fPromise(2);
            assert(a + b === 3);
            done();
        });
    });

    it('thunk function control should be run correctly', function (done) {
        co(function* gen() {
            const a = yield fThunk(1);
            const b = yield fThunk(2);
            assert(a + b === 3);
            done();
        });
    });
});

describe('error:', () => {
    it('should throw an error', function () {
        assert.throws(function () {
            co(function gen() {
                // do sth
            });
        }, Error, 'parameter must be a generator function');
    });
});
