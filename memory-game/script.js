const gameContainer = document.getElementById("game");

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

let clickCount = 0;
let firstClickedCard = null;
let secondClickedCard = null;
let cardFlipped = false;
let matchedPairs = 0;

function handleCardClick(event) {
    if (cardFlipped) return;
    if (event.target === firstClickedCard) return;

    const clickedCard = event.target;
    clickedCard.style.backgroundColor = clickedCard.classList[0];
    clickedCard.classList.add("flipped");

    if (clickCount === 0) {
        firstClickedCard = clickedCard;
        clickCount = 1;
    } else {
        secondClickedCard = clickedCard;
        clickCount = 0;
        cardFlipped = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    if (firstClickedCard.className === secondClickedCard.className) {
       
        matchedPairs++;
        if (matchedPairs === COLORS.length / 2) {
            alert("YIPPEEE!! You've matched all pairs!");
            restartGame();
        }
    } else {
       
        firstClickedCard.style.backgroundColor = "";
        secondClickedCard.style.backgroundColor = "";
        firstClickedCard.classList.remove("flipped");
        secondClickedCard.classList.remove("flipped");
    }
    cardFlipped = false;
}

function restartGame() {
    gameContainer.innerHTML = "";
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    clickCount = 0;
    firstClickedCard = null;
    secondClickedCard = null;
    cardFlipped = false;
    matchedPairs = 0;
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}


createDivsForColors(COLORS);
