class Text{
	constructor(ctx,text,font,fillStyle,textAlign,x,y){
		this.ctx = ctx;
		this.text = text;
		this.font = font;
		this.fillStyle = fillStyle;
		this.textAlign = textAlign;
		this.x = x;
		this.y = y;
		this.append; // Making it easier to change score and health values
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		var text = this.text;
		this.ctx.font = this.font;
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.textAlign = this.textAlign;
		if (this.append || this.append == 0){
			text += this.append;	
		}
		this.ctx.fillText(text,this.x,this.y);
	}
}