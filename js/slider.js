'use strict';

const productsList = document.querySelector('.products'); 
const slidesCount = productsList.children.length;
const nextBtn = document.querySelector('.slider__arrow--next');
const prevBtn = document.querySelector('.slider__arrow--prev');
const dots = document.querySelectorAll('.slider-dots button');
let currentIndex = 0;

const renderSlider = function() {
  console.log(currentIndex);
  productsList.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.remove('is-active');
    if (index === currentIndex) dot.classList.add('is-active');
  });
}

nextBtn.addEventListener('click', function() {
  currentIndex += 1;
  if (currentIndex === slidesCount) currentIndex = 0;

  renderSlider();
});

prevBtn.addEventListener('click', function() {
  currentIndex -= 1;
  if (currentIndex < 0) currentIndex = slidesCount - 1;

  renderSlider();
}); 

dots.forEach((dot, index) => {
  dot.addEventListener('click', function() {
    currentIndex = index;
    renderSlider();
  });
});