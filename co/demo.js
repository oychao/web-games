const f = function (x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 1000);
    });
};

const asyncF = async function () {
    const a = await f(1);
    const b = await f(2);
    return a + b;
};

asyncF().then(x => {
    console.log(x);
}).catch(err => void 0);
