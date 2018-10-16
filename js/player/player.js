class Player_SpaceShip{
	constructor(ctx,x,y,w,h,speed,
				shoot_damage=100,
				lv=1,
				player_image_url="img/player/playerShip_lv1.png",
				laser_image_url="img/player/lasers/laserRed.png"){
		this.lv = lv;
		this.shoot_damage = shoot_damage;
		this.destroyed = false;
		this.ctx = ctx;
		this.player_image = new Image();
		this.player_image.src = player_image_url;
		this.laser_image = new Image();
		this.laser_image.src = laser_image_url;
		this.shoot_audio = new Audio("audio/lasers/sfx_laser2.ogg");
		this.explosion_images = [];
		this.explosion_audio = new Audio("audio/player/explosion.mp3");
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.dt;
		this.lasers = []
		this.setExplosionVar();
		this.canvas = document.getElementById("canvas");
		this.collision_detection = new CollisionDetection();
		this.collision_detection.canvas_height = this.canvas.height;
	}
	get draw(){
		this.reDraw();
	}
	reDraw(){
		this.collision_detection.rect1 = this;
		if (!this.destroyed) {
			this.ctx.beginPath();
			this.ctx.drawImage(this.player_image,this.x,this.y,this.w,this.h);
			for (var i in this.lasers){
				var laser = this.lasers[i];	
				if (this.lasers[i].y < 0){
					this.lasers.splice(i,1);
				}
				if (this.lasers[i]){
					this.ctx.drawImage(this.laser_image,laser.x,laser.y,laser.w,laser.h);
					this.lasers[i].x -= laser.x_speed * this.dt;
					this.lasers[i].y -= laser.y_speed * this.dt;
				}
			}
		} else {
			if (this.explosion_images[0]){
				this.explosion_audio.play();
				this.ctx.beginPath();
				this.ctx.drawImage(this.explosion_images[0],this.x,this.y,this.w,this.h);
				this.explosion_images.splice(0,1);
			} else if (this.explosion_audio.currentTime > 0 && !this.explosion_audio.paused) {
				this.explosion_audio.currentTime = 0;
				this.explosion_audio.pause();
			}
		}
	}
	get move(){
		this.move_player();
	}
	move_player(){
		if (!this.destroyed){
			var wall_collision = this.collision_detection.get_rect_wall_collision;
			if ((keyState["ArrowUp"] || keyState["w"]) && !wall_collision.rect_over_canvas){
				this.y -= this.speed * this.dt;
			}
			if (keyState["ArrowLeft"] || keyState["a"]){
				this.x -= this.speed * this.dt;
			}
			if ((keyState["ArrowDown"] || keyState["s"]) && !wall_collision.rect_under_canvas){
				this.y += this.speed * this.dt;
			}
			if (keyState["ArrowRight"] || keyState["d"]){
				this.x += this.speed * this.dt;
			}
			if (keyState[" "]) {
				this.shoot();
			}
		}
	}
	get resetExplosion(){
		this.setExplosionVar();
	}
	setExplosionVar(){
		for (var x=1;x<=27;x++){
			var explosion_img = new Image();
			explosion_img.src = `img/explosions/explosion_${String(x)}.png`;
			this.explosion_images.push(explosion_img
			);
		}
	}
	shoot(){
		if (this.lv == 1){
			this.shoot_audio.currentTime = 0;
			var middle = this.x + this.w - (this.w / 2) - 5;
			this.lasers.push({"x":middle,"y":this.y - 25,"w":10,"h":30,"x_speed":0,"y_speed":1000});
			this.shoot_audio.play();
		} else if (this.lv == 2){
			this.shoot_audio.currentTime = 0;
			var middle = this.x + this.w - (this.w / 2) - 5;
			this.lasers.push({"x":middle,"y":this.y - 25,"w":12.5,"h":30,"x_speed":0,"y_speed":1000});
			this.shoot_audio.play();
		} else if (this.lv == 3){
			this.shoot_audio.currentTime = 0;
			var middle = this.x + this.w - (this.w / 2) - 5;
			var left = {"x":this.x - (this.h / 2),"y":this.y + this.h}
			var right = {"x":this.x + this.w - (this.h / 2),"y":this.y + this.h}
			this.lasers.push({"x":middle,"y":this.y - 25,"w":12.5,"h":30,"x_speed":0,"y_speed":1000});
			this.lasers.push({"x":left.x,"y":left.y,"w":30,"h":12.5,"x_speed":-2000,"y_speed":0});
			this.lasers.push({"x":right.x,"y":right.y,"w":30,"h":12.5,"x_speed":2000,"y_speed":0});
			this.shoot_audio.play();
		}
	}
	get get_level_up(){
		this.level_up();
	}
	level_up(){
		if (this.lv < 3){
			this.lv += 1;
			this.player_image.src = `img/player/playerShip_lv${this.lv}.png`;
			this.shoot_damage += 100
			this.w += 10;
			this.h += 10;
		}
	}
}