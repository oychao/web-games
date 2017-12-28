export default function () {
    const args = [...arguments];
    if (args.length === 0) {
        throw new Error('DECORATOR "after" must accept at least 1 function');
    }
    if (args.length === 1 && Array.isArray(args[0])) {
        args.pop().forEach(arg => void args.push(arg));
    }
    args.forEach(arg => {
        if (typeof arg !== 'function') {
            throw new Error('DECORATOR "after" only accept functions as its parameters');
        }
    });
    return function (target, name, {
        value: fn,
        configurable,
        enumerable
    }) {
        return {
            configurable,
            enumerable,
            value() {
                const ret = fn(...arguments);
                args.forEach(arg => {
                    arg(...arguments);
                });
                return ret;
            }
        };
    };
};
