import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.initCarousel(this.elem);
    //test
  }
  
  render() {
    return this.createCarousel();
  }

  createCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg">
        </div>
      </div>
    `);

    const slidesContainer = this.createSlides();
    carousel.append(slidesContainer);
    
    return carousel;
  }

  createSlides() {
    const container = document.createElement('div');
    container.className = 'carousel__inner';

    for (let slide of this.slides) {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      const button = slideElement.querySelector('.carousel__button');
      button.addEventListener('click', () => {
        const event = new CustomEvent('product-add', {
          detail: slide.id,
          bubbles: true
        });
        this.elem.dispatchEvent(event);
        console.log('product-add:', slide.id);
      });

      container.append(slideElement);
    }

    return container;
  }

  initCarousel(carousel) {
    let arrowRight = carousel.querySelector('.carousel__arrow_right');
    let arrowLeft = carousel.querySelector('.carousel__arrow_left');
    let carouselInner = carousel.querySelector('.carousel__inner');
    arrowLeft.style.display = 'none';

    let slideWidth = 0;
    const getSlideWidth = () => {
      if (slideWidth > 0) return slideWidth;

      const firstSlide = carousel.querySelector('.carousel__slide');
      
      if (firstSlide) {
        slideWidth = firstSlide.offsetWidth;
      }
      if (slideWidth === 0) {
        slideWidth = carousel.getBoundingClientRect().width;
      }
      return slideWidth;
    };

    // let slideWidth = carousel.getBoundingClientRect().width;
    // console.log('Ширина слайда:', slideWidth);

    let currentSlide = 0;
    let totalSlide = this.slides.length;


    arrowRight.addEventListener('click', () => {
      const width = getSlideWidth();
      if (currentSlide < totalSlide - 1) {
        arrowLeft.style.display = '';        
        currentSlide++;
        let shift = -currentSlide * slideWidth;   
        carouselInner.style.transform = `translateX(${shift}px)`;
        // console.log('Клик вправо currentSlide:', currentSlide, 'shift:', shift);
      } 
      if (currentSlide === totalSlide - 1) {
        arrowRight.style.display = 'none';
      }
    });

    arrowLeft.addEventListener('click', () => {
      const width = getSlideWidth();
      if (currentSlide > 0) {
        arrowRight.style.display = '';
        currentSlide--;
        let shift = -currentSlide * slideWidth;
        carouselInner.style.transform = `translateX(${shift}px)`;
      }
      if (currentSlide === 0) {
        arrowLeft.style.display = 'none';
      }
    });
  }
}