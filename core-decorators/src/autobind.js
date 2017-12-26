const bindMethod = function (target, key, {
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

const bindClass = function (target) {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
    const keyNames = Object.getOwnPropertyNames(target.prototype);
    keyNames.forEach(function (key) {
        key !== 'constructor' && Reflect.defineProperty(target.prototype, key, bindMethod(target.prototype, key, descriptors[key]));
    });
};

export default function () {
    const args = [...arguments];
    if (args.length === 1) {
        return bindClass(...args);
    } else {
        return bindMethod(...args);
    }
};
