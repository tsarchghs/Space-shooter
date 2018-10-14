class Health{
	constructor(ctx,x,y,w,h,health=10){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.health = health;
		this.health_image = new Image();
		this.health_image.src = "img/ui/player/playerLife.png";
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		if (this.health_image.complete){
			var x = this.x;
			for (var i=1;i <= this.health;i++){
				this.ctx.beginPath();
				this.ctx.drawImage(this.health_image,x,this.y,this.w,this.h);	
				x += this.w;
			}
		}
	}
}