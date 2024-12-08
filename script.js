'use strict';

//Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer;

//Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = currentScore; //1
  score1El.textContent = currentScore; //1
  current0El.textContent = currentScore; //1
  current1El.textContent = currentScore; //1
  player0El.classList.remove('player--winner'); //
  player1El.classList.remove('player--winner'); //
  player0El.classList.add('player--active'); //
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2.Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //3.Check for rolled 1 : if true,switch the next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    switchPlayer();
  }
});
btnHold.addEventListener('click', function () {
  //1. Add current score to active player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2.Check if players score is >= 100, is win
  //Switch player
  if (scores[activePlayer] < 100) {
    switchPlayer();
  } else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    diceEl.classList.add('hidden');
  }
});
btnNew.addEventListener('click', init);
