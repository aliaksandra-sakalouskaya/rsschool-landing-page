'use strict';

const theme = window.localStorage.getItem('theme');
const switchThemeElement = document.getElementById('switch-theme-js');
const htmlElement = document.documentElement;
if(theme) {
  htmlElement.dataset.theme = theme;
} 

switchThemeElement.addEventListener('click', function () {
  if(htmlElement.dataset.theme === 'light') {
    htmlElement.dataset.theme = 'dark';
    window.localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.dataset.theme = 'light';
    window.localStorage.setItem('theme', 'light');
  }
});

console.log(window.location.pathname);