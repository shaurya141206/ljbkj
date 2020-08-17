var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird 


var score=0;

var gameOver, restart;
var pipeImage,skyImage,GameoverImage,birdDieSound,ReplayImage,pipe2Image,birdImage

function preload(){
  birdImage = loadImage("bird.png");
  pipeImage = loadImage("pipe.png");
  skyImage = loadImage("sky.gif");
  pipe2Image = loadImage("pipe2.png");
 
 
  GameoverImg = loadImage("Gameover.png");
  ReplayImg = loadImage("Replay.png");
  
  
  birdDieSound = loadSound("birdDie.mp3");
  
  
}

function setup() {
  createCanvas(700,400);
  
 
  
  
  
  Gameover = createSprite(300,100);
  Gameover.addImage(GameoverImg);
  
 Replay = createSprite(300,140);
  Replay.addImage(ReplayImg);
  
  Gameover.scale = 0.5;
  Replay.scale = 0.5;

  Gameover.visible = false;
  Replay.visible = false;
  bird = createSprite(46,208,20,50);
  bird.scale = 0.5;
bird.addImage(birdImage);
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(skyImage)
  text("Score: "+ score, 500,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    if (keyDown("space")){
      bird.velocityY = -10
    }
    fill("black")
    text(mouseX+","+mouseY,400,30); 
  
    
  
   // bird.velocityX= bird.velocityX + 0.8
  
     
     
  
    
    spawnObstacles();
    spawnObstacles2();
    
  
    if(obstaclesGroup.isTouching(bird)){
      birdDieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    Gameover.visible = false;
    Replay.visible = false;
    
    //set velcity of each game object to 0
    
    bird.velocityY = 0;
    obstaclesGroup.setVelocityYEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-2);
    
    
    if(mousePressedOver(Replay)) {
      Replay();
    }
  }
  
  
  drawSprites();
}


  


function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(661,76,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.depth = 3; 
    
    //generate random obstacles
   
     obstacle.addImage(pipeImage);
              
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnObstacles2() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(675,317,40);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.depth = 4;
    
    //generate random obstacles
   
     obstacle.addImage(pipe2Image);
              
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  Gameover.visible = false;
  Replay.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  
  score = 0;
  
}
