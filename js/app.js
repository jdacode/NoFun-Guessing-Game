/* 
GAME FUNCTION:
- Player must guess a number between a min and max.
- Player gets a certain amount of guesses remaining.
- Notify player of guesses remainung.
- Notify the player of the correct answer if loose.
- Let player choose to play again.
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    guessesLeftTotal = guessesLeft;

// UI Elements
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum =  document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');
        image = document.querySelector('#myImg');


initLoad();

function initLoad(){
    // Assign UI min and max
    minNum.textContent = min;
    maxNum.textContent = max;
    image.src = 'img/wait.gif';
    guessInput.value = '';

    // Event Listener
    guessBtn.addEventListener('click', submitGuess);

    // new play again event listener
    game.addEventListener('mousedown', function(e){
        if(e.target.className === 'play-again'){
            window.location.reload();
        }
    });
}

function submitGuess(){
    let guess = parseInt(guessInput.value);

    // Validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Number between ${min} and ${max}`, 'red', false, '', 'img/wait.gif');
    } else if (guess === winningNum) {        
        setMessage(`YOU WIN!!!`, 'green', true, guess, 'img/win.gif');
        gameOver();
    } else {
        guessesLeft -= 1;
        if (guessesLeft <= 0){
            setMessage(`GAME OVER!`, 'red', true, guess, 'img/gameover.gif');
            gameOver();
        } else {
            setMessage(`Guesses left ${guessesLeft} / ${guessesLeftTotal}`, 'blue', false, '', 'img/lost.gif');
        }
    }
}

// set message
function setMessage(newMessage, color, inputDisabler, clearInput, newImage){
    guessInput.disabled = inputDisabler;
    guessInput.style.borderColor = color;
    message.style.color = color;
    message.textContent = newMessage;
    guessBtn.style.color = color;
    guessInput.value = clearInput;
    image.src = newImage;
}

function gameOver(){
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
