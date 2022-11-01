let state = {};

function initializeGame (){
    state.game = [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]
            ];
    state.player1turn = true;
    state.computerTurn = false;
    state.playerNumber = 0;
    state.tileColor = '';
    state.currentPlayerName = '';
    state.win = false;
    state.draw = false;
    state.rowNumPlayed = 0;
    state.colNumPlayed = 0;
}

const gametypeSelect = document.getElementById('gametype-select');
const playerSelectMenu = document.getElementById('player-select-menu');
const playerSelectButton = document.getElementById('player-select-button');
const playerNames = document.getElementById('player-names');
let playerOptionSelected = 'singleplayer';

playerSelectMenu.addEventListener('change', function(event){
    playerOptionSelected = event.target.value;
})

function enterPlayerName() {
    initializeGame();
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
        state.oneplayer = false;
        let playerNameText2 = document.createElement('p');
        let playerNameInput2 = document.createElement('input');
        playerNameText2.className = 'player-name-text-2';
        playerNameText1.innerText = "Enter Player 1 name:";
        playerNameInput2.className = 'player-name-input-2';
        playerNameText2.innerText = "Enter Player 2 name:";
        playerNameContainer.appendChild(playerNameText2);
        playerNameContainer.appendChild(playerNameInput2);
    } else {
        state.oneplayer = true;
    }
        playerNameContainer.appendChild(playerNameButton);
        playerNameButton.addEventListener('click', startGame);
}

playerSelectButton.addEventListener('click', enterPlayerName);

const gameContainer = document.getElementById('game');
const boardTable = document.createElement('table');

function startGame(){
    let playerNameInput1 = document.querySelector('.player-name-input-1');
    let playerNameInput2 = document.querySelector('.player-name-input-2');
    let playerNameContainer = document.querySelector('.player-name-container');
    state.player1Name = playerNameInput1.value;
    state.player2Name = '';
    if (playerOptionSelected === 'twoplayers') {
        state.player2Name = playerNameInput2.value;
    }
    let playerList = document.createElement('h3');
    playerList.setAttribute('id', 'player-list');
    let playerListContainer = document.createElement('div');
    playerListContainer.setAttribute('id', 'player-list-container');
    let firstPlayerTile = document.createElement('div');
    let secondPlayerTile = document.createElement('div');
    firstPlayerTile.setAttribute('id', 'first-player-tile');
    secondPlayerTile.setAttribute('id', 'second-player-tile');
    let turnStatusText = document.createElement('p');
    turnStatusText.setAttribute('id', 'turn-status');
    if (!playerNameInput2){
        state.player2Name = 'Computer';
    }
    playerList.innerText = `Player 1: ${state.player1Name} vs Player 2: ${state.player2Name}`;
    playerListContainer.appendChild(firstPlayerTile);
    playerListContainer.appendChild(playerList);
    playerListContainer.appendChild(secondPlayerTile);
    playerNames.appendChild(playerListContainer);
    playerNames.appendChild(turnStatusText);
    playerNameContainer.remove();
    setBoard();
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
    
    randomizeFirstPlay();
    updateTurnStatusText();
    determineTurn();

    let turnActive = false;
    
    playArrowContainer.addEventListener('click', function(event){ 
        if (!state.computerTurn && !turnActive){
            turnActive = true;
            if (event.target.className === 'play-arrow' && !state.win){
                let currentOpenSlot = '';
                checkSlots(Number(event.target.id));
                playTurn();
                if (state.oneplayer && !state.win && state.game[state.rowNumPlayed][state.colNumPlayed] === 1) {
                        state.computerTurn = true;
                        computerPlayTurn();
                    } 
                }
        }
        turnActive = false;
    });
} 

function checkSlots(columnNum) {
    for (let i = 5; i >= 0; i--) {
        if (state.game[i][columnNum] === 0){
            state.game[i][columnNum] = 'mark';
            break;
        }
    }
}

function getRandomNum() {
    return Math.floor(Math.random() * 7)
}

function randomizeFirstPlay (){
    let randomNum = getRandomNum();
    if (randomNum % 2 === 1) {
        state.player1turn = true;
    } else {
        state.player1turn = false;
    }
    if (!state.player1turn && state.oneplayer) {
        state.computerTurn = true;
        computerPlayTurn();
    }
}

function determineTurn (){
    if (state.player1turn){
        state.playerNumber = 1;
        state.tileColor = 'yellow';
    } else {
        state.playerNumber = 2;
        state.tileColor = 'red';
    }
}

function updateTurnStatusText() {
    let turnStatus = document.getElementById('turn-status');
    if (state.player1turn) {
        state.currentPlayerName = `${state.player1Name}`;
        turnStatus.style.color = '#F2E63D';
        turnStatus.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
    } else {
        state.currentPlayerName = `${state.player2Name}`
        turnStatus.style.color = '#D93030';
        turnStatus.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';       
    }
    turnStatus.innerText = `It's ${state.currentPlayerName}'s turn! Click the arrow above the column you would like to play.`
}

function playTurn(){
    determineTurn();
    for (let i = 5; i >= 0; i--) {
        if (state.game[i][Number(event.target.id)] === 'mark') {
            currentOpenSlot = document.getElementById(`row-${i}-slot-${Number(event.target.id)}`)
            currentOpenSlot.style.backgroundColor = `${state.tileColor}`;
            state.game[i][Number(event.target.id)] = state.playerNumber;
            state.rowNumPlayed = i;
            state.colNumPlayed = Number(event.target.id);
            state.player1turn = state.player1turn !== true;
            checkForWin();
            checkForDraw();
            if (state.win || state.draw) {
                displayGameEndText();
                createReplayButton();
            } else {
                updateTurnStatusText();
            }
        }
    }
}

async function computerPlayTurn(){
    await new Promise( resolve => {
        setTimeout ( () => {
    determineTurn();
    computerPlayWinningTile();
    if (state.game[state.rowNumPlayed][state.colNumPlayed] !== 2) {
        computerBlockWin();
    }
    while (state.game[state.rowNumPlayed][state.colNumPlayed] !== 2) {
        computerPlayRandomColumn();
    }
    state.player1turn = state.player1turn !== true;
    checkForWin();
    checkForDraw();
    if (state.win || state.draw) {
        displayGameEndText();
        createReplayButton();
    } else {
        updateTurnStatusText();
    }
    state.computerTurn = false;
    resolve();
}, 600)
})}

function computerPlayWinningTile (){
    for (let i = 0; i < 7; i++){
        checkSlots(i);
        for (let j = 5; j >= 0; j--) {
        if (state.game[j][i] === 'mark') {
            state.game[j][i] = 2;
            state.rowNumPlayed = j;
            state.colNumPlayed = i;
            checkForWin();
            if (state.win){
                currentOpenSlot = document.getElementById(`row-${j}-slot-${i}`)
                currentOpenSlot.style.backgroundColor = `${state.tileColor}`;
                break;
                } else {
                    state.game[j][i] = 0;
                    }
                }
            }
            if (state.game[state.rowNumPlayed][state.colNumPlayed] === 2){
                break;
        }
    }
}

function computerBlockWin(){
    for (let i = 0; i < 7; i++){
        checkSlots(i);
        for (let j = 5; j >= 0; j--) {
        if (state.game[j][i] === 'mark') {
                state.game[j][i] = 1;
                state.playerNumber = 1;
                state.rowNumPlayed = j;
                state.colNumPlayed = i;
                checkForWin();
                if (state.win){
                    state.win = false;
                    state.game[j][i] = 2;
                    state.playerNumber = 2;
                    currentOpenSlot = document.getElementById(`row-${j}-slot-${i}`)
                    currentOpenSlot.style.backgroundColor = `${state.tileColor}`;
                } else {
                    state.playerNumber = 2;
                    state.game[j][i] = 0;
                    }
                }
            }
            if (state.game[state.rowNumPlayed][state.colNumPlayed] === 2){
                break;
                }
            }
}

function computerPlayRandomColumn () {
    let randomColumnNum = getRandomNum();
    checkSlots(randomColumnNum);
    for (let j = 5; j >= 0; j--) {
        if (state.game[j][randomColumnNum] === 'mark'){
        currentOpenSlot = document.getElementById(`row-${j}-slot-${randomColumnNum}`)
        currentOpenSlot.style.backgroundColor = `${state.tileColor}`;
        state.game[j][randomColumnNum] = state.playerNumber;
        state.rowNumPlayed = j;
        state.colNumPlayed = randomColumnNum;
        }
    }
}

function checkRowForWin(row, column){
    let tileMatchCount = 0;
    for (let i = 1; i < 4; i++) {
        if (typeof state.game[row][column + i] === 'undefined') {
            continue;
        }
        if (state.game[row][column] === state.game[row][column + i]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    for (let i = 1; i < 4; i++) {
        if (typeof state.game[row][column - i] === 'undefined') {
            continue;
        }
        if (state.game[row][column] === state.game[row][column - i]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    if (tileMatchCount >= 3) {
        state.win = true;
    }
}

function checkColumnForWin(row, column){
    let tileMatchCount = 0;
    for (let i = row; i < row + 4; i++) {
        if (state.game[i] && state.playerNumber === state.game[i][column]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    if (tileMatchCount >= 4) {
        state.win = true;
    }
}

function checkPositiveDiagForWin(row, column) {
    let tileMatchCount = 0; 
    for (let i = 1; i < 4; i++) {
        if (state.game[row - i] && typeof state.game[row - i][column + i] === 'undefined') {
            continue;
        }
        if (state.game[row - i] && state.game[row][column] === state.game[row - i][column + i]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    for (let i = 1; i < 4; i++) {
        if (state.game[row + i] && typeof state.game[row + i][column - i] === 'undefined') {
            continue;
        }
        if (state.game[row + i] && state.game[row][column] === state.game[row + i][column - i]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    if (tileMatchCount >= 3) {
        state.win = true;
    }
}

function checkNegativeDiagForWin(row, column) {
    let tileMatchCount = 0; 
    for (let i = 1; i < 4; i++) {
        if (state.game[row - i] && typeof state.game[row - i][column - i] === 'undefined') {
            continue;
        }
        if (state.game[row - i] && state.game[row][column] === state.game[row - i][column - i]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    for (let i = 1; i < 4; i++) {
        if (state.game[row + i] && typeof state.game[row + i][column + i] === 'undefined') {
            continue;
        }
        if (state.game[row + i] && state.game[row][column] === state.game[row + i][column + i]) {
            tileMatchCount++;
        } else {
            break;
        }
    }
    if (tileMatchCount >= 3) {
        state.win = true;
    }
}

function checkForWin(){
    let rowNum = state.rowNumPlayed;
    let colNum = state.colNumPlayed;
    checkRowForWin(rowNum, colNum);
    checkColumnForWin(rowNum, colNum);
    checkPositiveDiagForWin(rowNum, colNum);
    checkNegativeDiagForWin(rowNum, colNum);
}

function checkForDraw() {
    for (let i = 0; i < 7; i++){
        if (state.game[0][i - 1] === 0){
            break;
        }
        for (let j = 0; j < 6; j++){
        if (state.game[j][i] === 0){
            break;
        } else if (state.game[j][i] !== 0 && i === 6 && j === 5 && !state.win) {
            state.draw = true;
        }
        }
    }
}

function displayGameEndText(){
    let turnStatus = document.getElementById('turn-status');
    if (state.win) {
    state.player1turn = state.player1turn !== true;
    turnStatus.innerText = `${state.currentPlayerName} Wins!`
    } else if (state.draw) {
        turnStatus.style.color = 'black';
        turnStatus.innerText = "It's a draw!"
    }
}

function createReplayButton(){
    let replayContainer = document.createElement('section');
    replayContainer.setAttribute('id', 'replay-container');
    replayButton = document.createElement('button');
    replayButton.innerText = "Play Again";
    replayContainer.appendChild(replayButton);
    replayButton.setAttribute('id', 'replay-button');
    replayButton.addEventListener('click', playAgain);
    backToMenuButton = document.createElement('button');
    backToMenuButton.innerText = "Back to Menu";
    replayContainer.appendChild(backToMenuButton);
    backToMenuButton.setAttribute('id', 'back-to-menu-button');
    backToMenuButton.addEventListener('click', backToMenu);
    document.body.appendChild(replayContainer);
}

function boardReset(){
    let currentSlot;
    for (let i = 0; i < 7; i++){
        for (let j = 0; j < 6; j++){
            currentSlot = document.getElementById(`row-${j}-slot-${i}`)
            currentSlot.style.backgroundColor = `${state.tileColor}`;
        }
    }
}

function playAgain(){
    let replayContainer = document.getElementById('replay-container');
    initializeGame();
    updateTurnStatusText();
    boardReset();
    replayButton.remove();
    backToMenuButton.remove();
    replayContainer.remove();
}

function backToMenu(){
    let turnStatus = document.getElementById('turn-status');
    let currentArrowContainer = document.querySelector('.play-arrow-container');
    let currentBoardTable = document.querySelector('.board-table');
    let playerList = document.getElementById('player-list');
    let replayContainer = document.getElementById('replay-container');
    let firstPlayerTile = document.getElementById('first-player-tile');
    let secondPlayerTile = document.getElementById('second-player-tile');
    for (let i = 0; i < 7; i++){
        for (let j = 0; j < 6; j++){
            let currentSlot = document.getElementById(`row-${j}-slot-${i}`)
            currentSlot.remove();
        }
    }
    currentBoardTable.remove();
    currentArrowContainer.remove();
    playerList.remove();
    turnStatus.innerText = '';
    document.body.appendChild(gametypeSelect);
    replayContainer.remove();
    firstPlayerTile.remove();
    secondPlayerTile.remove();
    replayButton.remove();
    backToMenuButton.remove();
    replayContainer.remove();
}
