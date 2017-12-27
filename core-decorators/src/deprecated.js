export default function () {
    let msg;
    const defaultDeprecated = function (target, name, {
        value: fn,
        configurable,
        enumerable
    }) {
        const defaultMsg = `DEPRECATION: ${target.constructor.name}#${name} is deprecated and will not be supported in the future.`;
        return {
            configurable,
            enumerable,
            value() {
                console.warn(msg || defaultMsg);
                fn();
            }
        }
    };

    if (arguments.length === 1) {
        msg = arguments[0];
        return defaultDeprecated;
    } else {
        return defaultDeprecated(...arguments);
    }
};
