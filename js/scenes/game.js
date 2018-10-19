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
		this.ctx = document.getElementById("canvas").getContext("2d");
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
		var canvas = document.getElementById("canvas")
		this.player.dt = this.dt;
		this.player.draw;
		this.player.move;
		if (this.replayButton.pressed){
			this.resetValues();
			this.replayButton.pressed = false;
		}
		if (this.health.health){
			this.homeButton.x = canvas.width - this.homeButton.w - 10;
			this.homeButton.y = 30;
			this.homeButton.w = 100;
			this.homeButton.h = 100;
			this.homeButton.draw;
			this.health.draw;
		}
		this.score.draw;
		for (var i in this.pickups){ // type_pickup means [0] for type pickup for [1]
			var type_pickup = this.pickups[i];
			if (this.dt){
				this.pickups[i][1].dt = this.dt;
				this.pickups[i][1].draw;
			}
			CollisionDetector.rect1 = this.player;
			CollisionDetector.rect2 = this.pickups[i][1];
			if (CollisionDetector.get_rect_rect_collision){
				console.log(type_pickup);
				if (type_pickup[0] == "HealthPickup"){
					this.health.health += 1;
				} else if (type_pickup[0] == "powerUp_pickup"){
					this.player.get_level_up;
				}
				delete this.pickups[i];
			}
		}
		if (!this.health.health){
			this.player.destroyed = true;
			this.score.x = this.gameOver.x + (gameOver.w / 2) - 20;
			this.score.y = this.gameOver.y + gameOver.h + 5;
			this.gameOver.draw;
			this.replayButton.x = this.gameOver.x + (this.gameOver.w / 2) - 100;
			this.homeButton.x = this.replayButton.x + this.replayButton.w + 5;
			this.homeButton.y = replayButton.y
			this.homeButton.w = 125;
			this.homeButton.h = 125;
			this.homeButton.draw;
			this.replayButton.draw;
		}
		if (this.asteroids){
			for (var i in this.asteroids){
				var create_asteroids_in_end = []
		    	asteroid.draw;
		    	asteroid.x += this.asteroids[i].x_speed * this.dt;
		    	asteroid.y += this.asteroids[i].y_speed * this.dt;
		    	if (asteroid.y > canvas.height){
		    		if (this.health.health && !asteroid.destroyed) {
		    			this.health.health -= 1;
		    		}
		    		this.asteroids.splice(asteroid,1);
		    	}
		    	if (this.asteroids[i]){
					asteroid = this.asteroids[i].object;
		    	} else {
		    		asteroid = {"destroyed":true};	
		    	}
				if (!asteroid.destroyed){
					CollisionDetector.rect1 = asteroid;
					for (var i in this.player.lasers){
						var laser = this.player.lasers[i];
						CollisionDetector.rect2 = laser;
						if (CollisionDetector.get_rect_rect_collision){
							asteroid.health -= this.player.shoot_damage;
							if (asteroid.health <= 0  && this.health.health){
								this.score.score += 100;
								asteroid.destroyed = true;
							} else {
								var small_asteroid = JSON.parse(JSON.stringify(asteroid));
								small_asteroid.w /= 2;
								small_asteroid.h /= 2;
								small_asteroid.health /= 2;
								small_asteroid.x = asteroid.x + (asteroid.w / 2);
								small_asteroid.y = asteroid.y
								var asteroid_1 = new Asteroid(this.ctx,100,30,30,50,50,"img/meteors/meteorBrown_small1.png")
								this.asteroids[i].object = asteroid_1;
								this.asteroids[i].object.y_speed = -300;
								//create_asteroids_in_end.push({"size":size,"object":asteroid_1,"x_speed":300,"y_speed":300})
							}
							this.player.lasers.splice(i,1);
						}
					}
				}
				for (var i in create_asteroids_in_end){
					if (create_asteroids_in_end[i]){
						this.asteroids.push(create_asteroids_in_end[i]);
						console.log(this.asteroids);
					}
					create_asteroids_in_end = [];
				}
			}
		}
		createAsteroid(this.dt,score.score);
		createHealthPickUp(this.dt);
		createPowerUpPickUp(this.dt);
	}
}