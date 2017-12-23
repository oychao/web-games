module.exports = function (gen) {
    const g = gen();

    if (Object.prototype.toString.call(g) !== '[object Generator]') {
        throw new Error('parameter must be a generator function');
    }

    (function next(val) {
        const stage = g.next(val);
        if (stage.done) {
            return;
        }
        if (!!stage.value.then) {
            stage.value.then(next);
        } else {
            stage.value(next);
        }
    })();
};
