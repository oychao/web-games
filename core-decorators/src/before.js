export default function () {
    const decorator = function (target, name, {
        value: fn,
        configurable,
        enumerable
    }) {
        const args = [...arguments];
        if (args.length === 0) {
            throw new Error('DECORATOR "before" must accept at least 1 function');
        }
        if (args.length === 1 && typeof Array.isArray(args[0])) {
            args.concat(args.pop());
        }
        args.forEach(arg => {
            if (typeof arg !== 'function') {
                throw new Error('DECORATOR "before" only accept functions as its parameters');
            }
        });
        return {
            configurable,
            enumerable,
            value() {
                args.forEach(arg => {
                    arg(...arguments)
                });
                fn(...arguments);
            }
        };
    };
};
