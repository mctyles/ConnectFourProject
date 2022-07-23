const playerSelectMenu = document.getElementById('player-select-menu');
const playerSelectButton = document.getElementById('player-select-button');
let playerOptionSelected = 'singleplayer';

playerSelectMenu.addEventListener('change', function(event){
    playerOptionSelected = event.target.value;
})

function enterPlayerName() {
    const playerNames = document.getElementById('player-names');
    const gametypeSelect = document.getElementById('gametype-select');
    gametypeSelect.remove();
    if (playerOptionSelected === 'singleplayer') {
        let playerNameText = document.createElement('p');
        let playerNameInput = document.createElement('input');
        let playerNameButton = document.createElement('button');
        playerNameText.className = 'player-name-text';
        playerNameInput.className = 'player-name-input';
        playerNameButton.className = 'player-name-button';
        playerNameText.innerText = "Enter your name here:";
        playerNameButton.innerText = "Start";
        playerNames.appendChild(playerNameText);
        playerNames.appendChild(playerNameInput);
        playerNames.appendChild(playerNameButton);
    } else {
        let playerNameText1 = document.createElement('p');
        let playerNameInput1 = document.createElement('input');
        let playerNameButton1 = document.createElement('button');
        let playerNameText2 = document.createElement('p');
        let playerNameInput2 = document.createElement('input');
        let playerNameButton2 = document.createElement('button');
        playerNameText1.className = 'player-name-text-1';
        playerNameInput1.className = 'player-name-input-1';
        playerNameButton1.className = 'player-name-button-1';
        playerNameText2.className = 'player-name-text-2';
        playerNameInput2.className = 'player-name-input-2';
        playerNameButton2.className = 'player-name-button-2';
        playerNameText1.innerText = "Enter Player 1 name here:";
        playerNameButton1.innerText = "Enter";
        playerNameText2.innerText = "Enter Player 2 name here:";
        playerNameButton2.innerText = "Enter";
        playerNames.appendChild(playerNameText1);
        playerNames.appendChild(playerNameInput1);
        playerNames.appendChild(playerNameButton1);
        playerNames.appendChild(playerNameText2);
        playerNames.appendChild(playerNameInput2);
        playerNames.appendChild(playerNameButton2);
    }
}

playerSelectButton.addEventListener('click', enterPlayerName);