/*
    - list constants and variables
*/

// all fa elements in card elements
const faList =  document.querySelectorAll('.card .fa');

// select card elements in deck
const deckList = document.querySelector('.deck');

// select moves element
let moveElement = document.querySelector('.moves');

// select stars elements
let starsElements = document.querySelectorAll('.fa-star');

/*
    - list all cards in deck
*/

const deck = [
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb',
];

// Function creates and writes random card in faList
function addRandomDeck() {
  let shuffleDeck = shuffle(deck);
  for (let x = 0; shuffleDeck.length > x; x++) {
    faList[x].classList.add(shuffleDeck[x]);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// add event 'click' on deckList
let addEvent = function () {
  checkWin();
  deckList.addEventListener('click', groupOpenCardDelEvent, false);
};

// group function for multiple use
let groupOpenCardDelEvent = function () {
  openCard();
  delEvent();
};

// open card function
let openCard = function () {
  if (event.target.classList.contains('match') == false) {
    if (event.target.nodeName == 'LI') {
      event.target.classList.add('open', 'show', 'animationCardOpen');
    }
  }
};

// delite event and start check two opened card
let delEvent = function () {
  if (document.querySelectorAll('.deck .open').length == 2) {
    deckList.removeEventListener('click', groupOpenCardDelEvent, false);
    moveCounter();
    setTimeout(animationTwoCards, 300);
    setTimeout(deliteAnimationClass, 700);
    setTimeout(checkCard, 700);
  }
};

// check for the opening of two identical cards
let checkCard = function () {
  if (document.querySelectorAll('.deck .open').length == 2) {
    let checkCardList = document.querySelectorAll('.open .fa');
    let openCardList = document.querySelectorAll('.deck .open');
    if (checkCardList[0].classList.value == checkCardList[1].classList.value) {
      openCardList[0].classList.add('match');
      openCardList[0].classList.remove('open', 'show', 'animationCardOpen');
      openCardList[1].classList.add('match');
      openCardList[1].classList.remove('open', 'show', 'animationCardOpen');
      addEvent();
    } else {
      openCardList[0].classList.remove('open', 'show', 'animationCardOpen');
      openCardList[1].classList.remove('open', 'show', 'animationCardOpen');
      addEvent();
    }
  }
};

//move counter
let moveCounter = function () {
  moveElement.textContent = Number(moveElement.textContent) + 1;
  deliteStar();
};

//delite stars depending on the moves
let deliteStar = function () {
  if (Number(moveElement.textContent) == 15) {
    starsElements[1].classList.add('starHidden');
  } else if (Number(moveElement.textContent) == 25) {
    starsElements[2].classList.add('starHidden');
    starsElements[0].classList.add('starHidden');
    starsElements[1].classList.remove('starHidden');
  } else if (Number(moveElement.textContent) == 35) {
    starsElements[1].classList.add('starHidden');
  }
};

//animation for two card check
let animationTwoCards = function () {
  if (document.querySelectorAll('.deck .open').length == 2) {
    let checkCardList = document.querySelectorAll('.open .fa');
    let openCardList = document.querySelectorAll('.deck .open');
    if (checkCardList[0].classList.value == checkCardList[1].classList.value) {
      openCardList[0].classList.add('animationCardCheckTrue');
      openCardList[1].classList.add('animationCardCheckTrue');
    } else {
      openCardList[0].classList.add('animationCardCheckFailed');
      openCardList[1].classList.add('animationCardCheckFailed');
    }
  }
};

//delite animation classes
let deliteAnimationClass = function () {
  let animFailedList = document.querySelectorAll('.animationCardCheckFailed');
  let animTrueList = document.querySelectorAll('.animationCardCheckTrue');
  if (animFailedList.length == 2) {
    animFailedList[0].classList.remove('animationCardCheckFailed');
    animFailedList[1].classList.remove('animationCardCheckFailed');
  } else {
    animTrueList[0].classList.remove('animationCardCheckTrue');
    animTrueList[1].classList.remove('animationCardCheckTrue');
  }
};

// start game main function
let start = function start() {
  hideElementOnStart();
  setTimeout(deliteEndMessageContent, 500);
  setTimeout(function () {
    document.querySelector('.startText').classList.add('hide');
  }, 1000);

  setTimeout(deliteStarHidden, 500);
  setTimeout(deliteMove, 500);
  setTimeout(deliteHidenOnStart, 200);
  setTimeout(deliteClassStart, 1200);
  document.removeEventListener('click', start, false);
  addRandomDeck();
  addEvent();
};

// check win the Game
let checkWin = function () {
  if (document.querySelectorAll('.match').length == 16) {
    document.querySelector('.endMessage').classList.add('animationEmersion');
    let visibleElement = document.querySelectorAll('.visible');
    for (x = 0; visibleElement.length > x; x++) {
      visibleElement[x].classList.add('animationHidden');
      visibleElement[x].classList.remove('visible');
    }

    let starCount = document.querySelectorAll('.starHidden');
    let congratulationMessage = document.createElement('h1');
    congratulationMessage.innerHTML = 'Congratulation!!!';
    let resultMessage = document.createElement('div');
    resultMessage.innerHTML = 'Your result :&nbsp;&nbsp;' + moveElement.textContent + ' moves !!!';
    resultMessage.className = 'resultMessage';
    let starMessage = document.createElement('div');
    starMessage.className = 'starMessage';
    let starClone = document.querySelector('.stars').cloneNode(true);
    starClone.className = 'starWinMessage';
    let pressClickToRestart = document.createElement('div');
    pressClickToRestart.textContent = 'Click to start Again';
    pressClickToRestart.className = 'pressClickToRestart';
    document.querySelector('.endMessage').appendChild(starMessage);
    document.querySelector('.starMessage').appendChild(starClone);
    document.querySelector('.endMessage').appendChild(congratulationMessage);
    document.querySelector('.endMessage').appendChild(resultMessage);
    document.querySelector('.endMessage').appendChild(pressClickToRestart);
    clearBeforeRestart();
    document.addEventListener('click', start, false);
  }
};

// delite class start animation and add class visible
let deliteClassStart = function () {
  let animationEmersionClassList = document.querySelectorAll('.animationEmersion');
  for (let x = 0; animationEmersionClassList.length > x; x++) {
    animationEmersionClassList[x].classList.add('visible');
    animationEmersionClassList[x].classList.remove('animationEmersion');
  }
};

// animation emersion element on start game
let deliteHidenOnStart = function () {
  let hiddenElement = document.querySelectorAll('.deck .card');
  for (let x = 0; hiddenElement.length > x; x++) {
    hiddenElement[x].classList.add('animationEmersion');
  }

  document.querySelector('.score-panel').classList.add('animationEmersion');

};

// animation hidden element on start game
let hideElementOnStart = function () {
  document.querySelector('.startText').classList.add('animationHidden');
};

//clear class before restart
let clearBeforeRestart = function () {
  let clearAnimationHidden = document.querySelectorAll('.animationHidden');
  for (let x = 0; clearAnimationHidden.length > x; x++) {
    clearAnimationHidden[x].classList.remove('animationHidden');
  }

  let clearMatch = document.querySelectorAll('.match');
  for (let x = 0; clearMatch.length > x; x++) {
    clearMatch[x].classList.remove('match');
  }

  let clearFaIcon = document.querySelectorAll('.card > i');
  for (let x = 0; clearFaIcon.length > x; x++) {
    clearFaIcon[x].className = '';
    clearFaIcon[x].classList.add('fa');
  }

  let clearOpen = document.querySelectorAll('.open');
  for (let x = 0; clearOpen.length > x; x++) {
    clearOpen[x].classList.remove('open', 'show', 'animationCardOpen');
  }
};

// delite content and message after restart
let deliteEndMessageContent = function () {
  let endMessage = document.querySelector('.endMessage');
  while (endMessage.firstChild) {
    endMessage.removeChild(endMessage.firstChild);
  }

  endMessage.classList.remove('animationHidden', 'visible');
};

// delite starhidden class after restart
let deliteStarHidden = function () {
  let starHidden = document.querySelectorAll('.starHidden');
  for (let x = 0; starHidden.length > x; x++) {
    starHidden[x].classList.remove('starHidden');
  }
};

// delite moves counte
let deliteMove = function () {
  moveElement.textContent = '';
};

//main restart function
let restart = function () {
  clearBeforeRestart();
  start();
};

// restart game on click
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restart, false);

// start game on click
document.addEventListener('click', start, false);
