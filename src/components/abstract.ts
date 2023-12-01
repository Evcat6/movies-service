import { CreateElementArguments } from '../common/types/createElement.type';

class AbstractComponent {
  protected createElement({
    tagName,
    className,
    attributes = {},
  }: CreateElementArguments): HTMLElement {
    const element = document.createElement(tagName);

    if (className) {
      const classNames = className.split(' ').filter(Boolean);
      element.classList.add(...classNames);
    }

    Object.keys(attributes).forEach((key: string) =>
      element.setAttribute(key, attributes[key])
    );

    return element;
  }

  protected removeElementByDataKey(dataKey: number): void {
    const element = document.querySelector(`[data-key="${dataKey}"]`);
    element?.remove();
  }

  protected removeAllChildren(element: Element): void {
    let delChild = element.lastChild as ChildNode;
    while (delChild) {
      element?.removeChild(delChild);
      delChild = element.lastChild as ChildNode;
    }
  }
}

export { AbstractComponent };
