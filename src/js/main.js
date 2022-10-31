const cards = document.querySelectorAll('.card')
const TIMEOUT = 250;

let isFlippedCard = false;
let firstCard, secondCard, firstSvgKey, secondSvgKey;
let isLocked = false;
let score = 0;

window.addEventListener('DOMContentLoaded', function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12); 
        card.style.order = randomPos;
    })
});

function flipCard() {
    if (isLocked) return
    if (this === firstCard) return 
    this.classList.add('isFlipped');

    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = this;
        firstSvgKey = this.lastElementChild;
        return
    } 

    secondCard = this;
    secondSvgKey = this.lastElementChild;
    
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstSvgKey.dataset.svg === secondSvgKey.dataset.svg;

    //slight delay for match
    if (isMatch) {
        //debug block clicks
        blockClicks();
        
        setTimeout(() => { lockCards() }, TIMEOUT);
    } else { unflipCards() };
}

function lockCards() {
    //before reset we check for win
    cards.forEach(card => {
        if (card.classList.contains('isFlipped')) score++;
    })

    console.log(`Your score is now: ${score} points`);

    if (score === 72) weWon();

    //Play Flip animation for match
    firstCard.classList.add('flipAnim');
    secondCard.classList.add('flipAnim');
    
    //Make them unclickable 
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    reset();
}

function unflipCards() {
    isLocked = true;

    setTimeout(() => {
        firstCard.classList.remove('isFlipped');
        secondCard.classList.remove('isFlipped');

        reset();
    }, 750);
}

function reset() {
    [isFlippedCard, isLocked] = [false, false];
    [firstCard, secondCard] = [undefined, undefined];
}

function weWon() {
    let grayOutScreen = document.createElement('div');
    let gameOverText = document.createElement('p');
    let restartButton = document.createElement('button');
    
    grayOutScreen.classList.add('game-over-screen');
    gameOverText.classList.add('game-over-text');
    restartButton.classList.add('restart-button');
    restartButton.textContent = 'RESTART';
    gameOverText.textContent = 'GAME OVER';

    document.body.appendChild(grayOutScreen);
    grayOutScreen.append(gameOverText);
    grayOutScreen.append(restartButton);

    restartButton.addEventListener('click', () => {
        location.reload();
    })
}

function blockClicks() {
    let block = document.createElement('div');

    block.classList.add('block')

    document.body.appendChild(block);
    
    setTimeout(() => {
        document.body.removeChild(block); 
    }, TIMEOUT)
}

cards.forEach(card => card.addEventListener('click', flipCard));