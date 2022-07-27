const playerSelectMenu = document.getElementById('player-select-menu');
const playerSelectButton = document.getElementById('player-select-button');
let playerOptionSelected = 'singleplayer';
const playerNames = document.getElementById('player-names');
const turnStatus = document.getElementById('turn-status');


let gameState = {};

function initializeGame (){
    gameState.game = [
        //           0  1  2  3  4  5  6
                    [0, 0, 0, 0, 0, 0, 0], //0
                    [0, 0, 0, 0, 0, 0, 0], //1
                    [0, 0, 0, 0, 0, 0, 0], //2
                    [0, 0, 0, 0, 0, 0, 0], //3
                    [0, 0, 0, 0, 0, 0, 0], //4
                    [0, 0, 0, 0, 0, 0, 0]  //5
            ]
    gameState.indexLastPlay = [];
    gameState.player1turn = true;
    gameState.playerNumber = 0;
    gameState.tileColor = '';
    gameState.oneplayer = true;
    gameState.currentPlayerName = '';
    gameState.win = false;
}

playerSelectMenu.addEventListener('change', function(event){
    playerOptionSelected = event.target.value;
})

const gameContainer = document.getElementById('game');
const boardTable = document.createElement('table');

function checkSlots(columnNum) {
    for (let i = 5; i >= 0; i--) {
        if (gameState.game[i][columnNum] === 0){
            gameState.game[i][columnNum] = 'mark';
            break;
        }
    }
}

function getRandomColumnNum() {
    return Math.floor(Math.random() * 6)
}

function determineTurn (){
    if (gameState.player1turn){
        gameState.playerNumber = 1;
        gameState.tileColor = 'yellow';
    } else {
        gameState.playerNumber = 2;
        gameState.tileColor = 'red';
    }
    gameState.indexLastPlay = [];  
}

function updateTurnStatusText() {
    if (gameState.player1turn) {
        gameState.currentPlayerName = `${gameState.player1Name}`;
    } else {
        gameState.currentPlayerName = `${gameState.player2Name}`
    }
    turnStatus.innerText = `It's ${gameState.currentPlayerName}'s turn!`
}

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

    let playArrowContainer = document.createElement('div');
    playArrowContainer.className = 'play-arrow-container';

    function makePlayArrow() {
        for (let i = 0; i < 7; i++) {
            let playArrow = document.createElement('div');
            playArrow.className = 'play-arrow';
            playArrow.setAttribute('id', `${i}`)
            playArrowContainer.appendChild(playArrow);
        }
    }

    makePlayArrow();

    for (let i = 0; i < 6; i++) {
        rowCount = i;
        makeRow();
        }
        
    gameContainer.appendChild(playArrowContainer);
    gameContainer.appendChild(boardTable);
    
    updateTurnStatusText();
    playArrowContainer.addEventListener('click', function(event){ 
        if (event.target.className === 'play-arrow'){
            let currentOpenSlot = '';
            checkSlots(Number(event.target.id));
            determineTurn();
            for (let i = 5; i >= 0; i--) {
                if (gameState.game[i][Number(event.target.id)] === 'mark') {
                    currentOpenSlot = document.getElementById(`row-${i}-slot-${Number(event.target.id)}`)
                    currentOpenSlot.style.backgroundColor = `${gameState.tileColor}`;
                    gameState.game[i][Number(event.target.id)] = gameState.playerNumber;
                    gameState.indexLastPlay.push(i);
                    gameState.indexLastPlay.push(Number(event.target.id));
                    gameState.player1turn = gameState.player1turn !== true;
                    checkForWin();
                }
            }
            updateTurnStatusText();
            if (gameState.oneplayer) {
                determineTurn();
                let randomColumnNum = getRandomColumnNum();
                checkSlots(randomColumnNum);
                for (let i = 5; i >= 0; i--) {
                    if (gameState.game[i][randomColumnNum] === 'mark'){
                        currentOpenSlot = document.getElementById(`row-${i}-slot-${randomColumnNum}`)
                        currentOpenSlot.style.backgroundColor = `${gameState.tileColor}`;
                        gameState.game[i][randomColumnNum] = gameState.playerNumber;
                        gameState.indexLastPlay.push(i);
                        gameState.indexLastPlay.push(Number(event.target.id));
                        gameState.player1turn = gameState.player1turn !== true;
                        checkForWin();
                    }
                }
                updateTurnStatusText();
            }
        }
        checkForWin();
    });
}

function checkRowForWin(){
    let rowNumPlayed = gameState.indexLastPlay[0];
    let tileMatchCount = 0;
    for (let i = 0; i < 7; i++) {
        if (gameState.game[rowNumPlayed][i] === undefined) {
            break;
        }
        if (gameState.game[rowNumPlayed][i] !== 0 && gameState.game[rowNumPlayed][i] === gameState.game[rowNumPlayed][i - 1]) {
            tileMatchCount++;
        } else {
            tileMatchCount = 0;
        }
    }
    if (tileMatchCount >= 4) {
        gameState.win = true;
    }
}

function checkColumnForWin(){
    let colNumPlayed = gameState.indexLastPlay[1];
    let tileMatchCount = 0;
    for (let i = 0; i < 7; i++) {
        if (gameState.game[i][colNumPlayed] === undefined){
            break;
        }
        if (gameState.game[i][colNumPlayed] !== 0 && gameState.game[i][colNumPlayed] === gameState.game[i - 1][colNumPlayed]){
            tileMatchCount++;
        } else {
            tileMatchCount = 0;
        }
    }
    if (tileMatchCount >= 4) {
        gameState.win = true;
    }
}


function checkPositiveDiagForWin() {
    let rowNumPlayed = gameState.indexLastPlay[0];
    let ColNumPlayed = gameState.indexLastPlay[1];
    let tileMatchCount = 0; 
    let newTile = gameState.game[rowNumPlayed][ColNumPlayed];
    for (let i = 0; i < 6; i ++){
        newTile = gameState.game[rowNumPlayed++][ColNumPlayed--];
        rowNumPlayed++;
        ColNumPlayed--;
        if (newTile === undefined) {
            newTile = gameState.game[rowNumPlayed - 1][ColNumPlayed + 1];
            rowNumPlayed--;
            ColNumPlayed++;
            break;
        }
    }
    for (let i = 0; i < 6; i ++) {
        newTile = gameState.game[rowNumPlayed--][ColNumPlayed++];
        if (newTile === undefined) {
            break;
        }
        if (newTile !== 0 && newTile === gameState.game[rowNumPlayed + 1][ColNumPlayed - 1]){
            tileMatchCount++;
        } else {
            tileMatchCount = 0;
        }
    }
    if (tileMatchCount >= 4) {
        gameState.win = true;
    }
}

function checkNegativeDiagForWin() {
    let rowNumPlayed = gameState.indexLastPlay[0];
    let ColNumPlayed = gameState.indexLastPlay[1];
    let tileMatchCount = 0; 
    let newTile = gameState.game[rowNumPlayed][ColNumPlayed];
    for (let i = 0; i < 6; i ++){
        newTile = gameState.game[rowNumPlayed--][ColNumPlayed++];
        rowNumPlayed--;
        ColNumPlayed++;
        if (newTile === undefined) {
            newTile = gameState.game[rowNumPlayed + 1][ColNumPlayed - 1];
            rowNumPlayed++;
            ColNumPlayed--;
            break;
        }
    }
    for (let i = 0; i < 6; i ++) {
        newTile = gameState.game[rowNumPlayed++][ColNumPlayed--];
        if (newTile === undefined) {
            break;
        }
        if (newTile !== 0 && newTile === gameState.game[rowNumPlayed - 1][ColNumPlayed + 1]){
            tileMatchCount++;
        } else {
            tileMatchCount = 0;
        }
    }
    if (tileMatchCount >= 4) {
        gameState.win = true;
    }
}

function checkForWin(){
    checkRowForWin();
    checkColumnForWin();
    checkPositiveDiagForWin();
    checkNegativeDiagForWin();
    if (gameState.win) {
        turnStatus.innerText = `${gameState.currentPlayerName} Wins!`
    }
}

function startGame(){
    let playerNameInput1 = document.querySelector('.player-name-input-1');
    let playerNameInput2 = document.querySelector('.player-name-input-2');
    let playerNameContainer = document.querySelector('.player-name-container');
    gameState.player1Name = playerNameInput1.value;
    gameState.player2Name = '';
    if (playerOptionSelected === 'twoplayers') {
        gameState.player2Name = playerNameInput2.value;
    }
    let playerList = document.createElement('h3');
    if (!playerNameInput2){
        gameState.player2Name = 'Computer';
    }
    playerList.innerText = `Player 1: ${gameState.player1Name} vs Player 2: ${gameState.player2Name}`;
    playerNames.appendChild(playerList);
    playerNameContainer.remove();
    setBoard();
}

function enterPlayerName() {
    initializeGame();
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
    playerNameText1.innerText = "Enter your name:";
    playerNameButton.innerText = "Start";
    playerNames.appendChild(playerNameContainer);
    playerNameContainer.appendChild(playerNameText1);
    playerNameContainer.appendChild(playerNameInput1);
        if (playerOptionSelected === 'twoplayers') {
        gameState.oneplayer = false;
        let playerNameText2 = document.createElement('p');
        let playerNameInput2 = document.createElement('input');
        playerNameText2.className = 'player-name-text-2';
        playerNameText1.innerText = "Enter Player 1 name:";
        playerNameInput2.className = 'player-name-input-2';
        playerNameText2.innerText = "Enter Player 2 name:";
        playerNameContainer.appendChild(playerNameText2);
        playerNameContainer.appendChild(playerNameInput2);
    }
        playerNameContainer.appendChild(playerNameButton);
        playerNameButton.addEventListener('click', startGame);
}

playerSelectButton.addEventListener('click', enterPlayerName);

//let playerNameButton = document.querySelector('.player-name-button');
//playerNameButton.addEventListener('click', startGame);
