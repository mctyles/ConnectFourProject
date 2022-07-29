let state = {};

function initializeGame (){
    state.game = [
        //           0  1  2  3  4  5  6
                    [0, 0, 0, 0, 0, 0, 0], //0
                    [0, 0, 0, 0, 0, 0, 0], //1
                    [0, 0, 0, 0, 0, 0, 0], //2
                    [0, 0, 0, 0, 0, 0, 0], //3
                    [0, 0, 0, 0, 0, 0, 0], //4
                    [0, 0, 0, 0, 0, 0, 0]  //5
            ];
    state.player1turn = true;
    state.playerNumber = 0;
    state.tileColor = '';
    state.oneplayer = true;
    state.currentPlayerName = '';
    state.win = false;
    state.rowNumPlayed = 0;
    state.colNumPlayed = 0;
}

const playerSelectMenu = document.getElementById('player-select-menu');
const playerSelectButton = document.getElementById('player-select-button');
const playerNames = document.getElementById('player-names');
const turnStatus = document.getElementById('turn-status');
let playerOptionSelected = 'singleplayer';

playerSelectMenu.addEventListener('change', function(event){
    playerOptionSelected = event.target.value;
})

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
        state.oneplayer = false;
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
    if (!playerNameInput2){
        state.player2Name = 'Computer';
    }
    playerList.innerText = `Player 1: ${state.player1Name} vs Player 2: ${state.player2Name}`;
    playerNames.appendChild(playerList);
    playerNameContainer.remove();
    setBoard();
}

function checkSlots(columnNum) {
    for (let i = 5; i >= 0; i--) {
        if (state.game[i][columnNum] === 0){
            state.game[i][columnNum] = 'mark';
            break;
        }
    }
}

function getRandomColumnNum() {
    return Math.floor(Math.random() * 6)
}

function determineTurn (){
    if (state.player1turn){
        state.playerNumber = 1;
        state.tileColor = 'yellow';
    } else {
        state.playerNumber = 2;
        state.tileColor = 'red';
    }
    state.lastPlayCoordinates = [];  
}

function updateTurnStatusText() {
    if (state.player1turn) {
        state.currentPlayerName = `${state.player1Name}`;
        turnStatus.style.color = 'yellow';
        turnStatus.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
    } else {
        state.currentPlayerName = `${state.player2Name}`
        turnStatus.style.color = 'red';
        turnStatus.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';       
    }
    turnStatus.innerText = `It's ${state.currentPlayerName}'s turn!`
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
        if (event.target.className === 'play-arrow' && !state.win){
            let currentOpenSlot = '';
            checkSlots(Number(event.target.id));
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
                    if (!state.win) {
                        updateTurnStatusText();
                    }
                }
            }
            if (state.oneplayer && !state.win) {
                determineTurn();
                let randomColumnNum = getRandomColumnNum();
                checkSlots(randomColumnNum);
                for (let i = 5; i >= 0; i--) {
                    if (state.game[i][randomColumnNum] === 'mark'){
                        currentOpenSlot = document.getElementById(`row-${i}-slot-${randomColumnNum}`)
                        currentOpenSlot.style.backgroundColor = `${state.tileColor}`;
                        state.game[i][randomColumnNum] = state.playerNumber;
                        state.rowNumPlayed = i;
                        state.colNumPlayed = Number(event.target.id);
                        state.player1turn = state.player1turn !== true;
                        checkForWin();
                        if (!state.win) {
                            updateTurnStatusText();
                        }
                        console.log('test')
                    }
                }
            }
        }
    });
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
    console.log(tileMatchCount);
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
    console.log(tileMatchCount);
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
    console.log(tileMatchCount);
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
    console.log(tileMatchCount);
}

function checkForWin(){
    let rowNum = state.rowNumPlayed;
    let colNum = state.colNumPlayed;
    checkRowForWin(rowNum, colNum);
    checkColumnForWin(rowNum, colNum);
    checkPositiveDiagForWin(rowNum, colNum);
    checkNegativeDiagForWin(rowNum, colNum);
    if (state.win) {
        turnStatus.innerText = `${state.currentPlayerName} Wins!`
    }
}

/* for (let i = 0; i < 6; i++){
    checkSlots(i);
    for (let j = 5; j >= 0; j--) {
        if (state.game[j][i] === 'mark') {
            state.game[j][i] = 2;
            checkForWin();
            if (!state.win) {
                state.game[j][i] = 1;
                checkForWin();
                if (state.win){
                    state.game[j][i] = 2;
                    currentOpenSlot = document.getElementById(`row-${j}-slot-${i}`)
                    currentOpenSlot.style.backgroundColor = `${state.tileColor}`;
                } else {

                }
            }
        }
    }
}
*/