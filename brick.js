//initiation du context
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
// Constants
const PADDLE_HEIGHT = 9;
const PADDLE_WIDTH = 150;
const DOWN_SPACE = 25;
const BALL_RADIUS=9;
let tabs = [];//tableau de Brick
let COL = 4;//Colonne de tableau
let ROW = 7;//Ligne de tabelau
const BRICK_WIDTH = 109;
const BRICK_HEIGHT = 30;
const OFSSET = 25;
let score = 0;
//Objects
paddle = {
    // coordonee a l'etat zero
  y : canvas.height - PADDLE_HEIGHT - DOWN_SPACE,
  x : (canvas.width/2)-(PADDLE_WIDTH/2),
   //step
  dx : 15,

}
ball = {
    // coordonee a l'etat zero
  y : canvas.height - PADDLE_HEIGHT - DOWN_SPACE - BALL_RADIUS,
  x : canvas.width/2,
    //step
  dx : 6,
  dy : -6,
}
//drawing Paddle
function drawPaddle(){
    ctx.fillStyle = 'green';
    ctx.fillRect(paddle.x,paddle.y,PADDLE_WIDTH,PADDLE_HEIGHT);
}
// drawing BALL
function drawBall(){
  ctx.beginPath();
  ctx.fillStyle='blue';
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
}
// draw Bricks
function createBricks(){
  for(let i = 0; i < ROW; i++){
    tabs[i] = [];
    for(let j = 0; j < COL; j++){
      tabs[i][j]= {x : i*(OFSSET + BRICK_WIDTH) + OFSSET, y : j*(OFSSET + BRICK_HEIGHT) + OFSSET, statu : true,};
    }
  }
 }
function drawBricks(){
  for(let i = 0; i < ROW; i++){
    for(let j = 0; j < COL; j++){
      if (tabs[i][j].statu) {
        ctx.fillStyle='black';
        ctx.fillRect(tabs[i][j].x, tabs[i][j].y, BRICK_WIDTH, BRICK_HEIGHT);
      }
    }
  }
}
//draw drawScore
function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = 'bleu';
    ctx.fillText("Score: "+score,(canvas.width*90/100), 15);
    }

drawBall();
createBricks();
//Moving Paddle
function movePaddle(){
    if(leftArrow && paddle.x > 0 ){
        paddle.x -= paddle.dx;

    }else if(rightArrow && paddle.x + PADDLE_WIDTH < canvas.width){
     paddle.x += paddle.dx;
    }
}
//Mouvin BALL
start = false;
function moveBall(){
    if(start){
      ball.y += ball.dy;
      ball.x += ball.dx;
      if(ball.x + BALL_RADIUS > canvas.width || ball.x - BALL_RADIUS < 0){
        ball.dx =- ball.dx;
      }
      if(ball.y - BALL_RADIUS < 0){
        ball.dy =- ball.dy;
      }
      if(ball.y + BALL_RADIUS > canvas.height){
        resetGame();
      }
      if(iScolsionPaddle()){
        ball.dy =- ball.dy;
        console.log("ayih");
      }



    }
  }
//reseting Game
function resetGame(){
    createBricks();
    drawBricks();
    start = false;
    ball.dx = ball.dx;
    ball.dy = ball.dy;
    ball.x = canvas.width/2;
    ball.y = canvas.height - PADDLE_HEIGHT - DOWN_SPACE - BALL_RADIUS;
    paddle.x = (canvas.width/2)-(PADDLE_WIDTH/2);
    paddle.y = canvas.height - PADDLE_HEIGHT - DOWN_SPACE;


  }
//testColisionOdPaddle
function iScolsionPaddle(){
    if(ball.x - BALL_RADIUS > paddle.x &&
      ball.x + BALL_RADIUS < paddle.x + PADDLE_WIDTH &&
      ball.y + ((4/5)* BALL_RADIUS) > paddle.y && ball.y + ((4/5)* BALL_RADIUS) < paddle.y + PADDLE_HEIGHT  ){
      return true;
    }
  }
//disparition de Bricks
function colisionBricks(){
    for(let i = 0; i < ROW; i++){
      for(let j = 0; j < COL; j++){
        if(ball.x - BALL_RADIUS > tabs[i][j].x &&
          ball.x + BALL_RADIUS < tabs[i][j].x + BRICK_WIDTH &&
          ball.y + BALL_RADIUS > tabs[i][j].y &&
          ball.y -((4/5)* BALL_RADIUS) < tabs[i][j].y + BRICK_HEIGHT ) {
            tabs[i][j]= {x : 0, y : 0, statu : false,};
            ball.dy =-ball.dy;
            score++;


        }


      }
    }
  }
  





//listner
leftArrow = false;
rightArrow = false;
document.addEventListener("keydown",keydowny);
document.addEventListener("keyup",keyupy);
function keydowny(e){
    start = true;
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


//Main animation frame function

function frame(){
  // clear frame
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // draw
  drawBricks();
  drawPaddle();
  drawBall();
  drawScore();
  //update
  movePaddle();
  moveBall();
  colisionBricks();


  //loop the function
  requestAnimationFrame(frame);
}
frame();
