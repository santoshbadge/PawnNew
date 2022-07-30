var pawn;
const pawnWidth = 30;
const pawnHeight = 30;
const canvasWidth = pawnWidth * 8;
const canvasHeight = pawnHeight * 8;
var pawnCurrentX;
var pawnCurrentY;
var firstMoveDone = false;
var checksArray = [{x:0,y:0},{x:60,y:0},{x:120,y:0}, {x:180,y:0},
              {x:30,y:30},{x:90,y:30},{x:150,y:30}, {x:210,y:30},
              {x:0,y:60},{x:60,y:60},{x:120,y:60}, {x:180,y:60},
              {x:30,y:90},{x:90,y:90},{x:150,y:90}, {x:210,y:90},
              {x:0,y:120},{x:60,y:120},{x:120,y:120}, {x:180,y:120},
              {x:30,y:150},{x:90,y:150},{x:150,y:150}, {x:210,y:150},
              {x:0,y:180},{x:60,y:180},{x:120,y:180}, {x:180,y:180},
              {x:30,y:210},{x:90,y:210},{x:150,y:210}, {x:210,y:210}];

// FUnctin to initialize game
function initGame() {
    chessBoard.start();
    pawn = new component(pawnWidth, pawnHeight, "red", 0, 0);    
}

var chessBoard = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        drawChecks(this.context);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 140);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    }
}
// Function to update position of pawn
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;        
    this.update = function() {
        ctx = chessBoard.context;
        drawChecks(ctx);
        restrictPawn(this);
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);    
    }

    this.newPos = function() {      
        this.x += this.speedX;
        this.y += this.speedY;            
        pawnCurrentX = this.x;
        pawnCurrentY = this.y;
    }    
}

// Function to restrict pawn from going outside
function restrictPawn(pawn) {
    if (pawn.x < 0 ) {
        pawn.x = 0;
    }        
    if (pawn.x + pawnWidth > canvasWidth) {
       pawn.x= canvasWidth - pawnWidth;
    }
    if (pawn.y < 0 ) {
        pawn.y =0;
    }        
    if (pawn.y + pawnHeight > canvasHeight) {
       pawn.y= canvasHeight - pawnHeight;
    }
}
// Function to draw black and white checks 
function drawChecks(ctx) {
    for (let i = 0; i < checksArray.length; i++ ) {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "white";
        ctx.fillStyle =  "white";
        ctx.fillRect(checksArray[i].x, checksArray[i].y, pawnWidth, pawnHeight)
        ctx.rect(checksArray[i].x, checksArray[i].y, pawnWidth, pawnHeight);  
        ctx.stroke();    
    }    
}

// Function gets called after every interval of 140 ms
function updateGameArea() {     
    chessBoard.clear();
    pawn.newPos();    
    pawn.update();    
}

// Function to reset pawn X and Y values
function clearmove() {
    pawn.speedX = 0; 
    pawn.speedY = 0; 
}

// Function to move pawn on the left side
function  moveLeft() {    
	pawn.speedX = -pawnWidth; 	
}

// Function to move pawn to right side
function  moveRight() {    
	pawn.speedX = pawnWidth; 	
}

// Function to move pawn on the up side
function  moveUp() {    
    pawn.speedY = -pawnHeight;   
}

// Function to move pawn to down side
function  moveDown() {    
    pawn.speedY = pawnHeight;   
}

// Function to place pawn at perticular check box 
function placePawn() {
    let x= Number(document.getElementById("placeX").value);
    let y= Number(document.getElementById("placeY").value);

    if ((x % pawnWidth == 0 && x<= canvasWidth) &&
        (y % pawnHeight == 0 && y<= canvasHeight)) {         
        x = x - pawnCurrentX;
        y = y - pawnCurrentY;       
        pawn.speedX = x; 
        pawn.speedY = y; 
        resetInput();
    } else {
        document.getElementById("error").innerHTML = "Please enter value in multiples of pawn size: 30";
    }    
}

// Function to reset values of input box and error message
function resetInput() {   
    document.getElementById("error").innerHTML = " ";
    document.getElementById("placeX").innerHTML = "0";
    document.getElementById("placeY").innerHTML = "0";
}

// Function to pawn X position
function moveX() {

}

// Function to display pawn details on screen
function report() {    
    document.getElementById("xpos").innerHTML = pawnCurrentX;
    document.getElementById("ypos").innerHTML = pawnCurrentY;
}