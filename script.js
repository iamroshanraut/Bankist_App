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

// Starting Project Here

const displayMovement = function (movement , sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movement.slice().sort((a ,b) => a - b) : movement;

  movs.forEach(function (amt, ind) {
    const type = amt > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      ind + 1
    } ${type}</div>
          <div class="movements__value">${amt}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating all amount and adding to total display amount

const calcDisplayAmount = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance} €`;
};

// Adding all in & out

const calcDisplaySummary = function (acc) {
  const movIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${movIn}€`;

  const movOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(movOut)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Computing UserName

const createUserNames = function (accs) {
  // Created a Function.
  accs.forEach(function (acc) {
    // Using forEach to Access all the account.
    acc.username = acc.owner // Adding a new propety to accounts object after converting it.
      .toLowerCase() // first converting it to lowerCase
      .split(' ') // second spliting it from space
      .map(name => name[0]) // using map() to access first letter of each word
      .join(''); // joining all letters together
  });
};

createUserNames(accounts);

//
const updateUI = function(acc){
  // Display Movement
  displayMovement(acc.movements);
  // Display Balance
  calcDisplayAmount(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// Implementing Login

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from Submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI Message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    console.log(currentAccount.pin);
  }

  containerApp.style.opacity = 100;

  // Clearning Input Feild After Login
  inputLoginUsername.value = inputLoginPin.value = ' ';

  updateUI(currentAccount)
  
});

// implementing transfer

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferAmount.value = ' ';

  if(
    amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username
  ){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount)
  }
})

// Request for Loan

btnLoan.addEventListener('click' , function(e){
  //
  e.preventDefault();
  //
  const amount = Number(inputLoanAmount.value);
  console.log(amount);
  //
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount*0.1)){
    currentAccount.movements.push(amount);
    inputLoanAmount.value = '';
  }
  //
  updateUI(currentAccount)
  //

})

// Implementing removing account

btnClose.addEventListener('click' , function(e){
  e.preventDefault();

  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(index , 1);
    //hide ui
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
})

let sorted = false;

btnSort.addEventListener('click' , function(btn){
  btn.preventDefault();
  //
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
})
