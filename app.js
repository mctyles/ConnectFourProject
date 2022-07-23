const playerSelectMenu = document.getElementById('player-select-menu');
const playerSelectButton = document.getElementById('player-select-button');
let playerOptionSelected = 'singleplayer';
const playerNames = document.getElementById('player-names');

let gameState = {
    game: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
};

playerSelectMenu.addEventListener('change', function(event){
    playerOptionSelected = event.target.value;
})

const game = document.getElementById('game');
const boardTable = document.createElement('table');

function setBoard() {
    let rowCount = 0;
    
    function makeRow(){
        let row = document.createElement('tr');
        row.className ='row';
        boardTable.className = 'board-table';
        for (let i = 0; i < 7; i++) {
            let slot = document.createElement('td');
            slot.className ='slot';
            slot.setAttribute('id', `row-${rowCount}-slot-${i}`);
            row.appendChild(slot);
        }
        boardTable.appendChild(row);
    }

    let gameButtonContainer = document.createElement('div');
    gameButtonContainer.className = 'game-button-container';

    function makeButtonRow() {
        for (let i = 0; i < 7; i++) {
            let dropTokenButton = document.createElement('button');
            dropTokenButton.className = 'drop-token-button';
            dropTokenButton.setAttribute('id', `column-${i}`)
            gameButtonContainer.appendChild(dropTokenButton);
        }
    }

    makeButtonRow();

    for (let i = 0; i < 6; i++) {
        rowCount = i;
        makeRow();
        }
        
    game.appendChild(gameButtonContainer);
    game.appendChild(boardTable);
}


function startGame(){
    let playerNameInput1 = document.querySelector('.player-name-input-1');
    let playerNameInput2 = document.querySelector('.player-name-input-2');
    let playerNameContainer = document.querySelector('.player-name-container');
    let player1Name = playerNameInput1.value;
    let player2Name = '';
    if (playerOptionSelected === 'twoplayers') {
        player2Name = playerNameInput2.value;
    }
    let playerList = document.createElement('h3');
    if (!playerNameInput2){
        player2Name = 'Computer';
    }
    playerList.innerText = `Player 1: ${player1Name} vs Player 2: ${player2Name}`;
    playerNames.appendChild(playerList);
    playerNameContainer.remove();
    setBoard();
}

function enterPlayerName() {
    const gametypeSelect = document.getElementById('gametype-select');
    gametypeSelect.remove();
    let playerNameContainer = document.createElement('div');
    let playerNameText1 = document.createElement('p');
    let playerNameInput1 = document.createElement('input');
    let playerNameButton = document.createElement('button');
    playerNameContainer.className = 'player-name-container';
    playerNameText1.className = 'player-name-text-1';
    playerNameInput1.className = 'player-name-input-1';
    playerNameButton.className = 'player-name-button';
    playerNameText1.innerText = "Enter your name here:";
    playerNameButton.innerText = "Start";
    playerNames.appendChild(playerNameContainer);
    playerNameContainer.appendChild(playerNameText1);
    playerNameContainer.appendChild(playerNameInput1);
        if (playerOptionSelected === 'twoplayers') {
        let playerNameText2 = document.createElement('p');
        let playerNameInput2 = document.createElement('input');
        playerNameText2.className = 'player-name-text-2';
        playerNameInput2.className = 'player-name-input-2';
        playerNameContainer.appendChild(playerNameText2);
        playerNameContainer.appendChild(playerNameInput2);
    }
        playerNameContainer.appendChild(playerNameButton);
        playerNameButton.addEventListener('click', startGame);
}

playerSelectButton.addEventListener('click', enterPlayerName);

//let playerNameButton = document.querySelector('.player-name-button');
//playerNameButton.addEventListener('click', startGame);
