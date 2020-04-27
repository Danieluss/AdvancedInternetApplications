
export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function refreshState(obj, newValues) {
    return Object.assign(JSON.parse(JSON.stringify(obj)), newValues);
}
