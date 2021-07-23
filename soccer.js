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

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  engine.gravity.y = 0;
  // create two boxes and a ground
  ball = Bodies.circle(400, 300, 20);
  player = Bodies.circle(200, 300, 40);
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
  if (keyCode  === LEFT_ARROW) {
    Body.applyForce(player, player.position, {x:-0.01, y:0});
  }
  if (keyCode  === RIGHT_ARROW) {
    Body.applyForce(player, player.position, {x:+0.01, y:0});
  }
  if (keyCode  === UP_ARROW) {
    Body.applyForce(player, player.position, {x:0, y:-0.01});
  } 
  if (keyCode  === DOWN_ARROW) {
    Body.applyForce(player, player.position, {x:0, y:+0.01});
  } 
}