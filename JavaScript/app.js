
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
const timerEl = document.getElementById("timer");
const stats = {
    wins: 0,
    losses: 0,
};
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let flipCardList = 0;
let timerRunning = false;

openModal1.addEventListener("click", () => modal1.style.display = "flex");
closeModal1.addEventListener("click", () => modal1.style.display = "none");
closeModal1.addEventListener("click", startTimer);
cardList.forEach(card => card.addEventListener("click", flipCard));
restart.addEventListener("click", resetGame);
restart.addEventListener("click", startTimer)

function startTimer() {
    let timeLeft = 60;
    const countdown = setInterval(() => {
        
        timerEl.textContent = `${timeLeft}`
        timeLeft--
        if (checkAllCardsFlipped() === true) {
            clearInterval(countdown);
        }
        if (timeLeft < 0) {
            clearInterval(countdown);
            timerEl.textContent = `Time\'s up!`;
            timerEl.textContent[1] = null
            lockBoard = true;
            if (timeLeft < 0) {
                cardContainer.style.display = "none";
                resultScreen.style.display = "flex";
                stats.losses++;
                losses.children[1].innerText = stats.losses;
                resultScreen.children[0].textContent = "🐓 OH NO! You ran out of time 🐕"
                resultScreen.children[1].textContent = "😿 You didn't win this time 🐎"
                }
            }
        }, 1000);
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
        flipCardList+=2
        disableCards();
    } else {
        unflipCards();
    } 
    setTimeout(checkForWinner, 2000);  
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

function unflipAllCards() {
    cardList.forEach(card => {
        card.classList.remove("flip");
    });
}

function resetBoard () {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {
    cardList.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12); 
        card.style.order = randomNum
    });
}
shuffle();

function checkAllCardsFlipped (event) {
    if (flipCardList === cardList.length) {
        timerEl.textContent = `Time\'s up!`
        return true;
    } else {
        return false
    }
}

function checkForWinner () {
    if (checkAllCardsFlipped()) {
        cardContainer.style.display = "none";
        resultScreen.style.display = "flex";
        stats.wins++;
        wins.children[1].innerText = stats.wins;
        resultScreen.children[0].textContent = "🎉 CONGRATULATIONS 🎉"
        resultScreen.children[1].textContent = "🏆 You're a winner! 🏆"
    } 
}
   

function resetGame () {
    unflipAllCards();
    shuffle();
    resetBoard();
    cardContainer.style.display = "flex";
    resultScreen.style.display = "none";
}







