
canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.window.innerHeight - 50;
ctx = canvas.getContext("2d");

class Player_SpaceShip{
	constructor(ctx,x,y,w,h){
		this.ctx = ctx;
		this.image = document.getElementById("player_spaceship_img");;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.ctx.beginPath();
		this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
	}
}

player = new Player_SpaceShip(ctx,10,10,100,100);

function gameLoop(){
	player.draw;
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
