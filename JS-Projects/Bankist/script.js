'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((item, idx) => {
    const type = item > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      idx + 1
    } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${item}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

function createUsername(accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');
  });
}

createUsername(accounts);
console.log(accounts);
// const user = 'Steven Thomas William';
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(item => item[0])
//   .join('');

// console.log(username);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const eurToUsdRate = 1.1;

const movementsInUS = movements.map(item => item * eurToUsdRate);
const movementsInUSFor = [];
for (let mov of movements) {
  movementsInUSFor.push(mov * eurToUsdRate);
}

const movementDesc = movements.map((item, i) => {
  if (item > 0) {
    return `Movement ${i + 1}: You deposited ${item}`;
  } else {
    return `Mover ${i + 1}: You withdrew ${Math.abs(item)}`;
  }
});

// console.log('move', movements);
// console.log('new move', movementsInUS);
// console.log('new move for', movementsInUSFor);
// console.log(movementDesc);

// const balance = movements.reduce((acc, cur, i, arr) => {
//   console.log(i, acc);
//   return acc + cur;
// }, 0 /* acc = 0 when iteration 0*/);

// console.log('balance', balance);

function calcDisplayBalance(movements) {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = balance + ' ' + 'EUR';
}

calcDisplayBalance(account1.movements);

function filterByTransaction(transaction) {
  if (transaction === 'in') {
    return mov => mov > 0;
  }

  if (transaction === 'out') {
    return mov => mov < 0;
  }
}

function calTotalInOrOutDisplayBalance(movements, transaction) {
  const total = movements
    .filter(filterByTransaction(transaction))
    .reduce((acc, mov) => acc + mov, 0);
  if (transaction === 'in') {
    labelSumIn.textContent = `${total}€`;
  }

  if (transaction === 'out') {
    labelSumOut.textContent = `${Math.abs(total)}€`;
  }
}

function calIntDisplay(movements, intRate) {
  const int = movements
    .filter(filterByTransaction('in'))
    .map(mov => (mov * intRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${int}€`;
}

calTotalInOrOutDisplayBalance(account1.movements, 'in');
calTotalInOrOutDisplayBalance(account1.movements, 'out');
calIntDisplay(account1.movements, account1.interestRate);
