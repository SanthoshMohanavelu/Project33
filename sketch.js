const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var rope2;

var bg_img;
var food;
var rabbit;
var button,button2,

var bunny
var blink,eat,sad;


function preload() {

  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png"); 





  blink.playing = true;
  eat.playing = true;
  sad.playing = true;




}


function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createImg('cut_btn.png');
  button.position(1500,680);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
   button2.position(1200,680);
   button2.size(60,60);
   button2.mouseClicked(drop2);


   rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});

  ground = new Ground(200,30,600,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,50,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking')

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() {
  background(51);
  image(bg_img,0,0,displayWidth,displayHeight);
  
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
 
  
  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }

   rope.show();
   rope2.show();

   Engine.update(engine);
  drawSprites();
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}