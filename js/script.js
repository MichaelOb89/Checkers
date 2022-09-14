//Global Variables:
const startingPosition = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0]
];
let row = 0;
let column = 0;
let selectedPiece = "";
let checkerPosition = "";
const checkers = [];

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
                    console.log(i, j);
                }
            }
        }
        possibleMoves();
    }
}

// Functions
/* This is the function for starting the game. It places all pieces in the correct spots in the startingPosition array and passes this on the dom Board  */
const startGame = (event) => {
    checkers.length = 0;
    for(let i = 0; i < startingPosition.length ;i++){
        for(let j = 0; j < startingPosition[i].length; j++){
            if(startingPosition[i][j] == 1 && i<3){
                checkers.push(new checker("red-piece", domBoard[i][j]));
            } else if(startingPosition[i][j] == 1 && i>4){
                checkers.push(new checker("black-piece", domBoard[i][j]));
            }
        }
    }
    renderBoard();
}

//This function renders the board with current positions of all pieces

const renderBoard = (event) => {
    domBoard.forEach(element =>{
        element.forEach(cell =>{
            cell.classList.remove("red-piece");
            cell.classList.remove("black-piece");
        })
    })
    domBoard.forEach(element => {
        element.forEach(square => {
            square.classList.remove("possible-move");
        })
    })
    checkers.forEach(element => {
        element.position.classList.add(element.color);
    })
}

const selectSquare = (event) => {
    checkerPosition = event.target.parentElement.getAttribute("id");
    if(checkers.find(element => element.position.parentElement.getAttribute("id") ==  checkerPosition)){
        selectedPiece = checkers.find(element => element.position.parentElement.getAttribute("id") ==  checkerPosition);
        selectedPiece.retrieveIndexes();
    }
    else if(event.target.classList == "possible-move"){
        event.target.classList.remove("possible-move");
        selectedPiece.position = event.target;
        renderBoard();
    }
}

/*This Function assigns the position of the piece clicked to the variables row and column */

// const currentPosition = (event) => {
//     for(let i=0;i<domBoard.length;i++){
//         for(let j=0;j<domBoard[i].length;j++){
//             if(domBoard[i][j].parentElement.getAttribute("id") == checkerPosition){
//                 row = i;
//                 column = j;
//                 console.log(i, j);
//             }
//         }
//     }
//     domBoard.forEach(element => {                         //This makes it so when you select a different piece
//         element.forEach(square => {                       //without moving the first, the squares
//             square.classList.remove("possible-move");     //you can move to are reset
//         });
//     });
//     legalMoves();
// }

//This code determines which squares the player can move to

const possibleMoves = (event) => {
    domBoard.forEach(element => {                         //This makes it so when you select a different piece
        element.forEach(square => {                       //without moving the first, the squares
            square.classList.remove("possible-move");     //you can move to are reset
        });
    });
    if(selectedPiece.color == "red-piece"){
        // if(column == 0){
        //     if(domBoard[row+1][column+1].classList == ""){
        //         domBoard[row+1][column+1].classList.add("possible-move");
        //     }
        // } else if(column == 7){
        //     if(domBoard[row+1][column-1].classList == ""){
        //         domBoard[row+1][column-1].classList.add("possible-move");
        //     }
        // } else {
            if(domBoard[row+1][column+1].classList == ""){
                domBoard[row+1][column+1].classList.add("possible-move");
            }
            if(domBoard[row+1][column-1].classList == ""){
                domBoard[row+1][column-1].classList.add("possible-move");
            }
            if(domBoard[row+1][column+1].classList == "black-piece" && domBoard[row+2][column+2].classList == ""){
                domBoard[row+2][column+2].classList.add("possible-move");
            }
            if(domBoard[row+1][column-1].classList == ""){
                domBoard[row+1][column-1].classList.add("possible-move");
            }
        }
    //}
    if(selectedPiece.color == "black-piece"){
        if(column == 0){
            if(domBoard[row-1][column+1].classList == ""){
                domBoard[row-1][column+1].classList.add("possible-move");
            }
        } else if(column == 7){
            if(domBoard[row-1][column-1].classList == ""){
                domBoard[row-1][column-1].classList.add("possible-move");
            }
        } else {
            if(domBoard[row-1][column+1].classList == ""){
                domBoard[row-1][column+1].classList.add("possible-move");
            }
            if(domBoard[row-1][column-1].classList == ""){
                domBoard[row-1][column-1].classList.add("possible-move");
            }
        }
    }
}

//Event Listeners
startGameBtn.addEventListener("click", startGame);
boardContainer.addEventListener("click", selectSquare);