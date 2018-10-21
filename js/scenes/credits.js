

class Credits{
	constructor(canvas,ctx,logo,homeButton){
		this.canvas = canvas;
		this.logo = logo;
		this.show = false;
		this.programmerCredit = new ImageClass(ctx,100,300,700,100,"img/ui/credits/programmer.png");
		this.gameArtCredit = new ImageClass(ctx,100,380,700,100,"img/ui/credits/gameart.png");
		this.leftArrowButton = new Button(ctx,600,500,150,100,"img/ui/buttons/leftArrowButton.png");
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.logo.x = this.canvas.width/2 - (this.logo.w / 2);
		this.logo.draw;
		this.gameArtCredit.draw;
		this.programmerCredit.draw;
		this.leftArrowButton.draw;
	}
}