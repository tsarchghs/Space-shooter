
canvas = document.getElementById("canvas");
canvas.width = 916;
canvas.height = window.window.innerHeight;

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
player = new Player_SpaceShip(ctx,canvas.width/2 - 50,canvas.height - 100,100,70,500);
gameOver = new ImageClass(ctx,10,10,900,300,"img/ui/gameOver.png");
CollisionDetector = new CollisionDetection();
keyState = [];
score = new Score(ctx,canvas.width/2,10,25,30,0);
health = new Health(ctx,10,10,30,30);
healthPickUp = new HealthPickup(ctx,300,200,30,30,"img/ui/player/playerLife.png");
playButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/playButton.png");
infoButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/infoButton.png");
settingsButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/settingsButton.png");
playButton = new Button(ctx,undefined,300,250,250,"img/ui/buttons/playButton.png");
replayButton = new Button(ctx,undefined,370,125,125,"img/ui/buttons/replayButton.png");
homeButton = new Button(ctx,undefined,undefined,125,125,"img/ui/buttons/homeButton.png");
var lastTime;
var asteroids = [];
var pickups = [];
var logo = new ImageClass(ctx,100,10,900,300,"img/ui/logo.png");

game_scene = new Game(player,health,score,pickups,asteroids,gameOver,replayButton,homeButton);
menu_scene = new Menu(canvas,logo,playButton,infoButton,settingsButton);
credits_scene = new Credits(canvas,ctx,logo,homeButton);
buttons = [playButton,infoButton,infoButton,playButton,replayButton,homeButton,credits_scene.leftArrowButton];

function gameLoop(){
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	canvas.height = window.window.innerHeight;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if (menu_scene.playButton.pressed){
		game_scene.show = true;
		menu_scene.playButton.pressed = false;
	} else if (homeButton.pressed){
		game_scene.show = false;
		game_scene.reset;
		homeButton.pressed = false;
		menu_scene.show = true;
	} 
	if (credits_scene.leftArrowButton.pressed){
		credits_scene.show = false;
		menu_scene.show = true;
		credits_scene.leftArrowButton.pressed = false;
	}
	if (infoButton.pressed){
		menu_scene.show = false;
		credits_scene.show = true;
		infoButton.pressed = false;
	}
	if (game_scene.show){
		game_scene.draw;
		game_scene.dt = dt;
	} else if (menu_scene.show) {
		menu_scene.draw;
	} else if (credits_scene.show){
		credits_scene.draw;
	}
	lastTime = now;
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
