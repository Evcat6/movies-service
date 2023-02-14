import { createElement } from '../helpers/domHelper';

function createCardDescriptionBody(title: string, date: string): HTMLElement {
    const cardBody: HTMLElement = createElement({
        tagName: 'div',
        className: 'card-body',
    });

    const cardTitle: HTMLElement = createElement({
        tagName: 'p',
        className: 'card-text truncate',
    });
    cardTitle.innerHTML = title;

    const dateContainer: HTMLElement = createElement({
        tagName: 'div',
        className: 'd-flex justify-content-between align-items-center',
    });

    const dateText: HTMLElement = createElement({
        tagName: 'small',
        className: 'text-muted',
    });

    dateText.innerHTML = date;

    cardBody.appendChild(cardTitle);
    dateContainer.appendChild(dateText);
    cardBody.appendChild(dateContainer);
    return cardBody;
}

export { createCardDescriptionBody };
