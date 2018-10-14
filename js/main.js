
canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.window.innerHeight - 50;
ctx = canvas.getContext("2d");
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}
window.addEventListener("mousemove", (event) => {
	pos = getMousePos(canvas,event);
	playButton.screenX = pos.x;
	playButton.screenY = pos.y;
});
window.addEventListener("mouseup", (event) => {
	playButton.mousePressed = false;
})
window.addEventListener("mousedown", (event) => {
	playButton.mousePressed = true;
})
document.addEventListener("keydown", (event) => {
	keyState[event.key] = true;
})
document.addEventListener("keyup", (event) => {
	keyState[event.key] = false;
})
player = new Player_SpaceShip(ctx,300,500,100,70,500);
player.x = canvas.width/2 - 50;
gameOver = new Text(ctx,"Game Over!","80px 'Anton', sans-serif","red","center",canvas.width/2,canvas.height/2);
CollisionDetector = new CollisionDetection();
keyState = [];
score = new Score(ctx,canvas.width/2,10,15,20,30);
health = new Health(ctx,10,10,30,30);
healthPickUp = new HealthPickup(ctx,300,200,30,30,"img/ui/player/playerLife.png");
playButton = new Button(ctx,canvas.width/2,200,250,100,"img/ui/buttons/playButton.png");
buttons = [playButton];

var lastTime;
var asteroids = [];
var pickups = [];
var asteroids_at_once = 2
var asteroids_thrown = 0
var pickups_at_once = 1;
var pickups_thrown = 10;
var pickups_thrown_reset = 10;

function createAsteroid(dt){
	if (dt){
		if (asteroids_at_once > asteroids_thrown){
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) + 1) * -1;
			asteroid = new Asteroid(ctx,100,x,y,50,50,300);
			asteroid.x = x;
			asteroid.y = y;
			asteroids.push(asteroid);
			asteroids_thrown++;
		}
		asteroids_thrown -= asteroids_at_once * dt;
	}
}

function createHealthPickUp(dt){
	if (dt){
		if (pickups_at_once > pickups_thrown){
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) + 1) * -1;
			health_pickUp = new HealthPickup(ctx,x,y,30,30,"img/ui/player/playerLife.png");
			pickups.push(["HealthPickup",health_pickUp]);
			pickups_thrown = pickups_thrown_reset;
		}
		pickups_thrown -= pickups_at_once * dt;
	}
}
show_game_scene = false;
show_menu_scene = true;
game_scene = new Game(player,health,score,pickups,asteroids,gameOver);

function gameLoop(){
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	canvas.width = window.innerWidth - 50;
	canvas.height = window.window.innerHeight - 50;
	playButton.x = 500;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if (show_game_scene){
		game_scene.draw;
		game_scene.dt = dt;
	} else if (show_menu_scene) {
		playButton.draw;
		if (playButton.pressed){
			playButton.pressed = false;
			show_menu_scene = false;
			show_game_scene = true;
		}
	}
	lastTime = now;
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
