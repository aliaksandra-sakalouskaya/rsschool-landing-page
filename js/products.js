'use strict';

const productListElement = document.getElementById('products-js');
const loadMoreBtn = document.getElementById('load-more-js');
const cardModalElement = document.getElementById('card-js');
const tabs = document.querySelectorAll('.tab');
const overlayElement = document.getElementById('overlay-js');
let products = [];
let filteredProducts = [];
let optionsButtonElements = null;
let currentTab = 'coffee';
let currentProduct = null;

const renderActiveTab = function() {
  tabs.forEach((tab) => {
    tab.classList.remove('is-active');
    if (tab.dataset.tab === currentTab) tab.classList.add('is-active');
  });
};

const renderProductList = function() {
  filteredProducts = products.filter(product => product.category === currentTab);
  (filteredProducts.length) > 4 ? loadMoreBtn.classList.remove('is-hidden') : loadMoreBtn.classList.add('is-hidden');
  productListElement.innerHTML = createProductList(filteredProducts);
}

const createProductList = function(productsToRender) {
  let productList = '';
  
  productsToRender.forEach((product, index) => {
      productList += `
        <li class="products__item ${(index > 3) ? 'is-mobile-hidden' : ''}" data-id=${product.id}>
          <picture>
            <img class="products__img" width="310" height="310" src="./images/products/${product.image}" alt="${product.name}">
          </picture>
          <div class="products__content">
            <h3 class="products__title">${product.name}</h3>
            <p class="products__text">${product.description}</p>
            <span class="products__price">$${product.price}</span>
          </div>
        </li>
      `;
  });

  return productList;
}

const createSizeOptions = function() {
  let options = '';

  for (const [key, value] of Object.entries(currentProduct.sizes)) {
    options += `
      <button class="options__button" data-add-price="${value['add-price']}" type="button">
        <span>${key}</span>
        ${value.size}
      </button>
    `;
  }

  return options;
}

const createAdditiveOptions = function() {
  let options = '';

  currentProduct.additives.forEach((additive, index) => {
    options += `
      <button class="options__button" data-add-price="${additive['add-price']}" type="button">
        <span>${index + 1}</span>
        ${additive.name}
      </button>
    `;
  });

  return options;
}

const chooseOptions = function() {
  optionsButtonElements.forEach(optionsButton => {
    optionsButton.addEventListener('click', function(e) {
      if(e.currentTarget.closest('.options__list').dataset.options === 'size') {
          [...e.currentTarget.closest('.options__list').children].forEach(child => {
          child.classList.remove('is-active');
        });
        e.currentTarget.classList.add('is-active');
      }

      if(e.currentTarget.closest('.options__list').dataset.options === 'additive') {
        e.currentTarget.classList.toggle('is-active');
      }

      renderTotal();
    });
  });
}

const renderTotal = function() {
  const totalPriceElement = cardModalElement.querySelector('.total__pice');
  let addPrice = 0;
  let total = +currentProduct.price;

  optionsButtonElements.forEach(optionsButton => {
    if (optionsButton.classList.contains('is-active')) addPrice += +optionsButton.dataset.addPrice;
  });

  total += addPrice;
  totalPriceElement.textContent = '$' + total.toFixed(2);
}

const createProductModal = function() {
  return `
    <img class="card__img" src="./images/products/${currentProduct.image}" width="310" height="310" alt="${currentProduct.name}">
    <div class="card__content">
      <h3 class="card__title">
        ${currentProduct.name}
      </h3>
      <p class="card__description">
        ${currentProduct.description}
      </p>
      <div class="options">
        <span class="options__title">
          Size
        </span>
        <div class="options__list" data-options="size">
          ${createSizeOptions()}
        </div>
      </div>
      <div class="options">
        <span class="options__title">
          Additives
        </span>
        <div class="options__list" data-options="additive">
          ${createAdditiveOptions()}
        </div>
      </div>
      <div class="total">
        <span class="total__text">
          Total:
        </span>
        <span class="total__pice">
          $${currentProduct.price}
        </span>
      </div>
      <p class="card__offer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clip-path="url(#clip0_147811_7611)">
            <path d="M8 7.66663V11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 5.00667L8.00667 4.99926" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_147811_7611">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span>
          The cost is not final. Download our mobile app to see the final price and place your order. 
          Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
        </span>
      </p>
      <button class="card__close" type="button">
        Close
      </button>
    </div>
  `;
}

const openProductModal = function() {
  overlayElement.classList.add('is-active');
  bodyElement.classList.add('is-overlay-active');
}

const closeProductModal = function() {
  overlayElement.classList.remove('is-active');
  bodyElement.classList.remove('is-overlay-active');
}

fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderActiveTab(); 
    renderProductList();
});

tabs.forEach((tab) => {
  tab.addEventListener('click', function() {
    currentTab = tab.dataset.tab;
    renderActiveTab();  
    renderProductList();
  });
});

loadMoreBtn.addEventListener('click', function() {
  [...productListElement.children].forEach((product) => {
    product.classList.remove('is-mobile-hidden');
  });
  loadMoreBtn.classList.add('is-hidden');
});

productListElement.addEventListener('click', function(e) {
  const currentProductElement = e.target.closest('.products__item');
  currentProduct = filteredProducts.find(filteredProduct => filteredProduct.id === currentProductElement.dataset.id);
  cardModalElement.innerHTML = createProductModal();
  optionsButtonElements = cardModalElement.querySelectorAll('.options__button');
  optionsButtonElements[0].classList.add('is-active');
  renderTotal();
  chooseOptions();
  openProductModal();
});

overlayElement.addEventListener('click', function(e) {
  if (!e.target.closest('.card') || e.target.closest('.card__close')) {
    closeProductModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeProductModal();
});