import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    // this.modal = modal;
    // this.elem = this.createModal();
    this._onKeydown = this._onKeydown.bind(this);
    this._title = '';
    this._body = null;
  }
  open() {
    this.elem = this.render();
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this._onKeydown);
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
    if (this._title) {
      this.elem.querySelector('.modal__title').textContent = this._title;
    }
    if (this._body) {
      const body = this.elem.querySelector('.modal__body');
      body.innerHTML = '';
      body.append(this._body);
    }
  }
  setTitle(title) {
    this._title = title;
    if (this.elem) {
      this.elem.querySelector('.modal__title').textContent = title;
    }
  }
  setBody(node) {
    this._body = node;
    if (this.elem) {
      const body = this.elem.querySelector('.modal__body');
      body.innerHTML = '';
      body.append(node);
    }
  }
  close() {
    if (this.elem) {
      this.elem.remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this._onKeydown);
    }
  }
  _onKeydown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
  render() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }
}
