'use strict';

const switchThemeElement = document.getElementById('switch-theme-js');
const htmlElement = document.documentElement;

switchThemeElement.addEventListener('click', function () {
  if(htmlElement.dataset.theme === 'light') {
    htmlElement.dataset.theme = 'dark';
  } else {
    htmlElement.dataset.theme = 'light';
  }
});