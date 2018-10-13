
canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.window.innerHeight - 50;
ctx = canvas.getContext("2d");
class Player_SpaceShip{
	constructor(ctx,x,y,w,h,speed){
		this.destroyed = false;
		this.ctx = ctx;
		this.image = new Image();
		this.image.src = "img/player/player_ship.png";
		this.laser_image = new Image();
		this.laser_image.src = "img/player/lasers/lv_1.png";
		this.explosion_images = []
		for (var x=1;x<=27;x++){
			var explosion_img = new Image();
			explosion_img.src = `img/explosions/explosion_${String(x)}.png`;
			this.explosion_images.push(explosion_img);
		}
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.dt;
		this.lasers = []
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		if (!this.destroyed) {
			this.ctx.beginPath();
			this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
			for (var i in this.lasers){
				var laser = this.lasers[i];	
				if (this.lasers[i].y < 0){
					this.lasers.splice(i,1);
				}
				if (this.lasers[i]){
					this.ctx.drawImage(this.laser_image,laser.x,laser.y,laser.w,laser.h);
					this.lasers[i].y -= laser.speed * this.dt;
				}
			}
		} else {
			if (this.explosion_images[0]){
				this.ctx.beginPath();
				this.ctx.drawImage(this.explosion_images[0],this.x,this.y,this.w,this.h);
				this.explosion_images.splice(0,1);
			}
		}
	}
	get move(){
		this.move_player();
	}
	move_player(){
		if (!this.destroyed){
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
	}
	shoot(){
		var middle = this.x + this.w - (this.w / 2) - 5;
		this.lasers.push({"x":middle,"y":this.y - 25,"w":10,"h":30,"speed":1000});
	}
}
class Asteroid{
	constructor(ctx,x,y,w,h,speed,dt){
		this.destroyed = false;
		this.ctx = ctx;
		this.image = document.getElementById("asteroid");
		this.explosion_images = []
		for (var x=1;x<=27;x++){
			var explosion_img = new Image();
			explosion_img.src = `img/explosions/explosion_${String(x)}.png`;
			this.explosion_images.push(explosion_img);
		}
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.dt = dt;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		if (!this.destroyed){
			this.ctx.beginPath();
			this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		} else {
			if (this.explosion_images[0]){
				this.ctx.beginPath();
				this.ctx.drawImage(this.explosion_images[0],this.x,this.y,this.w,this.h);
				this.explosion_images.splice(0,1);
			}
		}
	}
}
class Text{
	constructor(ctx,text,font,fillStyle,textAlign,x,y){
		this.ctx = ctx;
		this.text = text;
		this.font = font;
		this.fillStyle = fillStyle;
		this.textAlign = textAlign;
		this.x = x;
		this.y = y;
		this.append; // Making it easier to change score and health values
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		var text = this.text;
		this.ctx.font = this.font;
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.textAlign = this.textAlign;
		if (this.append || this.append == 0){
			text += this.append;	
		}
		this.ctx.fillText(text,this.x,this.y);
	}
}
class CollisionDetection{
	constructor(){
		this.rect1;
		this.rect2;
	}
	get get_rect_rect_collision(){
		return this.rect_rect_collision();
	}
	rect_rect_collision(){
		if (this.rect1 && this.rect2){
			var rect1_over_rect2_vertical = (this.rect1.y + this.rect1.h < this.rect2.y)
			var rect1_below_rect2_vertical = (this.rect1.y > this.rect2.y + this.rect2.h)
			var rect1_over_rect2_horizontal = (this.rect1.x + this.rect1.w < this.rect2.x)
			var rect1_below_rect2_horizontal = (this.rect1.x > this.rect2.x + this.rect2.w)
			if (!(rect1_over_rect2_vertical || rect1_below_rect2_vertical ||
				   rect1_over_rect2_horizontal || rect1_below_rect2_horizontal)){
				return true;
			} else {
				return false;
			}
		}
	}
}
class Score{
	constructor(ctx,x,y,score=0){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.score = score;
		this.number_images = {};
		for (var x=0;x<10;x++){
			var number_image = new Image();
			number_image.src = `img/ui/numbers/numeral${x}.png`
			this.number_images[x] = number_image;
		}
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		var scoreNumbers = Array.from(String(this.score));
		var x = this.x;
		var y = this.y;
		for (var n in scoreNumbers){
			this.ctx.beginPath();
			this.ctx.drawImage(this.number_images[scoreNumbers[n]],x,y,20,30);
			x += 25;
		}
	}
}

player = new Player_SpaceShip(ctx,100,200,100,70,500);
health = new Text(ctx,"health:","30px 'Anton', sans-serif","gray","left",10,50);
health.append = 100;
gameOver = new Text(ctx,"Game Over!","80px 'Anton', sans-serif","red","center",canvas.width/2,canvas.height/2);
CollisionDetector = new CollisionDetection();
keyState = [];
score = new Score(ctx,canvas.width/2,10,15);

document.addEventListener("keydown", (event) => {
	keyState[event.key] = true;
})
document.addEventListener("keyup", (event) => {
	keyState[event.key] = false;
})

var lastTime;
var asteroids = [];
var asteroids_at_once = 2
var asteroids_thrown = 0

function createAsteroid(dt){
	if (dt){
		if (asteroids_at_once > asteroids_thrown){
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) + 1) * -1;
			asteroid = new Asteroid(ctx,x,y,50,50,300);
			asteroid.x = x;
			asteroid.y = y;
			asteroids.push(asteroid);
			asteroids_thrown++;
		}
		asteroids_thrown -= asteroids_at_once * dt;
	}
}


function gameLoop(){
	canvas.width = window.innerWidth - 50;
	canvas.height = window.window.innerHeight - 50;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	score.draw;
	if (!health.append){
		player.destroyed = true;
		gameOver.x = canvas.width/2
		gameOver.y = canvas.height/2
		score.x = gameOver.x - 50;
		score.y = gameOver.y + 30;
		gameOver.draw;
	} else {
		
	}
	if (asteroids){
		for (var asteroid in asteroids){
			if (!asteroids[asteroid].destroyed){
				CollisionDetector.rect1 = asteroids[asteroid];
				for (var i in player.lasers){
					laser = player.lasers[i];
					CollisionDetector.rect2 = laser;
					if (CollisionDetector.get_rect_rect_collision){
						if (health.append){
							score.score += 10;
						}
						asteroids[asteroid].destroyed = true;
						player.lasers.splice(i,1);
					}
				}
			}
		}
	}
	if (health.append){
		health.draw;
	}
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    for (var i in asteroids){
    	asteroid = asteroids[i];
    	asteroid.draw;
    	asteroid.y += asteroid.speed * dt;
    	if (asteroid.y > canvas.height){
    		if (health.append && !asteroid.destroyed) {
    			health.append -= 10;
    		}
    		asteroids.splice(asteroid,1);
    	}
    }
    lastTime = now;
    player.dt = dt;
	player.draw;
	player.move;
	createAsteroid(dt);
	window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
