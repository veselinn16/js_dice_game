let scores, roundScore, currentPlayer, gamePlaying, prevDice, winScore;
// asks user when the game should end
winScore = prompt('At what score do you want the game to end?');

const diceDOM = document.querySelector('.dice');

start();

const button = () => {
    if(gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1; // generate number from 1 to 6    

        // make dice visible and set the appropriate image
        diceDOM.style.visibility = 'visible';
        diceDOM.src = `dice-${dice}.png`;
        currentPlayerDOM = document.getElementById(`current-${currentPlayer}`);

        if(dice > 1 && dice < 6) {
            // sets value of pevious dice
            (prevDice !== dice) && (prevDice = dice);
            
            roundScore += dice;
            // selects the current score field based on the current player
            currentPlayerDOM.textContent = roundScore;
        } else if (dice === 6) {
            // if the previous and current dice are both 6 player loses current score and it's the next player's turn
            (prevDice === 6 && dice === 6) && (switchPlayer());
            (prevDice !== dice) && (prevDice = dice);
        } else {
            switchPlayer()
        }
    }
}


const switchPlayer = () => {
    currentPlayerDOM.textContent = 0;
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    prevDice = null;

    // indicate visibly that whose turn it is to roll the dice
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.visibility = 'hidden';
}

document.querySelector('.btn-roll').addEventListener('click', button);

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        scores[currentPlayer] += roundScore;

        document.getElementById(`score-${currentPlayer}`).textContent = scores[currentPlayer];
    
        // check if player wins
        if(scores[currentPlayer] >= winScore)  {
            document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
            diceDOM.style.visibility = 'hidden';
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

    gamePlaying = true;

    // hide dice in beginning
    diceDOM.style.visibility = 'hidden';

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