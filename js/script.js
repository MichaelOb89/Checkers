//Global Variables:
const startingPosition = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,0],
    [0,0,1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,0],
    [0,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

let jumpOriginRow = 0;
let jumpOriginColumn = 0;
let row = 0;
let column = 0;
let selectedPiece = "";
let checkerPosition = "";
const checkers = [];
let canCapture = false;
let capturedPieceIndex = 0;
let blackTurn = true;
let possibleBlackMoveCounter = 0;
let possibleRedMoveCounter = 0;

//Cache from DOM

const boardContainer = document.querySelector(".board-container");
const startGameBtn = document.getElementById("start-checkers");
const turn = document.getElementById("turn");

    /* These variables represent the elements on the DOM in which the pieces will be attached to */

const row0 = document.querySelectorAll(".row0 > .hidden-squares > span");
const row1 = document.querySelectorAll(".first-row > span");
const row2 = document.querySelectorAll(".second-row > span");
const row3 = document.querySelectorAll(".third-row > span");
const row4 = document.querySelectorAll(".fourth-row > span");
const row5 = document.querySelectorAll(".fifth-row > span");
const row6 = document.querySelectorAll(".sixth-row > span");
const row7 = document.querySelectorAll(".seventh-row > span");
const row8 = document.querySelectorAll(".eighth-row > span");
const row9 = document.querySelectorAll(".row9 > .hidden-squares > span");

const domBoard = [row0,row1,row2,row3,row4,row5,row6,row7,row8,row9];

//Unsure if will be necessary to create each checker object

class checker {
    constructor(color, position, isKing){
        this.color = color;
        this.position = position;
        this.isKing = false;
    }
    retrieveIndexes(){
        for(let i=0;i<domBoard.length;i++){
            for(let j=0;j<domBoard[i].length;j++){
                if(domBoard[i][j].parentElement.getAttribute("id") == checkerPosition){
                    row = i;
                    column = j;
                }
            }
        }
        if(domBoard[row][column].classList[0]=="red-piece"||domBoard[row][column].classList[0]=="black-piece"){
            this.possibleMoves();
        }
    }
    possibleMoves(){
        domBoard.forEach(element => {                         //This makes it so when you select a different piece
            element.forEach(square => {                       //without moving the first, the squares
                square.classList.remove("possible-move");     //you can move to are reset
                square.classList.remove("possible-capture");
            });
        });
        if(selectedPiece.color == "red-piece" && !blackTurn){
            if(selectedPiece.isKing){
                if (domBoard[row+1][column+1].classList[0] ==  "black-piece" && domBoard[row+2][column+2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row+2][column+2].classList.add("possible-capture");
                    possibleRedMoveCounter += 1;
                }
                if (domBoard[row+1][column-1].classList[0] ==  "black-piece" && domBoard[row+2][column-2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row+2][column-2].classList.add("possible-capture");
                    possibleRedMoveCounter += 1;
                }
                if (domBoard[row-1][column-1].classList[0] == "black-piece" && domBoard[row-2][column-2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row-2][column-2].classList.add("possible-capture");
                    possibleRedMoveCounter += 1;
                }
                if (domBoard[row-1][column+1].classList[0] == "black-piece" && domBoard[row-2][column+2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row-2][column+2].classList.add("possible-capture");
                    possibleRedMoveCounter += 1;
                }if(!canCapture){
                    if(domBoard[row+1][column+1].classList == ""){
                        domBoard[row+1][column+1].classList.add("possible-move");
                        possibleRedMoveCounter += 1;
                    }
                    if(domBoard[row+1][column-1].classList == ""){
                        domBoard[row+1][column-1].classList.add("possible-move");
                        possibleRedMoveCounter += 1;
                    }
                    if(domBoard[row-1][column+1].classList == ""){
                        domBoard[row-1][column+1].classList.add("possible-move");
                        possibleRedMoveCounter += 1;
                    }
                    if(domBoard[row-1][column-1].classList == ""){
                        domBoard[row-1][column-1].classList.add("possible-move");
                        possibleRedMoveCounter += 1;
                    }
                }
            }else {
                if (domBoard[row+1][column+1].classList[0] == "black-piece" && domBoard[row+2][column+2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row+2][column+2].classList.add("possible-capture");
                    possibleRedMoveCounter += 1;
                }
                if (domBoard[row+1][column-1].classList[0] == "black-piece" && domBoard[row+2][column-2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row+2][column-2].classList.add("possible-capture");
                    possibleRedMoveCounter += 1;
                }
                if(!canCapture){
                    if(domBoard[row+1][column+1].classList == ""){
                        domBoard[row+1][column+1].classList.add("possible-move");
                        possibleRedMoveCounter += 1;
                    }
                    if(domBoard[row+1][column-1].classList == ""){
                        domBoard[row+1][column-1].classList.add("possible-move");
                        possibleRedMoveCounter += 1;
                    }
                }
            }
        }
        if(selectedPiece.color == "black-piece" && blackTurn){     
            if(selectedPiece.isKing == true){
                if (domBoard[row-1][column-1].classList[0] == "red-piece" && domBoard[row-2][column-2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row-2][column-2].classList.add("possible-capture");
                    possibleBlackMoveCounter += 1;
                }
                if (domBoard[row-1][column+1].classList[0] == "red-piece" && domBoard[row-2][column+2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row-2][column+2].classList.add("possible-capture");
                    possibleBlackMoveCounter += 1;
                }
                if (domBoard[row+1][column+1].classList[0] == "red-piece" && domBoard[row+2][column+2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row+2][column+2].classList.add("possible-capture");
                    possibleBlackMoveCounter += 1;
                }
                if (domBoard[row+1][column-1].classList[0] == "red-piece" && domBoard[row+2][column-2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row+2][column-2].classList.add("possible-capture");
                    possibleBlackMoveCounter += 1;
                }if(!canCapture){
                    if(domBoard[row+1][column+1].classList == ""){
                        domBoard[row+1][column+1].classList.add("possible-move");
                        possibleBlackMoveCounter += 1;
                    }
                    if(domBoard[row+1][column-1].classList == ""){
                        domBoard[row+1][column-1].classList.add("possible-move");
                        possibleBlackMoveCounter += 1;
                    }
                    if(domBoard[row-1][column+1].classList == ""){
                        domBoard[row-1][column+1].classList.add("possible-move");
                        possibleBlackMoveCounter += 1;
                    }
                    if(domBoard[row-1][column-1].classList == ""){
                        domBoard[row-1][column-1].classList.add("possible-move");
                        possibleBlackMoveCounter += 1;
                    }
                }
            }else{
                if (domBoard[row-1][column-1].classList[0] == "red-piece" && domBoard[row-2][column-2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row-2][column-2].classList.add("possible-capture");
                    possibleBlackMoveCounter += 1;
                }
                if (domBoard[row-1][column+1].classList[0] == "red-piece" && domBoard[row-2][column+2].classList == ""){
                    canCapture = true;
                    jumpOriginColumn = column;
                    jumpOriginRow = row;
                    domBoard[row-2][column+2].classList.add("possible-capture");
                    possibleBlackMoveCounter += 1;
                }
                if(!canCapture){    
                    if(domBoard[row-1][column+1].classList == ""){
                        domBoard[row-1][column+1].classList.add("possible-move");
                        possibleBlackMoveCounter += 1;
                    }
                    if(domBoard[row-1][column-1].classList == ""){
                        domBoard[row-1][column-1].classList.add("possible-move");
                        possibleBlackMoveCounter += 1;
                    }
                }
            }
        }
    }
}


// Functions
/* This is the function for starting the game. It places all pieces in the correct spots in the startingPosition array and passes this on the dom Board  */

const startGame = (event) => {
    checkers.length = 0;
    for(let i = 0; i < startingPosition.length ;i++){
        for(let j = 0; j < startingPosition[i].length; j++){
            if(startingPosition[i][j] == 1 && i<4){
                checkers.push(new checker("red-piece", domBoard[i][j]));
            } else if(startingPosition[i][j] == 1 && i>5){
                checkers.push(new checker("black-piece", domBoard[i][j]));
            }
        }
    }
    renderBoard();
}

const checkForKings = (element) => {
    if(!element.isKing){
        if(element.color == "red-piece" && element.position.parentElement.parentElement.classList == "row8"){
            element.isKing = true;
        } else if(element.color == "black-piece" && element.position.parentElement.parentElement.classList == "row1"){
            element.isKing = true;
        }
    }
}

const checkCapture = (element) => {
    if(blackTurn && element.color == "black-piece"){
    checkerPosition = element.position.parentElement.getAttribute("id");
    selectedPiece = element;
    element.retrieveIndexes();
    console.log(possibleBlackMoveCounter);
    }else if(!blackTurn && element.color == "red-piece"){
        checkerPosition = element.position.parentElement.getAttribute("id");
        selectedPiece = element;
        element.retrieveIndexes();
        console.log(possibleRedMoveCounter);
    }
    domBoard.forEach(element => {                         //This makes it so when you select a different piece
        element.forEach(square => {                       //without moving the first, the squares
            square.classList.remove("possible-move");     //you can move to are reset
            square.classList.remove("possible-capture");
        });
    });
}

//This function renders the board with current positions of all pieces

const renderBoard = (event) => {
    possibleBlackMoveCounter = 0;
    possibleRedMoveCounter = 0;
    domBoard.forEach(element =>{
        element.forEach(cell =>{
            cell.classList.remove("red-piece");
            cell.classList.remove("black-piece");
            cell.classList.remove("false");
            cell.classList.remove("true");
        })
    })
    domBoard.forEach(element => {
        element.forEach(square => {
            square.classList.remove("possible-move");
            square.classList.remove("possible-capture");
        })
    })
    checkers.forEach(checkForKings);
    checkers.forEach(element => {
        element.position.classList.add(element.color);
        element.position.classList.add(element.isKing);
    })
    checkers.forEach(checkCapture);
    if(blackTurn){
        turn.textContent = "Black plays next move";
        turn.style.color = "black";
    } else{
        turn.textContent = "Red plays next move";
        turn.style.color = "crimson";
    }
    if(blackTurn && possibleBlackMoveCounter == 0){
        alert("Red Wins");
    }
    if(!blackTurn && possibleRedMoveCounter == 0){
        alert("Black Wins");
    }
}

const selectSquare = (event) => {
    checkerPosition = event.target.parentElement.getAttribute("id");
    if(checkers.find(element => element.position.parentElement.getAttribute("id") ==  checkerPosition)){
        selectedPiece = checkers.find(element => element.position.parentElement.getAttribute("id") ==  checkerPosition);
        selectedPiece.retrieveIndexes();
    } else if(event.target.classList == "possible-move"){
        event.target.classList.remove("possible-move");
        selectedPiece.position = event.target;
        blackTurn = !blackTurn;
        renderBoard();
    } else if(event.target.classList == "possible-capture"){
        event.target.classList.remove("possible-capture");
        selectedPiece.retrieveIndexes();
        selectedPiece.position = event.target;
        findCapturedPiece();
        checkers.splice(capturedPieceIndex, 1);
        canCapture = false;
        renderBoard();
        checkCapture(selectedPiece);
        if(!canCapture){
            blackTurn = !blackTurn;
        }
        renderBoard();
    }    
}

const findCapturedPiece = (event) =>{
    capturedPieceIndex =  checkers.findIndex(element => element.position == domBoard[(row+jumpOriginRow)/2][(column+jumpOriginColumn)/2]);
}


//Event Listeners
startGameBtn.addEventListener("click", startGame);
boardContainer.addEventListener("click", selectSquare);