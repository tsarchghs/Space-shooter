class CollisionDetection{
	constructor(){
		this.rect1;
		this.rect2;
		this.canvas_height;
	}
	get get_rect_rect_collision(){
		return this.rect_rect_collision();
	}
	rect_rect_collision(){
		if (this.rect1 && this.rect2){
			var rect1_over_rect2_vertical = (this.rect1.y + this.rect1.h < this.rect2.y)
			var rect1_below_rect2_vertical = (this.rect1.y > this.rect2.y + this.rect2.h)
			var rect1_over_rect2_horizontal = (this.rect1.x + this.rect1.w < this.rect2.x)
			var rect1_below_rect2_horizontal = (this.rect1.x > this.rect2.x + this.rect2.w)
			if (!(rect1_over_rect2_vertical || rect1_below_rect2_vertical ||
				   rect1_over_rect2_horizontal || rect1_below_rect2_horizontal)){
				return true;
			} else {
				return false;
			}
		}
	}
	get get_rect_wall_collision(){
		if (this.canvas_height || this.canvas_height == 0){
			return this.rect_wall_collision();
		}
	}
	rect_wall_collision() {
		var wall_collision = {}
		wall_collision.rect_over_canvas = this.rect1.y < 0;
		wall_collision.rect_under_canvas = this.rect1.y + this.rect1.h > this.canvas_height;
		return wall_collision;
	}
}