
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
	for (var button in buttons){
		buttons[button].screenX = pos.x;
		buttons[button].screenY = pos.y;
	}
});
window.addEventListener("mouseup", (event) => {
	for (var button in buttons){
		buttons[button].mousePressed = false;
	}
})
window.addEventListener("mousedown", (event) => {
	for (var button in buttons){
		buttons[button].mousePressed = true;
	}
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
playButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/playButton.png");
infoButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/infoButton.png");
settingsButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/settingsButton.png");
playButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/playButton.png");
replayButton = new Button(ctx,undefined,370,125,125,"img/ui/buttons/replayButton.png");
homeButton = new Button(ctx,undefined,370,125,125,"img/ui/buttons/homeButton.png");
buttons = [playButton,infoButton,infoButton,playButton,replayButton,homeButton];

var lastTime;
var asteroids = [];
var pickups = [];
var asteroids_at_once = 2
var asteroids_thrown = 0
var pickups_at_once = 1;
var pickups_thrown = 10;
var pickups_thrown_reset = 10;
var logo = new ImageClass(ctx,100,10,900,300,"img/ui/logo.png");

show_game_scene = false;
show_menu_scene = true;
game_scene = new Game(player,health,score,pickups,asteroids,gameOver,replayButton,homeButton);
function gameLoop(){
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	canvas.width = window.innerWidth - 50;
	canvas.height = window.window.innerHeight - 50;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if (homeButton.pressed){
		show_game_scene = false;
		show_menu_scene = true;
		homeButton.pressed = false;
		game_scene.reset;
	}
	if (show_game_scene){
		game_scene.draw;
		game_scene.dt = dt;
	} else if (show_menu_scene) {
		logo.x = canvas.width/2 - (logo.w / 2);
		logo.draw;
		playButton.x = canvas.width/2 - (playButton.w / 2) - 250;
		playButton.draw;
		infoButton.x = playButton.x + playButton.w + 10;
		infoButton.draw;
		settingsButton.x = infoButton.x + infoButton.w + 10;
		settingsButton.draw;
		if (playButton.pressed){
			console.log("DSADS");
			playButton.pressed = false;
			show_menu_scene = false;
			show_game_scene = true;
		}
	}
	lastTime = now;
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
