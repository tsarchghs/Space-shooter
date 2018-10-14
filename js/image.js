class ImageClass{
	constructor(ctx,x,y,w,h,image_url){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.image = new Image();
		this.image.src = image_url;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.ctx.beginPath();
		this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
	}
}