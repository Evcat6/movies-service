import { IComponent } from '../common/interfaces/IComponent.interface';
import { AbstractComponent } from './abstract';

class CardDescriptionComponent extends AbstractComponent implements IComponent {
  private cardBody: HTMLElement = this.createElement({
    tagName: 'div',
    className: 'card-body',
  });

  private dateContainer: HTMLElement = this.createElement({
    tagName: 'div',
    className: 'd-flex justify-content-between align-items-center',
  });

  private dateText: HTMLElement = this.createElement({
    tagName: 'small',
    className: 'text-muted',
  });

  private cardTitle: HTMLElement = this.createElement({
    tagName: 'p',
    className: 'card-text truncate',
  });

  constructor(title: string, date: string) {
    super();
    this.dateText.innerHTML = date;
    this.cardTitle.innerHTML = title;
  }

  public build() {
    this.cardBody.appendChild(this.cardTitle);
    this.dateContainer.appendChild(this.dateText);
    this.cardBody.appendChild(this.dateContainer);
    return this.cardBody;
  }
}

export { CardDescriptionComponent };
