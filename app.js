let scores, roundScore, currentPlayer, gamePlaying, prevDice;
// asks user when the game should end

const diceDOM = document.querySelector('.dice');
const paragraphDOM = document.querySelector('.notification__paragraph');
const notificationDOM = document.querySelector('.notification')
const btnRollDOM = document.querySelector('.btn-roll')
const btnHoldDOM = document.querySelector('.btn-hold')

start();

const button = () => {
    if(gamePlaying) {
        
        let dice = Math.floor(Math.random() * 6) + 1; // generate number from 1 to 6    

        // make dice visible and set the appropriate image
        diceDOM.style.opacity = '1';
        diceDOM.src = `dice-${dice}.png`;
        currentPlayerDOM = document.getElementById(`current-${currentPlayer}`);

        if(dice > 1) {
            roundScore += dice;
            // selects the current score field based on the current player
            currentPlayerDOM.textContent = roundScore;
            
            if(prevDice === 6 && dice === 6) {
                paragraphDOM.innerText = 'You rolled a 6 twice!'
                notificationDOM.style.opacity = '1';
                currentPlayerDOM.textContent = 0;
                switchPlayer();
            }

            // sets value of pevious dice
            (prevDice !== dice) && (prevDice = dice);
        } else {
            paragraphDOM.innerText = 'You rolled 1!'
            notificationDOM.style.opacity = '1';
            switchPlayer()
        }
    }
}


const switchPlayer = () => {
    setTimeout(() => {
        notificationDOM.style.opacity = '0';
    }, 600)
    currentPlayerDOM.textContent = 0;
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    prevDice = null;

    // indicate visibly that whose turn it is to roll the dice
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.opacity = '0';
}

btnRollDOM.addEventListener('click', button);

btnHoldDOM.addEventListener('click', function() {
    if(gamePlaying) {
        scores[currentPlayer] += roundScore;

        document.getElementById(`score-${currentPlayer}`).textContent = scores[currentPlayer];

        let inputField = document.getElementById('final-score').value;
        let winScore;

        // inputField === true ? winScore = inputField : winScore = 100;
        if(inputField) {
            winScore = inputField;
        } else {
            winScore = 100;
        }
        
        // check if player wins
        if(scores[currentPlayer] >= winScore)  {
            document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
            diceDOM.style.opacity = '0';
            btnHoldDOM.style.cursor = 'no-drop';
            btnRollDOM.style.cursor = 'no-drop';
            document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            switchPlayer();
        }   
    }
});

document.querySelector('.btn-new').addEventListener('click', start);

function start() {
    // 0 -first player 1-second player
    scores = [0, 0];
    currentPlayer = 0;
    roundScore = 0;
    inputField = '';

    gamePlaying = true;

    // hide dice in beginning
    diceDOM.style.opacity = '0';

    // set cursor types
    btnHoldDOM.style.cursor = 'pointer';
    btnRollDOM.style.cursor = 'pointer';

    // reset scores
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // reset names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // remove active and winner classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');

    // add the active class to the first player
    document.querySelector('.player-0-panel').classList.add('active');
}