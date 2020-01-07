import { isObject, hasOwn } from "./utils";
import { track, trigger } from "./effect";

export const targetMap = new WeakMap();

function get(target, key, receiver) {
  const res = Reflect.get(target, key, receiver);
  track(target, key);
  return isObject(res) ? reactive(res) : res;
}
function set(target, key, value, receiver) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key]
  const result = Reflect.set(target, key, value, receiver);
  if (hadKey && value !== oldValue) {
    trigger(target, key);
  }
  return result;
}

const baseHandles = {
  get,
  set
};

export function reactive(target) {
  const observed = new Proxy(target, baseHandles);
  if (!targetMap.has(target)) {
    targetMap.set(target, new Map());
  }
  return observed;
}
