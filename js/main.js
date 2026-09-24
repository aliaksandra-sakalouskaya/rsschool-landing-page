const theme = window.localStorage.getItem('theme');
const switchThemeElement = document.getElementById('switch-theme-js');
const htmlElement = document.documentElement;
const bodyElement = document.body;

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

const burgerElement = document.getElementById('burger-js');
const navElement = document.getElementById('mobile-nav');
const desktopSize = window.matchMedia('(min-width: 769px)');

const openMobileMenu = function() {
  bodyElement.classList.add('is-menu-open');
  burgerElement.setAttribute('aria-expanded', 'true');
  burgerElement.setAttribute('aria-label', 'Close mobile menu');
}

const closeMobileMenu = function() {
  bodyElement.classList.remove('is-menu-open');
  burgerElement.setAttribute('aria-expanded', 'false');
  burgerElement.setAttribute('aria-label', 'Open mobile menu');
}

const toggleMobileMenu = function() {
  if(bodyElement.classList.contains('is-menu-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

burgerElement.addEventListener('click', function() {
  toggleMobileMenu();
});

navElement.addEventListener('click', function(e) {
  if(e.target.closest('.nav__link')) {
    closeMobileMenu();
  }
});

desktopSize.addEventListener('change', (e) => {
  if (e.matches) closeMobileMenu();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMobileMenu();
});

