class Score{
	constructor(ctx,x,y,w,h,score=0){
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
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
		for (var n in scoreNumbers){
			this.ctx.beginPath();
			this.ctx.drawImage(this.number_images[scoreNumbers[n]],x,this.y,this.w,this.h);
			x += 25;
		}
	}
}