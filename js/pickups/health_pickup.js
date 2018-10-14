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