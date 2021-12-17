var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cacto;
var cactoImage1,cactoImage2,cactoImage3;
var cloud, cloudsGroup, cloudImage;
var pontuacao = 0;
const JOGAR   = 1;
const ENCERRAR   = 0;
var estado = JOGAR;
var newImage;
var grupoDeNuvens;
var grupoDeCactos;
var trex_collide;
var jump,die,checkPoint;
var imagemRestart, restart;




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 cactoImage1 = loadImage('obstacle1.png');
 cactoImage2 = loadImage('obstacle2.png');
 cactoImage3 = loadImage('obstacle3.png');
 trex_collide = loadAnimation("trex_collided.png");
 jump = loadSound("jump.mp3");
 die = loadSound("die.mp3");
 checkPoint = loadSound("checkPoint.mp3");
 imagemRestart = loadImage("restart.png");


}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morreu", trex_collide);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(4+3*pontuacao/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  grupoDeNuvens = new Group();
  grupoDeCactos = new Group();
  //trex.debug = true;
  trex.setCollider("circle", -10,0, 45);
  restart = createSprite(300,130);
  restart.addImage("restart", imagemRestart);
  restart.scale = 0.5;

}

function draw() {
  background(180);
  text(' pontuação ' + pontuacao,500,50);
  
  
  
  
  
 
  
  
  
  
  drawSprites();

  if(estado == JOGAR){
    if(pontuacao%100 === 0 && pontuacao > 0){ checkPoint.play(); }
    //AÇÕES SÓ NO ESTADO JOGAR
    pontuacao = pontuacao + Math.round(frameRate ()/60);
    restart.visible = false;
    if(keyDown("space")&& trex.collide(invisibleGround) ) {
      trex.velocityY = -15;
      jump.play();
    }
    trex.velocityY = trex.velocityY + 0.8;
      //gerar as nuvens
    spawnClouds();
    criarCacto();
    if (ground.x <0){
      ground.x = ground. width/2;
    }
    if (grupoDeCactos.isTouching(trex)){
      estado = ENCERRAR;
      trex.changeAnimation("morreu");
      die.play();
    }
  }

  else if(estado == ENCERRAR){
    if(mousePressedOver(restart)){ 
      reset();
     }
    restart.visible = true;
    grupoDeCactos.setLifetimeEach(-1);
    grupoDeNuvens.setLifetimeEach(-1);
    //AÇÕES SÓ NO ESTADO ENCERRAR
    ground.velocityX = 0;
    grupoDeCactos.setVelocityXEach(0);
    grupoDeNuvens.setVelocityXEach(0);
    trex.velocityY = 0;
   
  }
  trex.collide(invisibleGround);
}
function reset(){ 
  estado = JOGAR; 
  grupoDeCactos.destroyEach();
  grupoDeNuvens.destroyEach();
  trex.changeAnimation("running", trex_running); 
  pontuacao = 0;
   }

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //atribua tempo de vida à variável
    cloud.lifetime = 200;
    
    //ajuste a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    grupoDeNuvens.add(cloud);
    }
}
function criarCacto(){
  if (frameCount%60 == 0){
    cacto = createSprite(600,165,10,40);
    cacto.velocityX = -(6+pontuacao/100);
    var numero = Math.round(random(1,3));
    switch(numero){
      case 1:
      cacto.addImage('cacto1',cactoImage1);
      break;
      case 2:
      cacto.addImage('cacto2',cactoImage2);
      break;
      case 3:
      cacto.addImage('cacto3',cactoImage3);
      break;
      default:break;
    }
    cacto.scale = 0.5;
    cacto.lifetime = 100;
    grupoDeCactos.add(cacto);
  }
}

