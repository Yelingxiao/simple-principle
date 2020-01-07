import { isString, isArray } from "./utils";
export const ShapeFlags = {
  ELEMENT: 1,
  FUNCTIONAL_COMPONENT: 1 << 1,
  STATEFUL_COMPONENT: 1 << 2,
  TEXT_CHILDREN: 1 << 3,
  ARRAY_CHILDREN: 1 << 4,
  SLOTS_CHILDREN: 1 << 5
};
export function normalizeChildren(node, children) {
  if (isString(children)) {
    node.children = children;
  }
  let type = 0;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN;
  } else if (typeof children === "object") {
    type = ShapeFlags.ARRAY_CHILDREN;
    children = [children];
  } else {
    children = isString(children) ? children : children + "";
    type = ShapeFlags.TEXT_CHILDREN;
  }
  node.children = children;
  node.shapeFlag |= type;
}

export function h(type, props, children) {
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;
  const Node = {
    type: type,
    props,
    shapeFlag,
    children: null
  };
  normalizeChildren(Node, children);
  return Node;
}
