
function $(cssSelector) {
    return document.querySelector(cssSelector)
}


const modal1 = $("#modal1");
const closeModal1 = $("#close-modal1");
const timer = $("#timer");
const resultScreen = $("#results");
const restart = $("#restart");
const openModal1 = $("#open-modal1");
const cardContainer = $("#card-container")
const cardList = document.querySelectorAll(".cards");
const flippedCardList = document.querySelectorAll(".cards.flip");
const timerEl = document.getElementById("timer");
const stats = {
    wins: 0,
    losse: 0,
};
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let timeLeft = 200;

openModal1.addEventListener("click", () => modal1.style.display = "flex");
closeModal1.addEventListener("click", () => modal1.style.display = "none");
closeModal1.addEventListener("click", startTimer);




function startTimer() {
    const countdown = setInterval(() => {
        timerEl.textContent = `${timeLeft} seconds left`
        timeLeft--
        if (timeLeft < 0) {
            clearInterval(countdown);
            timerEl.textContent = `Time\'s up!`;
            lockBoard = true;
            checkTimeLeft();
        }
    }, 800)
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this;
        return;
    }
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
           
}
function checkForMatch () {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    } 
    checkForWinner();  
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 800); 
}

function resetBoard () {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cardList.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12); 
        card.style.order = randomNum
    });
}
)();

function checkAllCardsFlipped () {
    return flippedCardList.length === cardList.length
    console.log("all the cards are flipped")
}

function checkForWinner () {
    if (checkAllCardsFlipped()) {
        // cardContainer.style.display = "none"
        resultScreen.style.display = "flex"
        console.log("you won")
    } 
}

function checkTimeLeft () {
    if (timeLeft < 0) {
        // cardContainer.style.display = "none"
        resultScreen.style.display = "flex"
        console.log("time ran out")
        }
    }


cardList.forEach(card => card.addEventListener("click", flipCard))









