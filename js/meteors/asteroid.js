class Asteroid{
	constructor(ctx,health,x,y,w,h,speed,dt){
		this.health = health;
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