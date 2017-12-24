export default function (target, name, descriptor) {
    descriptor.configurable = false;
    return descriptor;
};
