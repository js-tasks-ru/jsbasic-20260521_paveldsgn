import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.segments = steps - 1;
    this.elem = this.render();
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
    const thumb = slider.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));
    slider.addEventListener('click', this.handleClick.bind(this));
    return slider;
  }

  handleClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

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

  onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove(event) {
  event.preventDefault();

  const left = event.clientX - this.elem.getBoundingClientRect().left;
  let leftRelative = left / this.elem.offsetWidth;

  if (leftRelative < 0) leftRelative = 0;
  if (leftRelative > 1) leftRelative = 1;

  const leftPercents = leftRelative * 100;

  const thumb = this.elem.querySelector('.slider__thumb');
  const progress = this.elem.querySelector('.slider__progress');
  thumb.style.left = `${leftPercents}%`;
  progress.style.width = `${leftPercents}%`;

  const value = Math.round(leftRelative * this.segments);
  this.value = value;

  const valueSpan = this.elem.querySelector('.slider__value');
  valueSpan.textContent = this.value;

  const steps = this.elem.querySelectorAll('.slider__steps span');
  steps.forEach((step, i) => {
    step.classList.toggle('slider__step-active', i === this.value);
  });
  }

  onPointerUp(event) {
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    const eventChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(eventChange);
  }

  updateSlider() {
    const percents = (this.value / this.segments) * 100;

    console.log('Текущее значение:', this.value, 'Проценты:', percents);

    const thumb = this.elem.querySelector('.slider__thumb');
    const valueSpan = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${percents}%`;
    valueSpan.textContent = this.value;
    progress.style.width = `${percents}%`;

    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, i) => {
      step.classList.toggle('slider__step-active', i === this.value);
    });
  }

}