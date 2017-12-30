const assert = require('assert');

const co = require('../index');

describe('co:', () => {
    let fPromise;
    let fThunk;
    
    beforeEach(function () {
        fPromise = function (x) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(x);
                }, 5e2);
            });
        };
        fThunk = function (x) {
            return function (callback) {
                setTimeout(function () {
                    callback(x);
                }, 5e2);
            };
        };
    });

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

    it('should throw an error', function () {
        assert.throws(function () {
            co(function gen() {
                // do sth
            });
        }, Error, 'parameter must be a generator function');
    });
});
