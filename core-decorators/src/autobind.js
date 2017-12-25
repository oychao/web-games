export default function (target, name, {
    value: fn,
    configurable,
    enumerable
}) {
    return {
        configurable,
        enumerable,
        get() {
            if (this === target || typeof fn !== 'function') {
                return fn;
            }
            return fn.bind(this);
        },
        set(newFn) {
            fn = newFn;
        }
    };
};
