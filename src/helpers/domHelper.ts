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

function removeAllChildrens(element: Element) {
    let delChild = element?.lastChild;
    while (delChild) {
        element?.removeChild(delChild);
        delChild = element?.lastChild;
    }
}

export { createElement, removeElementByDataKey, removeAllChildrens };
