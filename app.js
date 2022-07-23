const playerSelectMenu = document.getElementById('player-select-menu');
const playerSelectButton = document.getElementById('player-select-button');
let playerOptionSelected = 'singleplayer';
let playerNameButton = '';
const playerNames = document.getElementById('player-names');

playerSelectMenu.addEventListener('change', function(event){
    playerOptionSelected = event.target.value;
})


function enterPlayerName() {
    const gametypeSelect = document.getElementById('gametype-select');
    gametypeSelect.remove();
    if (playerOptionSelected === 'singleplayer') {
        let playerNameText1 = document.createElement('p');
        let playerNameInput1 = document.createElement('input');
        playerNameButton = document.createElement('button');
        playerNameText1.className = 'player-name-text';
        playerNameInput1.className = 'player-name-input';
        playerNameButton.className = 'player-name-button';
        playerNameText1.innerText = "Enter your name here:";
        playerNameButton.innerText = "Start";
        playerNames.appendChild(playerNameText1);
        playerNames.appendChild(playerNameInput1);
        playerNames.appendChild(playerNameButton);
    } else {
        let playerNameText1 = document.createElement('p');
        let playerNameInput1 = document.createElement('input');
        let playerNameText2 = document.createElement('p');
        let playerNameInput2 = document.createElement('input');
        playerNameButton = document.createElement('button');
        playerNameText1.className = 'player-name-text-1';
        playerNameInput1.className = 'player-name-input-1';
        playerNameText2.className = 'player-name-text-2';
        playerNameInput2.className = 'player-name-input-2';
        playerNameButton.className = 'player-name-button';
        playerNameText1.innerText = "Enter Player 1 name:";
        playerNameText2.innerText = "Enter Player 2 name:";
        playerNameButton.innerText = "Start";
        playerNames.appendChild(playerNameText1);
        playerNames.appendChild(playerNameInput1);
        playerNames.appendChild(playerNameText2);
        playerNames.appendChild(playerNameInput2);
        playerNames.appendChild(playerNameButton);
    }
}

playerSelectButton.addEventListener('click', enterPlayerName);

function startGame() {
    let player1Name = playerNameInput1.value;
    let player2Name = playerNameInput2.value;
    let playerList = document.createElement('h3');
    if (!playerNameInput2) {
        player2Name = 'Computer';
    } 
    playerList.innerText = `Player 1: ${player1Name} vs Player 2: ${player2Name}`;
    playerNames.appendChild(playerList);
}

playerNameButton.addEventListener('click', startGame);

let gameState = {};