'use strict';

console.log(document.querySelector('.message').innerHTML);

setTimeout(() => {
  document.querySelector('.message').textContent = 'Correct Number';
  document.querySelector('.number').textContent = 12;
  document.querySelector('.guess').value = 12;
  document.querySelector('.score').textContent = 20;
}, 1000);

console.log(document.querySelector('.guess').value);
