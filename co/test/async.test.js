const assert = require('assert');

const co = require('../index');

describe('async await:', () => {
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

    it('async function should be invoked correctly', async function () {
        this.timeout(3000);
        const a = await fPromise(1);
        const b = await fPromise(2);
        assert(a + b === 3);
    });
});