export default function (target, name, descriptor) {
    descriptor.configurable = false;
    descriptor.writable = false;
    return descriptor;
};
