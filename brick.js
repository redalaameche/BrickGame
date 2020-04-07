//initiation du context
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
// some constants
const PADDLE_HEIGHT = 31;
const PADDLE_WIDTH = 150;
const DOWN_SPACE = 100;
const BALL_RADIUS=15;
//Objects
paddle = {
    // coordonee a l'etat zero
  y : canvas.height - PADDLE_HEIGHT - DOWN_SPACE,
  x : (canvas.width/2)-(PADDLE_WIDTH/2),
   //step
  dx : 3,

}
ball = {
    // coordonee a l'etat zero
  y : canvas.height - PADDLE_HEIGHT - DOWN_SPACE - BALL_RADIUS,
  x : canvas.width/2,
    //step
  dx : 3,
  dy : -3,
}
//drawing Paddle

function drawPaddle(){
    ctx.fillStyle = 'bleu';
    ctx.fillRect(paddle.x,paddle.y,PADDLE_WIDTH,PADDLE_HEIGHT);
}
// drawing BALL
function drawBall(){
  ctx.beginPath();
  ctx.fillStyle='red';
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
}

drawBall();


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
  function resetGame(){
    start = false;
    ball.dx = 3;
    ball.dy = -3;
    ball.x = canvas.width/2;
    ball.y = canvas.height - PADDLE_HEIGHT - DOWN_SPACE - BALL_RADIUS;
    paddle.x = (canvas.width/2)-(PADDLE_WIDTH/2);
    paddle.y = canvas.height - PADDLE_HEIGHT - DOWN_SPACE;

  }

  function iScolsionPaddle(){
    if(ball.x - BALL_RADIUS > paddle.x &&
      ball.x + BALL_RADIUS < paddle.x + PADDLE_WIDTH &&
      ball.y + BALL_RADIUS > paddle.y && ball.y + BALL_RADIUS < paddle.y + PADDLE_HEIGHT  ){

      return true;
    }
  }
  //testfunction
  let tabs = [];
  let COL = 4;
  let ROW = 6;
  const BRICK_WIDTH = 100;
  const BRICK_HEIGHT = 30;
  const OFSSET = 40;
  function createBricks(){
    for(let i = 0; i < ROW; i++){
      tabs[i] = [];
      for(let j = 0; j < COL; j++){
        tabs[i][j]= {x : i*(OFSSET + BRICK_WIDTH) + OFSSET, y : j*(OFSSET + BRICK_HEIGHT) + OFSSET, statu : true,};
      }
    }
   }
  console.log(tabs);
  function drawBricks(){
    for(let i = 0; i < ROW; i++){
      for(let j = 0; j < COL; j++){
        if (tabs[i][j].statu) {
          ctx.fillRect(tabs[i][j].x, tabs[i][j].y, BRICK_WIDTH, BRICK_HEIGHT);
        }
      }
    }
  }
  function colisionBricks(){
    for(let i = 0; i < ROW; i++){
      for(let j = 0; j < COL; j++){
        if(ball.x - BALL_RADIUS > tabs[i][j].x && ball.x + BALL_RADIUS < tabs[i][j].x + BRICK_WIDTH &&
          ball.y + BALL_RADIUS > tabs[i][j].y && ball.y + BALL_RADIUS < tabs[i][j].y + BRICK_HEIGHT) {
            tabs[i][j].statu = false;
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
//animation frame function
createBricks();


function frame(){


// clear frame
ctx.clearRect(0,0,canvas.width,canvas.height);
// draw
drawBricks();
drawPaddle();
drawBall();
//update
movePaddle();
moveBall();
colisionBricks();


//loop the function
requestAnimationFrame(frame);
}
frame();
