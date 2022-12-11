export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
