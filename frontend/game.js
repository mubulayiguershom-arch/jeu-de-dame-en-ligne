const board = document.getElementById("board")

let selectedPiece = null

function createBoard(){

for(let i=0;i<64;i++){

const square=document.createElement("div")
square.classList.add("square")

if((Math.floor(i/8)+i)%2==0){
square.classList.add("white")
}else{
square.classList.add("black")
}

square.dataset.index=i

board.appendChild(square)

}

}

function createPieces(){

const squares=document.querySelectorAll(".square")

for(let i=0;i<64;i++){

if(Math.floor(i/8) < 3 && squares[i].classList.contains("black")){
addPiece(squares[i],"red")
}

if(Math.floor(i/8) > 4 && squares[i].classList.contains("black")){
addPiece(squares[i],"blue")
}

}

}

function addPiece(square,color){

const piece=document.createElement("div")
piece.classList.add("piece",color)

piece.addEventListener("click",selectPiece)

square.appendChild(piece)

}

function selectPiece(e){

if(selectedPiece){
selectedPiece.classList.remove("selected")
}

selectedPiece=e.target
selectedPiece.classList.add("selected")

}

createBoard()
createPieces()
