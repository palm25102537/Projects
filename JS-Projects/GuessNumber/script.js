'use strict';

// console.log(document.querySelector('.message').innerHTML);

// setTimeout(() => {
//   document.querySelector('.message').textContent = 'Correct Number';
//   document.querySelector('.number').textContent = 12;
//   document.querySelector('.guess').value = 12;
//   document.querySelector('.score').textContent = 20;
// }, 1000);

// console.log(document.querySelector('.guess').value);
let score = 20;

const random = Math.trunc(Math.random() * 20) + 1;

const check = document.querySelector('.check');
check.addEventListener('click', function () {
  // console.log(document.querySelector('.guess').value);
  const guess = document.querySelector('.guess');
  const message = document.querySelector('.message');
  const newScore = document.querySelector('.score');
  const number = document.querySelector('.number');

  if (!guess.value) {
    message.textContent = 'No number!';
    return;
  } else if (+guess.value === random) {
    message.textContent = 'Correct!';
  } else if (+guess.value > random) {
    if (score > 1) {
      message.textContent = 'Too high!';
      score--;
      newScore.textContent = score;
    } else {
      newScore.textContent = 0;
      message.textContent = 'You lose!';
      number.textContent = random;
    }
  } else if (+guess.value < random) {
    if (score > 1) {
      message.textContent = 'Too low!';
      score--;
      newScore.textContent = score;
    } else {
      newScore.textContent = 0;
      message.textContent = 'You lose!';
      number.textContent = random;
    }
  }
});
