class PowerUp_pickup{
	constructor(ctx,x,y,w,h,pickup_imageUrl,lv,drop_speed=400){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.healthPickUp_image = new Image();
		this.healthPickUp_image.src = pickup_imageUrl;
		this.drop_speed = drop_speed;
		this.lv = lv;
		this.dt;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.ctx.beginPath();
		this.ctx.drawImage(this.healthPickUp_image,this.x,this.y,this.w,this.h);
		this.y += this.dt * this.drop_speed;
	}
}
var powerUp_pickups_at_once = 2;
var powerUp_pickups_thrown = 10;
var powerUp_pickups_thrown_reset = 10;

function createPowerUpPickUp(dt){
	if (dt){
		if (powerUp_pickups_at_once > powerUp_pickups_thrown){
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) + 1) * -1;
			powerUp_pickup = new PowerUp_pickup(ctx,x,y,30,30,"img/pickUps/powerUpLv2.png",2);
			pickups.push(["powerUp_pickup",powerUp_pickup]);
			powerUp_pickups_thrown = powerUp_pickups_thrown_reset;
		}
		powerUp_pickups_thrown -= powerUp_pickups_at_once * dt;
	}
}