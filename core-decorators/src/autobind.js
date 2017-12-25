export default function (target, name, {
    value: fn,
    configurable,
    enumerable
}) {
    return {
        configurable,
        enumerable,
        get() {
            return fn.bind(this);
        },
        set(newFn) {
            fn = newFn;
        }
    };
};
