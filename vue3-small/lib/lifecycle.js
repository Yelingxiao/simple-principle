import { currentInstance, setCurrentInstance } from "./index";
import { pauseTracking, resumeTracking } from "./effect";
import { isArray } from "./utils";

export const LifecycleHooks = {
  CREATED: "c",
  MOUNTED: "m",
  UPDATED: "u"
};

export function onCreate(fn, app = currentInstance) {
  injectHook(LifecycleHooks.CREATED, fn, app);
}

export function onMount(fn, app = currentInstance) {
  injectHook(LifecycleHooks.MOUNTED, fn, app);
}

export function onUpdate(fn, app = currentInstance) {
  injectHook(LifecycleHooks.UPDATED, fn, app);
}

export function injectHook(type, hook, target) {
  if (target) {
    (target[type] || (target[type] = [])).push((...args) => {
      pauseTracking();
      setCurrentInstance(target);
      const res = hook(...args);
      setCurrentInstance(null);
      resumeTracking();
      return res;
    });
  }
}

export function callHook(target, type, ...args) {
  if (target && isArray(target[type])) {
    target[type].forEach(hook => {
      hook(...args);
    });
  }
}

export function callMount(target = currentInstance) {
  return callHook(target, LifecycleHooks.MOUNTED);
}

export function callCreate(target = currentInstance) {
  return callHook(target, LifecycleHooks.CREATED);
}

export function callUpdate(target = currentInstance) {
  return callHook(target, LifecycleHooks.UPDATED);
}
