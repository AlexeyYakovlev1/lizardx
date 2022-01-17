import {
  IGlobal,
  IElement,
  ITypeOfSelector
} from '../interfaces/index';

const global: IGlobal = {
  checkList(target: any): Boolean {
    return Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection;
  },

  createElement({ tag, text, styles, attributes }: IElement): HTMLElement {
    const res: HTMLElement = document.createElement(tag);

    if (res instanceof Element) {
      if (typeof text === "string") {
        res.textContent = text;
      }

      if (styles && Object.keys(styles).length) {
        global.setStyles(res, styles);
      }

      if (attributes && Object.keys(attributes).length) {
        global.setAttributes(res, attributes);
      }
    }

    return res;
  },

  addElementOnPos(parent: HTMLElement, element: HTMLElement | IElement, pos: InsertPosition): void {
    if (parent instanceof Element) {
      // Html element
      if (element instanceof Element) {
        parent.insertAdjacentElement(pos, element);
      }

      // Object
      if (element && typeof element === "object" && !Array.isArray(element) && !(element instanceof Element || element instanceof HTMLElement)) {
        const el: HTMLElement = global.createElement(element);

        parent.insertAdjacentElement(pos, el);
      }
    }
  },

  setStyles(el: HTMLElement, obj: object): HTMLElement {
    for (const primary in obj) {
      el.style[primary] = obj[primary];
    }

    return el;
  },

  definesType(name: string): ITypeOfSelector {
    const obj: ITypeOfSelector = { name: name.replace("#", ""), attribute: "id" };

    if (name.includes(".")) {
      return { ...obj, name: name.replace(".", ""), attribute: "class" };
    }

    return obj;
  },

  setAttributes(el: HTMLElement, obj: object): HTMLElement {
    for (let attr in obj) {
      el.setAttribute(attr, Array.isArray(obj[attr]) ? obj[attr].join(" ") : obj[attr]);
    }

    return el;
  },

  setError(message: string): never {
    throw new Error(message);
  },

  removeChild(parent: any, element: string | Element, num?: string): void {
    if (parent instanceof Element) {
      if (num) {
        switch (num) {
          case "first":
            parent.removeChild(parent.firstElementChild);
            break;
          case "last":
            parent.removeChild(parent.lastElementChild);
            break;
        }
      }

      if (typeof element === "string" && element.length) {
        const findChild: HTMLElement | null = parent.querySelector(element);

        findChild && parent.removeChild(findChild);
      }

      if (element instanceof Element) {
        parent.removeChild(element);
      }
    } else {
      global.setError(`"${parent}" must be inherited from Element`);
    }
  },

  compare(item1: any, item2: any): Boolean {
    if ([item1, item2].every(item => item instanceof Element)) {
      return item1.isEqualNode(item2);
    } else if ([item1, item2].some(item => item instanceof Element)) {
      return false;
    } else {
      return JSON.stringify(item1) === JSON.stringify(item2);
    }
  },

  getAllParents(num?: number): Array<HTMLElement> | HTMLElement {
    if (this.target instanceof Element) {
      const getParent = (parent: HTMLElement | null, array: Array<HTMLElement>): Array<HTMLElement> => {
        const parents: Array<HTMLElement> = array;

        if (parent) {
          parents.push(parent);

          return getParent(parent.parentElement, parents);
        }

        return parents;
      }

      const res: Array<HTMLElement> = getParent(this.target, []);

      return (typeof num === "number" && num >= 0) ? res[num] : res;
    } else {
      global.setError(`"${this.target}" is not a HTML element`);
    }
  }
};

export default global;