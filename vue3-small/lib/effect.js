import { targetMap } from "./reactive";

export const activeReactiveEffectStack = [];

export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect();
  }
  return effect;
}

function createReactiveEffect(fn, options) {
  const effect = function effect(...args) {
    return run(effect, fn, args);
  };
  effect.isEffect = true;
  effect.active = true;
  effect.scheduler = options.scheduler;
  effect.deps = [];
  return effect;
}

function run(effect, fn, args) {
  if (!effect.active) {
    return fn(...args);
  }
  if (activeReactiveEffectStack.indexOf(effect) === -1) {
    cleanup(effect);
    try {
      activeReactiveEffectStack.push(effect);
      return fn(...args);
    } finally {
      activeReactiveEffectStack.pop();
    }
  }
}

function cleanup(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}

let shouldTrack = true;

export function pauseTracking() {
  shouldTrack = false;
}

export function resumeTracking() {
  shouldTrack = true;
}

export function track(target, key) {
  if (!shouldTrack) {
    return;
  }
  const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1];
  if (effect) {
    let depsMap = targetMap.get(target);
    if (depsMap === void 0) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (dep === void 0) {
      depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(effect)) {
      dep.add(effect);
      effect.deps.push(dep);
    }
  }
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (depsMap === void 0) {
    return;
  }
  const effects = new Set();

  if (key !== void 0) {
    const effectsToAdd = depsMap.get(key);
    if (effectsToAdd !== void 0) {
      effectsToAdd.forEach(effect => {
        effects.add(effect);
      });
    }
  }

  const run = effect => {
    if (effect.scheduler !== void 0) {
      effect.scheduler(effect);
    } else {
      effect();
    }
  };
  effects.forEach(run);
}
