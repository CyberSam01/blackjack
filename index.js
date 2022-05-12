let cards = []
let sum = 0

let compCards = []
let compSum = 0

let youWin = undefined 

let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

let player = {
    name: "Sam",
    chips: 1000
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = `${player.name}: $${player.chips}`

function getRandomCard() {
    return Math.ceil(Math.random() * 11)
}

function startGame(){
    isAlive = true
    hasBlackJack = false
    document.getElementById("start-button").style.display = "none"
    document.getElementById("pass-button").style.display = "inline-block"
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame(){
    playerEl.textContent = `${player.name}: $${player.chips}`
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i += 1) {
        cardsEl.textContent += `${cards[i]} -`
    }

    sumEl.textContent = `Sum: ${sum}`
    if (sum < 21) {
        message = `Do you want to draw a card?`;
    } else if (sum === 21) {
        message = "You got BlackJack!";
        hasBlackJack = true
        player.chips += 1000
        document.getElementById("start-button").style.display = "inline-block"
        document.getElementById("pass-button").style.display = "none"
    } else {
        message = `You got ${sum}! You'r death!`;
        isAlive = false
        player.chips -= 5
        document.getElementById("start-button").style.display = "inline-block"
        document.getElementById("pass-button").style.display = "none"
    }
    messageEl.textContent = message
}

function newCard() {
    console.log(`isAlive: ${isAlive} hasBlackJack: ${hasBlackJack}`);
    if (isAlive === true && hasBlackJack === false) {
        let extraCard = getRandomCard()
        sum += extraCard
        cards.push(extraCard)
        renderGame()
    }
}

function startCompGame() {
    let firstCompCard = getRandomCard()
    let secondCompCard = getRandomCard()
    compCards = [firstCompCard, secondCompCard]
    compSum = firstCompCard + secondCompCard
    console.log(compSum);
    compRenderGame()
}

function compRenderGame() {
    if (compSum < 18) {
        compNewCard()
    } else if (compSum > 21) {
        player.chips += 1000
        youWin = true
    } else {
        if(compSum > sum) {
            player.chips -= 5
            youWin = false
        } else {
            player.chips += 1000
            youWin = true
        }
    }
    if (youWin == true) {
        messageEl.textContent = `You won!`
    } else {
        messageEl.textContent = `You lost!`
    }
    cardsEl.textContent = `Computer: ${compSum}`
    sumEl.textContent = `You: ${sum}`
    document.getElementById("start-button").style.display = "inline-block"
    document.getElementById("pass-button").style.display = "none"
}

function compNewCard() {
        let extraCard = getRandomCard()
        compSum += extraCard
        compCards.push(extraCard)
        compRenderGame()
}