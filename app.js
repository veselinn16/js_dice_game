/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the switch player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the switch player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, currentPlayer;

const diceDOM = document.querySelector('.dice');

start();

const button = () => {
    let dice = Math.floor(Math.random() * 6) + 1; // generate number from 1 to 6    
    
    // make dice visible and set the appropriate image
    diceDOM.style.visibility = 'visible';
    diceDOM.src = `dice-${dice}.png`;
    currentPlayerDOM = document.getElementById(`current-${currentPlayer}`);
    console.log(currentPlayerDOM);

    if(dice > 1) {
        roundScore += dice;
        // selects the current score field based on the current player
        currentPlayerDOM.textContent = roundScore;
    } else {
        switchPlayer()
    }
}


const switchPlayer = () => {
    currentPlayerDOM.textContent = 0;
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;

    // indicate visibly that whose turn it is to roll the dice
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.visibility = 'hidden';
}

document.querySelector('.btn-roll').addEventListener('click', button);

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[currentPlayer] += roundScore;

    document.getElementById(`score-${currentPlayer}`).textContent = scores[currentPlayer];
   
    // check if player wins
    if(scores[currentPlayer] >= 10)  {
        document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
        diceDOM.style.visibility = 'hidden';
        document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
    } else {
        switchPlayer();
    }    
});

document.querySelector('.btn-new').addEventListener('click', start);

function start() {
    // 0 -first player 1-second player
    scores = [0, 0];
    currentPlayer = 0;
    roundScore = 0;

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