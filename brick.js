//initiation du context
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');


// some constants
const PADDLE_HEIGHT = 20;
const PADDLE_WIDTH = 150;
const DOWN_SPACE = 20;

//Objects
paddle = {
    // coordonee a l'etat zero
  y : canvas.height - PADDLE_HEIGHT - DOWN_SPACE,
  x : (canvas.width/2)-(PADDLE_WIDTH/2),
   //step
  dx:3,
 

}






function drawPaddle(){
    ctx.fillStyle = 'bleu';
    ctx.fillRect(paddle.x,paddle.y,PADDLE_WIDTH,PADDLE_HEIGHT);
}



function movePaddle(){
    if(leftArrow){
        paddle.x -= paddle.dx;

    }else if(rightArrow){
     paddle.x += paddle.dx;
    }
}

//listner 
leftArrow = false;
rightArrow = false;

document.addEventListener("keydown",keydowny);
document.addEventListener("keyup",keyupy);

function keydowny(e){
    if(e.keyCode === 37)
    leftArrow = true;
    if(e.keyCode === 39)
    rightArrow = true;
}
function keyupy(e){
    if(e.keyCode === 37)
    leftArrow = false;
    if(e.keyCode === 39)
    rightArrow = false;
}



//animation frame function

function frame(){


// clear frame
ctx.clearRect(0,0,canvas.width,canvas.height);
// draw
drawPaddle();
//update
movePaddle();


//loop the function
requestAnimationFrame(frame);
}
frame();


