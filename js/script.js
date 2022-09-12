//Global Variables:
const gameBoard = [];
let row = 0;
let column = 0;
let selectedPiece = "";
let targetPosition = "";
//Cache from DOM

const boardContainer = document.querySelector(".board-container");
const startGameBtn = document.getElementById("start-checkers");

    /* These variables represent the elements on the DOM in which the pieces will be attached to */
const row1 = document.querySelectorAll(".first-row > span");
const row2 = document.querySelectorAll(".second-row > span");
const row3 = document.querySelectorAll(".third-row > span");
const row4 = document.querySelectorAll(".fourth-row > span");
const row5 = document.querySelectorAll(".fifth-row > span");
const row6 = document.querySelectorAll(".sixth-row > span");
const row7 = document.querySelectorAll(".seventh-row > span");
const row8 = document.querySelectorAll(".eighth-row > span");

const domBoard = [row1,row2,row3,row4,row5,row6,row7,row8];

//Unsure if will be necessary to create each checker object
// class checker {
//     constructor(color, position, isKing){
//         this.color = color;
//         this.position = position;
//         this.isKing = false;
//     }
//     legalmoves(){

//     }
//     move(){

//     }
//     jump(){

//     }

// }

// Functions
/* This is the function for starting the game. It places all pieces in the correct spots in the gameBoard array and passes this on the dom Board  */
const startGame = (event) => {
    while(gameBoard.length>0){
        gameBoard.splice(0,gameBoard.length);
    }
    gameBoard.push(
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0]);

    for(let i = 0; i < gameBoard.length ;i++){
        for(let j = 0; j < gameBoard[i].length; j++){
            if(gameBoard[i][j] == 1 && i<3){
                domBoard[i][j].classList.add("red-piece");
            } else if(gameBoard[i][j] == 1 && i>4){
                domBoard[i][j].classList.add("black-piece");
            }
        }
    }

}


const moveFunction = (event) => {
    targetPosition = event.target.parentElement.getAttribute("id");
    if(event.target.classList == ("red-piece")){
        currentPosition();
    }
    if(event.target.classList == "possible-move"){
        event.target.classList.remove("possible-move");
        event.target.classList.add("red-piece");
        domBoard[row][column].classList.remove("red-piece");
    }
}

/*This Function assigns the position of the piece clicked to the variables row and column */

const currentPosition = (event) => {
    for(let i=0;i<domBoard.length;i++){
        for(let j=0;j<domBoard[i].length;j++){
            if(domBoard[i][j].parentElement.getAttribute("id") == targetPosition){
                row = i;
                column = j;
                console.log(i, j);
            }
        }
    }
    domBoard.forEach(element => {                         //This makes it so when you select a different piece
        element.forEach(square => {                       //without moving the first, the squares
            square.classList.remove("possible-move");     //you can move to are reset
        });
    });
    legalMoves();
}

//This code determines which squares the player can move to

const legalMoves = (event) => {
    if(domBoard[row][column].getAttribute("class") == "red-piece"){
        if(domBoard[row+1][column-1].classList == ""){
            domBoard[row+1][column-1].classList.add("possible-move");
        }
        if(domBoard[row+1][column+1].classList == ""){
            domBoard[row+1][column+1].classList.add("possible-move");
        }
    }
}

//Event Listeners
startGameBtn.addEventListener("click", startGame);
boardContainer.addEventListener("click", moveFunction);