const doc = document;

export const createElement = tag => doc.createElement(tag);

export const insert = (child, parent, anchor) => {
  if (anchor != null) {
    parent.insertBefore(child, anchor);
  } else {
    parent.appendChild(child);
  }
};

export const createText = text => doc.createTextNode(text);

export const setElementText = (el, text) => {
  el.textContent = text;
};

export const parentNode = node => node.parentNode;
