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

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice Method

console.log(arr.slice(2));
console.log(arr);
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());

// Splice Method
arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.splice(2));
console.log(arr.splice(0, 3));
console.log(arr);

// Reverse Method

arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);
const arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse();
console.log(arr2);

// Concat

const final = arr.concat(arr2);
console.log(final);

console.log([...arr, ...arr2]);

console.log(final.join(' - '));

// At Method

const arre = [10, 20, 30, 40, 50];

console.log(arre[3]);
console.log(arre.at(2));

console.log(arre[arre.length - 1]);
console.log(arre.at(-1));

console.log('parvez'.at(3));

// Looping Array : forEach

let nums = [44, 32, 52, 87, 17, 54];

nums.forEach(function (num, ind, arr) {
  console.log(num, ind, arr);
});

// Example

const amount = [100, 325, -150, 500, -400, 1000, -100];

amount.forEach((amt , ind , arr) => {
  if(amt > 0){
    console.log(`Transaction ${ind+1} : Your Account is Credited With ${amt}.`);
  }else{
    console.log(`Transaction ${ind+1} : Your Account is Debited With ${Math.abs(amt)}.`);
  }
})
