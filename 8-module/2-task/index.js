import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }
  render() {
    const grid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    this.renderProducts(grid.querySelector('.products-grid__inner'), this.products);
    return grid;
  }

  renderProducts(container, products) {
    container.innerHTML = '';
    for (let product of products) {
      const card = new ProductCard(product);
      container.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const filteredProducts = this.products.filter(product => this.isProductMatchFilters(product));

    const inner = this.elem.querySelector('.products-grid__inner');
    this.renderProducts(inner, filteredProducts);
  }

  isProductMatchFilters(product) {
    if (this.filters.noNuts && product.nuts) {
      return false;
    }

    if (this.filters.vegeterianOnly && product.vegeterian !== true) {
      return false;
    }

    if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
      return false;
    }

    if (this.filters.category && product.category !== this.filters.category) {
      return false;
    }

    return true;
  }

}
