class Game{
	constructor(player,health,score,pickups,asteroids,gameOver){
		this.player = player;
		this.health = health;
		this.score = score;
		this.pickups = pickups;
		this.asteroids = asteroids
		this.gameOver = gameOver;
		this.dt = 0;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
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
			this.gameOver.x = canvas.width/2
			this.gameOver.y = canvas.height/2
			this.score.x = gameOver.x - 50;
			this.score.y = gameOver.y + 30;
			this.gameOver.draw;
		} else {
			
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
		if (this.health.health){
			this.health.draw;
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
	    this.player.dt = this.dt;
		this.player.draw;
		this.player.move;
		createAsteroid(this.dt);
		createHealthPickUp(this.dt);
	}
}