import { isString } from "./utils";
import { ShapeFlags } from "./render";
import { createElement, insert, setElementText } from "./nodeOpts";
export function patchElement(n1, n2, container) {
  const el = (n2.el = n1.el);
  if (n2.shapeFlag & ShapeFlags.TEXT_CHILDREN && n1.children !== n2.children) {
    setElementText(el, n2.children);
  }
}

export function mountElement(node, container) {
  const el = (node.el = createElement(node.type));
  const { props, children, shapeFlag } = node;
  if (props != null) {
    for (const key in props) {
      patchProp(el, key, props[key]);
    }
  }
  insert(el, container);
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    setElementText(el, children);
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(null, children, el);
  }
}

export function mountChildren(children, container) {
  for (let i = start; i < children.length; i++) {
    patch(null, children[i], container);
  }
}

export function patchProp(el, key, value) {
  if (key.startsWith("on")) {
    el.addEventListener(key.slice(2).toLowerCase(), value);
  }
}

export function patch(n1 = null, n2, container) {
  if (n1 === null) {
    mountElement(n2, container);
  } else {
    patchElement(n1, n2, container);
  }
}
