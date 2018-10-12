
canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.window.innerHeight - 50;
ctx = canvas.getContext("2d");
class Player_SpaceShip{
	constructor(ctx,x,y,w,h,speed,dt){
		this.ctx = ctx;
		this.image = document.getElementById("player_spaceship_img");;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.dt = dt;
		this.lasers = []
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		var laser_image = document.getElementById("laser_image");
		this.ctx.beginPath();
		this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		for (var i in this.lasers){
			var laser = this.lasers[i];	
			this.ctx.drawImage(laser_image,laser.x,laser.y,laser.w,laser.h);
			this.lasers[i].y -= laser.speed * this.dt;
		}
	}
	get move(){
		this.move_player();
	}
	move_player(){
		if (keyState["ArrowUp"] || keyState["w"]){
			this.y -= this.speed * this.dt;
		}
		if (keyState["ArrowLeft"] || keyState["a"]){
			this.x -= this.speed * this.dt;
		}
		if (keyState["ArrowDown"] || keyState["s"]){
			this.y += this.speed * this.dt;
		}
		if (keyState["ArrowRight"] || keyState["d"]){
			this.x += this.speed * this.dt;
		}
		if (keyState[" "]) {
			this.shoot();
		}
	}
	shoot(){
		var middle = this.x + this.w - (this.w / 2) - 5;
		this.lasers.push({"x":middle,"y":this.y - 15,"w":10,"h":30,"speed":1000});
	}
}
player = new Player_SpaceShip(ctx,100,200,100,100,100);
keyState = {};

document.addEventListener("keydown", (event) => {
	keyState[event.key] = true;
})
document.addEventListener("keyup", (event) => {
	keyState[event.key] = false;
})

var lastTime;

function gameLoop(){
	canvas.width = window.innerWidth - 50;
	canvas.height = window.window.innerHeight - 50;
	ctx.clearRect(0,0,canvas.width,canvas.height);
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    lastTime = now;
    player.dt = dt;
	player.draw;
	player.move;
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
