'use strict';

const productListElement = document.getElementById('products-js');
const loadMoreBtn = document.getElementById('load-more-js');
const tabs = document.querySelectorAll('.tab');
let products = [];
let currentTab = 'coffee';

const showTab = function() {
  tabs.forEach((tab) => {
    tab.classList.remove('is-active');
    if (tab.dataset.tab === currentTab) tab.classList.add('is-active');
  });
};

const renderProductList = function() {
  const filteredProducts = products.filter(product => product.category === currentTab);
  (filteredProducts.length) > 4 ? loadMoreBtn.classList.remove('is-hidden') : loadMoreBtn.classList.add('is-hidden');
  productListElement.innerHTML = createProductList(filteredProducts);
}

const createProductList = function(filteredProducts) {
  let productList = '';
  
  filteredProducts.forEach((product, index) => {
      productList += `
        <li class="products__item ${(index > 3) ? 'is-mobile-hidden' : ''}">
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

fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    showTab(); 
    renderProductList();
});

tabs.forEach((tab) => {
  tab.addEventListener('click', function() {
    currentTab = tab.dataset.tab;
    showTab();  
    renderProductList();
  });
});

loadMoreBtn.addEventListener('click', function() {
  [...productListElement.children].forEach((product) => {
    product.classList.remove('is-mobile-hidden');
  });
  loadMoreBtn.classList.add('is-hidden');
})
