const cards = document.querySelectorAll('.card');
const restartButton = document.querySelector('.menu-button');
const flipButton = document.querySelector('.nav-button');
const TIMEOUT = 250;

let isFlippedCard = false;
let firstCard, secondCard, firstSvgKey, secondSvgKey, timerInterval;
let isLocked = false;
let score = 0;
let scoreToWin = 72; //default for hard

//for timer
const startTime = 1;
let time = startTime * 60;
const countdown = document.querySelector('.timer');

window.addEventListener('DOMContentLoaded', () => {
    createMainMenu();
});

function setUpTimer() {
    let minutes = 1;
    let seconds = 0;
    time = startTime * 60;
    function timer() {
           minutes = Math.floor(time / 60);
           seconds = time % 60;
        
        if (seconds === -1) {
            [seconds, minutes] = [0, 0]
            clearInterval(timerInterval);
            weWon();
        } 
        seconds = seconds < 10 ? '0'+ seconds : seconds;
        
        countdown.innerHTML = `${minutes}:${seconds}`;
        time--;
    }

    countdown.innerHTML = '1:00';
    timerInterval = setInterval(timer, 1000);
};


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

    if (score === scoreToWin) weWon();

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
        closeNow(grayOutScreen);
        resetGame();
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

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12); 
        card.style.order = randomPos;
    })

}

//remove element from dom tree
function closeNow(thisElement) {
    thisElement.remove();
}

function resetGame() {
    cards.forEach(card => card.classList.remove('isFlipped'));
    cards.forEach(card => card.classList.remove('flipAnim'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    clearInterval(timerInterval);
    setUpTimer()
    shuffle();
    score = 0;
}

function createMainMenu() {
    let mainMenu = document.createElement('div');
    let mainWrapper = document.createElement('div');
    let mainMenuTitle = document.createElement('p');
    let difficultySelettionEasy = document.createElement('button');
    let difficultySelettionMedium = document.createElement('button');
    let difficultySelettionHard = document.createElement('button');

    mainMenu.classList.add('main-menu-screen');
    mainWrapper.classList.add('main-wrapper');
    mainMenuTitle.textContent = 'CHOOSE DIFFICULTY';
    difficultySelettionEasy.textContent = 'EASY';
    difficultySelettionMedium.textContent = 'MEDIUM';
    difficultySelettionHard.textContent = 'HARD';
   
    document.body.appendChild(mainMenu);    
    mainMenu.append(mainWrapper);    
    mainWrapper.append(mainMenuTitle);    
    mainWrapper.append(difficultySelettionEasy);    
    mainWrapper.append(difficultySelettionMedium);    
    mainWrapper.append(difficultySelettionHard);   
    
    difficultySelettionEasy.addEventListener('click', () => {

        for (i = 0; i < 6; i++) {
            let cardToRemove = document.querySelector('.card');
            closeNow(cardToRemove);
        };      

        scoreToWin = 30;
        clearInterval(timerInterval);
        setUpTimer()
        shuffle();
        closeNow(mainMenu);
    });

    difficultySelettionMedium.addEventListener('click', () => {

        for (i = 0; i < 2; i++) {
            let cardToRemove = document.querySelector('.card');
            closeNow(cardToRemove);
        }; 

        scoreToWin = 56;  
        clearInterval(timerInterval);
        setUpTimer()
        shuffle();
        closeNow(mainMenu);
    });

    difficultySelettionHard.addEventListener('click', () => {
        clearInterval(timerInterval);
        setUpTimer()
        shuffle();
        closeNow(mainMenu);
    });
}

restartButton.addEventListener('click', () => {
    location.reload();
});

flipButton.addEventListener('click', () => {
    resetGame();
});

cards.forEach(card => card.addEventListener('click', flipCard));
