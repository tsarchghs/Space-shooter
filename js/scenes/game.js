class Game{
	constructor(player,health,score,pickups,asteroids,gameOver,replayButton,homeButton){
		this.player = player;
		this.health = health;
		this.score = score;
		this.pickups = pickups;
		this.asteroids = asteroids
		this.gameOver = gameOver;
		this.replayButton = replayButton;
		this.homeButton = homeButton;
		this.dt = 0;
		this.show = false;
	}
	get draw(){
		this.reDraw();
	}
	get reset(){
		this.resetValues();
	}
	resetValues(){
		this.player.x = canvas.width/2 - 50;
		this.player.y = canvas.height - 100;
		this.player.destroyed = false;
		this.player.resetExplosion;
		this.score.score = 0;
		this.health.health = 10;
		this.score.y = 10;
	}
	reDraw(){
		this.player.dt = this.dt;
		this.player.draw;
		this.player.move;
		if (this.replayButton.pressed){
			this.resetValues();
			this.replayButton.pressed = false;
		}
		this.health.draw;
		this.score.draw;
		for (var type_pickup in this.pickups){ // type_pickup means [0] for type pickup for [1]
			if (this.dt){
				this.pickups[type_pickup][1].dt = this.dt;
				this.pickups[type_pickup][1].draw;
			}
			CollisionDetector.rect1 = this.player;
			CollisionDetector.rect2 = this.pickups[type_pickup][1];
			if (CollisionDetector.get_rect_rect_collision){
				if (type_pickup[0] == "HealthPickup"){
					this.health.health += 1;
				}
				delete this.pickups[type_pickup];
			}
		}
		if (!this.health.health){
			this.player.destroyed = true;
			this.score.x = this.gameOver.x + (gameOver.w / 2) - 20;
			this.score.y = this.gameOver.y + gameOver.h + 5;
			this.gameOver.draw;
			this.replayButton.x = this.gameOver.x + (this.gameOver.w / 2) - 100;
			this.homeButton.x = this.replayButton.x + this.replayButton.w + 5;
			this.homeButton.draw;
			this.replayButton.draw;
		}
		if (this.asteroids){
			for (var asteroid in this.asteroids){
				if (!this.asteroids[asteroid].destroyed){
					CollisionDetector.rect1 = this.asteroids[asteroid];
					for (var i in this.player.lasers){
						var laser = this.player.lasers[i];
						CollisionDetector.rect2 = laser;
						if (CollisionDetector.get_rect_rect_collision){
							this.asteroids[asteroid].health -= this.player.shoot_damage;
							if (!this.asteroids[asteroid].health  && this.health.health){
								this.score.score += 100;
							}
							this.player.lasers.splice(i,1);
						}
					}
				}
			}
		}
	    for (var i in this.asteroids){
	    	asteroid = this.asteroids[i];
	    	asteroid.draw;
	    	asteroid.y += asteroid.speed * this.dt;
	    	if (asteroid.y > canvas.height){
	    		if (this.health.health && !asteroid.destroyed) {
	    			this.health.health -= 1;
	    		}
	    		this.asteroids.splice(asteroid,1);
	    	}
	    }
		createAsteroid(this.dt);
		createHealthPickUp(this.dt);
	}
}