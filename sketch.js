//Create variables here
var dog, happyDog, database, foodS, foodStock, dogSprite;
function preload()
{
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(250, 250, 50, 75);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.3
  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  textSize(20);
  fill(0, 0, 0);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  text("Food Remaining: " + foodS, 150, 400);
  console.log(foodS);
}
function readStock(data) {
  foodS = data.val();
}
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x -= 1;
  }
  database.ref('/').update({Food: x});
  
}


