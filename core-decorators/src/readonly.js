module.exports = function (target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
