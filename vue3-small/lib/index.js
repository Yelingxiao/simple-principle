export * from "./render";
export * from "./reactive";
export * from "./effect";
export * from "./lifecycle";
import { patch } from "./patch";
import { effect } from "./effect";
import { parentNode } from "./nodeOpts";
import { queueJob } from "./scheduler";
import { callCreate, callMount, callUpdate } from "./lifecycle";

export let currentInstance = null;

export const getCurrentInstance = () => currentInstance;

export const setCurrentInstance = instance => {
  currentInstance = instance;
};

export function mount(app, query) {
  if (typeof query === "string") {
    query = document.querySelector(query);
  }
  const { render, setup } = app;
  currentInstance = app;
  const data = setup();
  Object.assign(app, data);
  currentInstance = null;
  callCreate(app);
  if (render) {
    let mounted = false;
    effect(
      () => {
        if (!mounted) {
          const tree = (app.tree = render.call(app));
          patch(null, tree, query);
          callMount(app);
          mounted = true;
        } else {
          const preTree = app.tree;
          const nextTree = (app.tree = render.call(app));
          patch(preTree, nextTree, parentNode(preTree.el));
          callUpdate(app);
        }
      },
      {
        scheduler: queueJob
      }
    );
  }
}
