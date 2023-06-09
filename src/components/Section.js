export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items,
    this._renderer = renderer,
    this._container = document.querySelector(containerSelector)
  }
  addItem(element) {
    this._container.prepend(element)
  }
  clear() {
    this._container.innerHTML = '';
  }
  renderItems(items) {
    this.clear();

    items.forEach(item => {
      this._renderer(item);
    });
  }
}