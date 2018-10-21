
class Menu{
	constructor(canvas,logo,playButton,infoButton,settingsButton){
		this.canvas = canvas;
		this.logo = logo;
		this.playButton = playButton;
		this.infoButton = infoButton;
		this.settingsButton = settingsButton;
		this.show = true;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.logo.x = this.canvas.width/2 - (this.logo.w / 2);
		this.logo.draw;
		this.playButton.x = this.canvas.width/2 - (this.playButton.w / 2) - 250;
		this.playButton.draw;
		this.infoButton.x = this.playButton.x + this.playButton.w + 10;
		this.infoButton.draw;
		this.settingsButton.x = this.infoButton.x + this.infoButton.w + 10;
		this.settingsButton.draw;
	}
}