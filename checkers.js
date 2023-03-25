//This is an array of arrarys to hold the default layout of the checkers board*//
board = [
    [null, 'w', null, 'w', null, 'w', null, 'w'],
    ['w', null, 'w', null, 'w', null, 'w', null],
    [null, 'w', null, 'w', null, 'w', null, 'w'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['b', null, 'b', null, 'b', null, 'b', null],
    [null, 'b', null, 'b', null, 'b', null, 'b'],
    ['b', null, 'b', null, 'b', null, 'b', null]
]

function createBoard(){
//**//
var theBoard = document.createElement('section');
theBoard.id ='checkers';
document.body.appendChild(theBoard);
//this is the loop that creates each row. This loop will run 8 times
for ( var i = 0; i < 8; i++){
    //this nested loop will create each column. this code runs 8 times for each row.
    //which means this will run 64 times in total(8 rows * 8 columns)
    for (var j = 0; j < 8; j++){
        //the chessSpace variable is a new elemnet created each time this loop runs
        // this code will ultimitly  create 64 squares
        var square = document.createElement('div');

        //set the css classname  for each square so they have the same style
        square.classList.add("square");
        square.setAttribute("id", "div" + i + j);

        //if i+j divided by 2 has a reminder of 0, then change the background color
        //of the square to black, so the square alternate black and white
        if((i+j) % 2 == 1){
             square.classList.add("black");
             square.addEventListener("click", movePiece);
        }
            //add this new div to the partner chessboard div
             theBoard.appendChild(square);

             if(board[i][j]){
            createPiece('piece' + i + j, 'checker-' + board[i][j], square);

            }
         }

    }
}

const selValueElm = document.querySelector("#selectedSquare");


 function createPiece(id, pieceClass, theSquare){
     var newPiece = document.createElement('div');

     newPiece.setAttribute("id", id);
     newPiece.classList.add("checker");
     newPiece.classList.add(pieceClass);
     newPiece.addEventListener("click", getPlayerPieces);
     theSquare.appendChild(newPiece);
}

 function getPlayerPieces(){
     console.log("piece selected=",event.target.id);

    var selectedPieceId = event.target.id;
    selectedPieceId = selectedPieceId.replace("piece","");

    selValueElm.dataset.value = selectedPieceId;
}
function movePiece(){
    console.log("square selected=",event.target.id);

    var newSquareId = event.target.id;
    newSquareId = newSquareId.replace("div" , "");
    newSquareId = newSquareId.replace("piece", "");

    var selectedPieceId = selValueElm.dataset.value;

    if (selectedPieceId != newSquareId){
        var oldSquare = document.getElementById("div" + selectedPieceId);
        var oldPiece = document.getElementById("piece" + selectedPieceId);
        var pieceClass = oldPiece.classList[1];

        oldSquare.removeChild(oldPiece);

        var newSquare = document.getElementById("div"+ newSquareId);

        createPiece("piece" + newSquareId, pieceClass, newSquare);

        selValueElm.dataset.value = "";
    }
}