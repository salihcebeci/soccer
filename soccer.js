// Daniel Shiffman
// Matter.js + p5.js Examples
// This example is based on examples from: http://brm.io/matter-js/


var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Composite = Matter.Composite;

var engine;

var ball;
var player;
var ground1;
var ground2;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var MOVEMENT_STOP = 0;
var MOVEMENT_UP = 1;
var MOVEMENT_DOWN = 2;
var MOVEMENT_LEFT = 3;
var MOVEMENT_RIGHT = 4;
var MOVEMENT_UPRIGHT = 5;
var MOVEMENT_UPLEFT = 6;
var MOVEMENT_DOWNRIGHT = 7;
var MOVEMENT_DOWNLEFT = 8;

var movement = MOVEMENT_STOP;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  engine.gravity.y = 0;
  // create two boxes and a ground
  ball = Bodies.circle(400, 300, 10);
  player = Bodies.circle(200, 300, 20);
  ground1 = Bodies.rectangle(400, 610, 810, 60, {
    isStatic: true
  });
  ground2 = Bodies.rectangle(400, -10, 810, 60, {
    isStatic: true
  });
  World.add(engine.world, [ball, player, ground1, ground2]);
  Engine.run(engine);
}

// Using p5 to render
function draw() {

  updateMovement();
  updatePlayer();

  background(50, 200, 50);
  fill(255);
  circle(ball.position.x, ball.position.y, 20);
  fill(200, 80, 80);
  circle(player.position.x, player.position.y, 40);
  fill(255);
  rect(400, 610, 810, 60);
  rect(0, 580, 800, 20);
  rect(0, 0, 800, 20);

}

function keyPressed() {
  if (keyCode  === LEFT_ARROW)
    leftPressed = true;
  if (keyCode  === RIGHT_ARROW)
    rightPressed = true;
  if (keyCode  === UP_ARROW)
    upPressed = true;
  if (keyCode  === DOWN_ARROW)
    downPressed = true;
}

function keyReleased(){
  if (keyCode  === LEFT_ARROW)
    leftPressed = false;
  if (keyCode  === RIGHT_ARROW)
    rightPressed = false;
  if (keyCode  === UP_ARROW)
    upPressed = false;
  if (keyCode  === DOWN_ARROW)
    downPressed = false;
}

function updateMovement(){
  if (!leftPressed && !rightPressed && !upPressed && !downPressed)
    movement = MOVEMENT_STOP;
  if (leftPressed && upPressed)
    movement = MOVEMENT_UPLEFT;
  if (leftPressed && downPressed)
    movement = MOVEMENT_DOWNLEFT;
  if (rightPressed && upPressed)
    movement = MOVEMENT_UPRIGHT;
  if (rightPressed && downPressed)
    movement = MOVEMENT_DOWNRIGHT;
  if (leftPressed && !upPressed && !downPressed && !rightPressed)
    movement = MOVEMENT_LEFT;
  if (rightPressed && !upPressed && !downPressed && !leftPressed)
    movement = MOVEMENT_RIGHT;
  if (upPressed && !leftPressed && !rightPressed && !downPressed)
    movement = MOVEMENT_UP;
  if (downPressed && !leftPressed && !rightPressed && !upPressed)
    movement = MOVEMENT_DOWN;
}


function updatePlayer(){
  var x = 0;
  var y = 0;

  coef = 0.0005;

  switch(movement) {
  case MOVEMENT_UP:
    y = -1 * coef;
    break;
  case MOVEMENT_DOWN:
    y = coef;
    break;
  case MOVEMENT_LEFT:
    x = -1 * coef;
    break;
  case MOVEMENT_RIGHT:
    x = coef;
    break;
  case MOVEMENT_UPLEFT:
    x = -1 * coef;
    y = -1 * coef;
    break;
  case MOVEMENT_UPRIGHT:
    x = coef;
    y = -1 * coef;
    break;
  case MOVEMENT_DOWNLEFT:
    x = -1 * coef;
    y = coef;
    break;
  case MOVEMENT_DOWNRIGHT:
    x = coef;
    y = coef;
    break;
  }


  Body.applyForce(player, player.position, {x:x, y:y});

}



//
