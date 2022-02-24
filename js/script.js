const card_deck = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

const deck = document.querySelector(".box");
const moves = document.querySelector(".moves");





  let interval;
  let second = 0;
  let minute = 0;
  let timeStart = false;

  // variables to keep track of the game

  let boxs_open = [];
  let matches = 0;
  let numberOfMoves = moves.textContent;
  let numberOfStars = 3;

/* Start game */

function startNewGame() {
    resetTimer();
    timer.style.display = "none";
    timeStart = false;
    timer.textContent = minute + " minutes " + second + " seconds";
    shuffle(box_deck); // use given shuffle function on box_deck
    boxs_open = [];
    matches = 0;
    moves.textContent = 0;
    numberOfMoves = moves.textContent;

    // Get rid of classes and, thus, slip all boxs to backside, set icons according to shuffled box deck

    for (let i = 0; i < box_deck.length; i++) {
      let deck_element = deck.getElementsByTagName("li");
      let class_element = deck_element[i].getAttribute("class");
      deck_element[i].className = "";
      deck_element[i].classList.add("box");

      let icon_element = deck.getElementsByTagName("i");
      let icon_class = icon_element[i].getAttribute("class");
      icon_element[i].className = "";
      icon_element[i].classList.add("fa", box_deck[i]);
    }

    // Return three stars to score-panel

    stars.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
    numberOfStars = 3;
  }


function flipbox(box) {
    box.classList.add("open", "show");

  }


function youHaveAMatch() {
boxs_open[0].classList.remove("open", "show");
boxs_open[0].classList.add("match");
boxs_open[1].classList.remove("open", "show");
boxs_open[1].classList.add("match");
boxs_open = [];
matches++;
}

/* number of movies and the star assign to it.*/

function addMove(box) {
  if (!box.classList.contains("match")) {
      numberOfMoves++;
      moves.innerText = numberOfMoves;
  }

if (numberOfMoves == 15) {
  numberOfStars = 3;
  stars.removeChild(liStars[0]);

}
else if (numberOfMoves == 20){
  numberOfStars = 1;
  stars.removeChild(liStars[1]);
}
}

// if the box dont match

function notDSame() {
setTimeout(function () {
boxs_open[0].classList.remove("open", "show");
boxs_open[1].classList.remove("open", "show");
boxs_open  = [];
}, 900);

}

playAgain.addEventListener("click", function () {

modal.style.display = "none";
startNewGame();

});

restart.addEventListener("click", function () {
startNewGame();

});


deck.addEventListener("click", function (e) {
let box = e.target;

if (e.target !== e.currentTarget) {
  if (!timeStart) {
     startTimer();
     timeStart = true;
    timer.style.display = "inline-block";
  }
   if (!box.classList.contains("open")) {

     if (boxs_open.length < 2) {
      flipbox(card);
      cards_open.push(card);

    }

    if (cards_open.length  === 2) {
     addMove(card);

    if (cards_open[0].innerHTML === cards_open[1].innerHTML) {
      youHaveAMatch();
   }else {
    notDSame();
  }

}
endGame();

}

}



})



function resetTimer() {
clearInterval(interval);
second = 0;
minute = 0;
}

/* Start counting the time */

function startTimer() {
interval = setInterval(function() {
  timer.textContent = minute + " minutes " + second + " seconds ";
  second++;
  if (second === 60) {
    minute++;
    second = 0;

  }

}, 1000)

}

/* shurffling the card */

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

startNewGame();
