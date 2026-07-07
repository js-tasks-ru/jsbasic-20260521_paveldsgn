import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;   
    this.steps = steps;     
    this.elem = this.render();
    this.segments = this.steps - 1;    
  }
  render() {
    const percents = this.segments === 0 ? 0 : (this.value / this.segments) * 100;
    
    let stepsHTML = '';
    for (let i = 0; i < this.steps; i++) {
      const activeClass = i === this.value ? 'slider__step-active' : '';
      stepsHTML += `<span class="${activeClass}"></span>`;
    }

    const slider = createElement(`
      <div class="slider">

        <div class="slider__thumb" style="left: ${percents}%;">
          <span class="slider__value">${this.value}</span>
        </div>

        <div class="slider__progress" style="width: ${percents}%;"></div>

        <div class="slider__steps">
          ${stepsHTML}
        </div>
      </div>
    `);
    slider.addEventListener('click', this.handleClick.bind(this));

    return slider;
  }

  handleClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const value = Math.round(leftRelative * this.segments);

    if (value === this.value) return;

    this.value = value;

    this.updateSlider();

    const eventChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(eventChange);
  }
  updateSlider() {
    const percents = this.segments === 0 ? 0 : (this.value / this.segments) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const valueSpan = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${percents}%`;
    valueSpan.textContent = this.value;
    progress.style.width = `${percents}%`;
    
    const sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    sliderSteps.forEach((step, i) => {
      step.classList.toggle('slider__step-active', i === this.value);
    });
  }
}
