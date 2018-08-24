/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the switch player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the switch player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;

let currentPlayer = 0; // 0 -first player 1-second player

const diceDOM = document.querySelector('.dice');

// hide dice in beginning
diceDOM.style.visibility = 'hidden';

const button = () => {
    let dice = Math.floor(Math.random() * 6) + 1; // generate number from 1 to 6    
    
    // make dice visible and set the appropriate image
    diceDOM.style.visibility = 'visible';
    diceDOM.src = `dice-${dice}.png`;
    currentPlayerDOM = document.querySelector(`#current-${currentPlayer}`);

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
    if(scores[currentPlayer] >= 1)  {
        document.getElementById(`name-${currentPlayer}`).textContent = 'Winner!';
        diceDOM.style.visibility = 'hidden';
        document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
    } else {
        switchPlayer();
    }    
});