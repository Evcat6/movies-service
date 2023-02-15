import { CreateElementArguments } from '../interfaces/domHelper.interface';

function createElement({
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

function removeElementByDataKey(dataKey: number): void {
    const element = document.querySelector(`[data-key="${dataKey}"]`);
    element?.remove();
}

function removeAllChildrens(element: Element): void {
    let delChild = element.lastChild as ChildNode;
    while (delChild) {
        element?.removeChild(delChild);
        delChild = element.lastChild as ChildNode;
    }
}

export { createElement, removeElementByDataKey, removeAllChildrens };
