class HealthPickup{
	constructor(ctx,x,y,w,h,pickup_imageUrl,drop_speed=400,healh=1){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.healthPickUp_image = new Image();
		this.healthPickUp_image.src = pickup_imageUrl;
		this.drop_speed = drop_speed;
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
var health_pickups_at_once = 1;
var health_pickups_thrown = 10;
var health_pickups_thrown_reset = 10;

function createHealthPickUp(dt){
	if (dt){
		if (health_pickups_at_once > health_pickups_thrown){
			x = Math.floor((Math.random() * canvas.width) + 1);
			y = Math.floor((Math.random() * 60) + 1) * -1;
			health_pickUp = new HealthPickup(ctx,x,y,30,30,"img/ui/player/playerLife.png");
			pickups.push(["HealthPickup",health_pickUp]);
			health_pickups_thrown = health_pickups_thrown_reset;
		}
		health_pickups_thrown -= health_pickups_at_once * dt;
	}
}