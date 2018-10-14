class Button{
	constructor(ctx,x,y,w,h,button_image_url){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.button_image = new Image();
		this.button_image.src = button_image_url;
		this.screenX;
		this.screenY;
		this.mousePressed;
		this.pressed = false;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.ctx.beginPath();
		this.ctx.drawImage(this.button_image,this.x,this.y,this.w,this.h);
		if (this.screenX && this.screenY && this.mousePressed){
			if (this.x <= this.screenX && this.screenX <= this.x + this.w &&
				this.y <= this.screenY && this.screenY <= this.y + this.h){
				this.pressed = true;
			}
		}
	}
}