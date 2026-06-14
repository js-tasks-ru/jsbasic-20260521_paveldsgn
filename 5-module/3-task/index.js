function initCarousel() {
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let slideContainer = document.querySelector('.carousel__inner');

  arrowLeft.style.display = 'none';

  let slideWidth = slideContainer.offsetWidth;
  let currentSlide = 0;
  let totalSlide = 4;


    arrowRight.addEventListener('click', () => {
      if (currentSlide < totalSlide - 1) {
        arrowLeft.style.display = '';        
        currentSlide++;
        let shift = -currentSlide * slideWidth;   
        slideContainer.style.transform = `translateX(${shift}px)`;
      } 
      if (currentSlide === totalSlide - 1) {
        arrowRight.style.display = 'none';
      }
    });

    arrowLeft.addEventListener('click', () => {
      if (currentSlide > 0) {
        arrowRight.style.display = '';
        currentSlide--;
        let shift = -currentSlide * slideWidth;
        slideContainer.style.transform = `translateX(${shift}px)`;
      }
      if (currentSlide === 0) {
        arrowLeft.style.display = 'none';
      }
    });
}
