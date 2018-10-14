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