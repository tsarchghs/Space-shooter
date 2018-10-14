class CollisionDetection{
	constructor(){
		this.rect1;
		this.rect2;
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
}