const gameBoard = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0]
];

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

const renderBoard = (event) => {
    for(let i = 0; i < gameBoard.length ;i++){
        for(let j = 0; j < gameBoard[i].length; j++){
            if(gameBoard[i][j] == 1 && i<3){
                domBoard[i][j].classList.add("red-pieces");
            }
        }
    }
}

renderBoard()