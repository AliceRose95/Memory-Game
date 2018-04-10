// define variables
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
let timer = document.querySelector('.timer');
let seconds = 0, minutes = 0;
let interval;
let moveCounter = document.querySelector('.moves');
let moves = 0;
let card = document.getElementsByClassName('card');
let starOne = document.getElementById('starOne')
let starTwo = document.getElementById('starTwo')
let flippedCards = [];
let firstCard;
let secondCard;
let closeButton = document.querySelector('.close');
let winRestartButton = document.querySelector('.winrestart')
let matchedCard = document.getElementsByClassName('match');
let modal = document.getElementById('modal');

// array list of cards
let cards = Array.prototype.slice.call(card);

//loops through all the cards and turns them on click
for(let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function() {
    this.classList.add('open', 'show', 'noclick');
  });
  cards[i].addEventListener('click', cardOpen);
  cards[i].addEventListener('click', congratulations);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//run the starGame function on window load
window.onload = startGame();

//start the game
function startGame() {
  flippedCards = [];
  const shuffleCards = shuffle(cards);
  for (let i= 0; i < shuffleCards.length; i++) {
    for (let card of cards) {
      deck.appendChild(card);
    }
    cards[i].classList.remove('open','show', 'match', 'noclick');
  }
  //reset moves to 0
  moves = 0;
  moveCounter.innerHTML = moves;

  //reset star rating
  starOne.classList.remove('fa-star-o');
  starOne.classList.add('fa-star');
  starTwo.classList.remove('fa-star-o');
  starTwo.classList.add('fa-star');

  //start timer on first card click
  cards[0].addEventListener('click', startTimer);
}

//reset timer for restart
function timerReset() {
  clearInterval(interval);
  timer.textContent = '00:00';
  seconds = 0; minutes = 0;
}

//restart game on button click
restart.addEventListener('click', function (){
  startGame();
  timerReset();
});

//push open cards to new array
function cardOpen() {
  flippedCards.push(this);
  firstCard = flippedCards[0];
  let cardsAmount = flippedCards.length;
  if (cardsAmount == 2) {
    secondCard = flippedCards[1];
    movesMade();
    if (firstCard.innerHTML === secondCard.innerHTML) {
      matching();
    }
    else {
      incorrect();
    }
  }
}

//if they match
function matching() {
  firstCard.classList.add('match', 'noclick');
  secondCard.classList.add('match', 'noclick');
  firstCard.classList.remove('open', 'show');
  secondCard.classList.remove('open', 'show');
  //empty the array
  flippedCards = [];
}

//if they don't match
function incorrect() {
  firstCard.classList.add('incorrect');
  secondCard.classList.add('incorrect');
  disableClick();
  setTimeout(function() {
    firstCard.classList.remove('open','show', 'noclick', 'incorrect');
    secondCard.classList.remove('open','show', 'noclick', 'incorrect');
    enableClick();
  },500)
  //empty the array
  flippedCards = [];
}

//disable clicking of too many cards at once
function disableClick() {
  for(let i = 0; i < cards.length; i++) {
    cards[i].classList.add('noclick');
  };
}

//re-enable clicking
function enableClick() {
  for(let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('noclick');
  };
}

//timer function (increase)
function addTime() {
  interval = setInterval(function(){
    timer.textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
  }, 1000);
}

//start the timer function
function startTimer() {
    seconds = 1;
    minutes = 0;
    addTime();
}

//record the number of moves made and start timer on first move
function movesMade() {
  moves++;
  moveCounter.innerHTML = moves;
  starRating();
}

//use moves to determine star rating
function starRating() {
  if (moves > 10 && moves < 16) {
      starOne.classList.remove('fa-star');
      starOne.classList.add('fa-star-o');
  }else if (moves > 16) {
      starTwo.classList.remove('fa-star');
      starTwo.classList.add('fa-star-o');
  }
}

//winning the Game
//modal popup
function congratulations() {
  if (matchedCard.length === 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.style.display = "block";

    let starRating = document.querySelector(".stars").innerHTML

    document.getElementById("finaltime").innerHTML = finalTime;
    document.getElementById("finalstars").innerHTML = starRating;
    document.getElementById("finalmoves").innerHTML = moves + " " + "moves";

    close();
  };
}

//close the modal on click of X
function close(){
  closeButton.addEventListener('click', function(){
    modal.style.display = 'none';
    startGame();
  });
}

//restart the game after winning, called with button
function winRestart(){
  modal.style.display = 'none';
  startGame();
  timerReset();
}
