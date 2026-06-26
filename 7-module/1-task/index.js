import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createMenu();
    this.scrollMenu(this.elem);
  }
  createMenu() {

    const linksHTML = this.categories.map(category => {
      const activeClass = category.id === '' ? 'ribbon__item_active' : '';
      return `
      <a href="#" class="ribbon__item ${activeClass}" data-id="${category.id}">${category.name}</a>
      `
    }).join('');

    const menu = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      
        <nav class="ribbon__inner">
          ${linksHTML}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    return menu;
  }

  scrollMenu(menu) {
    const arrowLeft = menu.querySelector('.ribbon__arrow_left');
    const arrowRight = menu.querySelector('.ribbon__arrow_right');
    const ribbonInner = menu.querySelector('.ribbon__inner');

    const updateArrows = () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollWidth = ribbonInner.scrollWidth;
      const clientWidth = ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      // console.log('scrollLeft:', scrollLeft);
      // console.log('scrollRight:', scrollRight);

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    };

    ribbonInner.addEventListener('scroll', updateArrows);

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    updateArrows();

    const menuLinks = ribbonInner.querySelectorAll('.ribbon__item');
    menuLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        menuLinks.forEach(links => links.classList.remove('ribbon__item_active'));
        link.classList.add('ribbon__item_active');

      const customEvent = new CustomEvent('ribbon-select', {
        detail: link.dataset.id,
        bubbles: true,
      });
      console.log("detail:", link.dataset.id);
      this.elem.dispatchEvent(customEvent);
      });
    });
  }
}
