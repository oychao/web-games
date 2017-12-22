module.exports = function(gen) {
    const g = gen();

    (function next(val) {
        const stage = g.next(val);
        if(stage.done) {
            return;
        }
        stage.value.then(next);
    })();
};
