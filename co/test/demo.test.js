const assert = require('assert');

const f = function (x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 1e3);
    });
};

describe('test', () => {
    it('should be correct', async function () {
        this.timeout(3000);
        const a = await f(1);
        const b = await f(2);
        assert(a + b === 3);
    });
});
