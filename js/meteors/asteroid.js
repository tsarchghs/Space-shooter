class Asteroid{
	constructor(ctx,health,x,y,w,h,asteroid_image_url){
		this.health = health;
		this.destroyed = false;
		this.ctx = ctx;
		this.image = new Image();
		this.image.src = asteroid_image_url;
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
		this.dt;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		if (!this.health){
			this.destroyed = true;
		}
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

var asteroids_at_once = 2
var asteroids_thrown = 0
//meteorBrown_big1
function createAsteroid(dt,score){
	if (dt){
		if (asteroids_thrown < 0){
			asteroids_thrown = 2;
		}
		if (asteroids_at_once > asteroids_thrown){
			random = Math.floor((Math.random() * 15));
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) * -1);
			if (random > 3){
				size = "small";
				var asteroid = new Asteroid(ctx,100,undefined,undefined,50,50,"img/meteors/meteorBrown_small1.png");
			} else {
				size = "big";
				var asteroid = new Asteroid(ctx,200,undefined,undefined,100,100,"img/meteors/meteorBrown_big1.png");
			}
			asteroid.x  = x;
			asteroid.y = y;
			if (size === "small"){
				asteroid.speed = 150 + (score * 0.01);
			} else {
				asteroid.speed = 150 + (score * 0.001);
			}
			asteroids.push({"size":size,"object":asteroid,"x_speed":0,"y_speed":asteroid.speed});
			asteroids_thrown++;
		}
		asteroids_thrown -= asteroids_at_once * dt;
	}
}