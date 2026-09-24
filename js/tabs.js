'use strict';

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel'); 
let currentTab = 'coffee';

const showTab = function() {
  tabs.forEach((tab) => {
    tab.classList.remove('is-active');
    if (tab.dataset.tab === currentTab) tab.classList.add('is-active');
  });

  panels.forEach((panel) => {
    panel.classList.remove('is-active');
    if (panel.dataset.panel === currentTab) panel.classList.add('is-active');
  });
};

tabs.forEach((tab) => {
  tab.addEventListener('click', function() {
    currentTab = tab.dataset.tab;
    showTab();  
  });
});

showTab();