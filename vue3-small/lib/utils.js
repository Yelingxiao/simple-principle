export const isObject = val => val !== null && typeof val === "object";
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);
export const isString = val => typeof val === "string";
export const isArray = Array.isArray