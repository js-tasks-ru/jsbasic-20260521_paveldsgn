import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    
      this.carousel = new Carousel(slides);
      const carouselHolder = document.querySelector('[data-carousel-holder]');
      carouselHolder.innerHTML = '';
      carouselHolder.append(this.carousel.elem);

      this.ribbonMenu = new RibbonMenu(categories);
      const ribbonHolder = document.querySelector('[data-ribbon-holder]');
      ribbonHolder.innerHTML = '';
      ribbonHolder.append(this.ribbonMenu.elem);

      this.stepSlider = new StepSlider({ steps: 5, value: 3 });
      const sliderHolder = document.querySelector('[data-slider-holder]');
      sliderHolder.innerHTML = '';
      sliderHolder.append(this.stepSlider.elem);

      this.cartIcon = new CartIcon();
      const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
      cartIconHolder.innerHTML = '';
      cartIconHolder.append(this.cartIcon.elem);

      this.cart = new Cart(this.cartIcon);

      const response = await fetch('products.json');
      this.products = await response.json();

      this.productsGrid = new ProductsGrid(this.products);
      const productsGridHolder = document.querySelector('[data-products-grid-holder]');
      productsGridHolder.innerHTML = '';
      productsGridHolder.append(this.productsGrid.elem);

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });

      document.body.addEventListener('product-add', (event) => {
        const product = this.products.find(p => p.id === event.detail);
        if (product) {
          this.cart.addProduct(product);
        }
      });

      document.body.addEventListener('slider-change', (event) => {
        this.productsGrid.updateFilter({
          maxSpiciness: event.detail
        });
      });

      document.body.addEventListener('ribbon-select', (event) => {
        this.productsGrid.updateFilter({
          category: event.detail
        });
      });

      document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked
        });
      });

      document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked
        });
      });

      return this;
    }
}
