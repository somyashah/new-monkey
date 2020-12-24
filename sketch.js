//gameStates
PLAY=1;
END=0;
gameState=PLAY;

//varibles
var monkey , monkey_running,invisibleGround,ground,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,survivalTime;

function preload(){
  //loading images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("Collided",monkey_collided);
  monkey.scale=0.1;
  //creating ground
  ground=createSprite(300,350,1200,10);
 

  console.log(ground.x);
  
  survivalTime=0;
score=0;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 // monkey.debug=true;
  
  //creating invisible ground
  invisibleGround=createSprite(0,350,900,10);
  invisibleGround.visible=false;
  
 
  //creating group
  obstaclesGroup=new Group();
  bananasGroup=new Group();
}

function draw() {
  background("white");
 ground.velocityX=-(4+survivalTime*1.5/100);
  if(ground.x<=0){
   ground.x=ground.width/2;}
  
  monkey.collide(invisibleGround);
  
 if(gameState===PLAY){
   monkey.changeAnimation("moving",monkey_running); 
   if(monkey.isTouching(bananasGroup)){
     score+=1;  
   bananasGroup.destroyEach(); }
   if(keyDown("space")){
    monkey.velocityY=-13;}
  monkey.velocityY=monkey.velocityY+0.7;
    if(monkey.isTouching(obstaclesGroup)){
      gameState=END;}
   //creating score
  stroke("white");
  textSize(20);
  fill("black");
  text("SCORE:"+score,500,50);
  
  //creating survival time
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  spawnObstacles();
  spawnBananas();}
  
  if(gameState===END){
   
    monkey.changeAnimation("Collided",monkey_collided);
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();
    background("black");
    text("GAME OVER",350,190);
    textSize(60);
    fill("white");
  }
  
  drawSprites();
  
    }
  
  function spawnObstacles(){
    if(frameCount%100==0){
    obstacles=createSprite(600,320,10,10);
    obstacles.velocityX= -(4+score*1.5/100);
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.15;
  
    obstacles.lifetime=200; 
      obstaclesGroup.add(obstacles); }
  }
  
function spawnBananas(){
  if(frameCount%150==0)
  {
  bananas=createSprite(600,310,10,10);
  bananas.velocityX=-(4+score*1.9/100);
  bananas.y=Math.round(random(120,240));  bananas.addImage(bananaImage);
  bananas.scale=0.1;
  bananas.lifetime=200;
  bananasGroup.add(bananas);}
}

 




