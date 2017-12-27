export default function () {
    const args = [...arguments];
    if (args.length === 0) {
        throw new Error('DECORATOR "before" must accept at least 1 function');
    }
    if (args.length === 1 && Array.isArray(args[0])) {
        args.concat(args.pop());
    }
    args.forEach(arg => {
        if (typeof arg !== 'function') {
            throw new Error('DECORATOR "before" only accept functions as its parameters');
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
                args.forEach(arg => {
                    arg(...arguments);
                });
                return fn(...arguments);
            }
        };
    };
};
