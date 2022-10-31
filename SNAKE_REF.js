

//choose OOP's

let pen;

function inIt(){
	canvas=document.getElementById('mycanvas');
	pen=canvas.getContext('2d');
	W=canvas.width;
	H=canvas.height;

	food=getFoodItem();

	snake={
		intial_len:3,
		direction:"right",
		cells:[],
		color:"aqua",

		createSnake:function(){
			for(var i=this.intial_len-1; i >= 0 ;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=0; i < this.intial_len; i++){
				pen.fillStyle=this.color;
				pen.strokeStyle="black";
				pen.lineWidth=4;
				pen.strokeRect(this.cells[i].x*15,this.cells[i].y*15,15,15);
				pen.fillRect(this.cells[i].x*15,this.cells[i].y*15,15,15);
			}
		},
		updateSnake:function(){
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;

			
			if(headX == food.x && headY == food.y){
				food=getFoodItem();
				this.intial_len+=1;
			}
			else{
				this.cells.pop();
			}

			if(this.direction == "right"){
				nextX=headX+1;
				nextY=headY;	
			}
			else if(this.direction == "left"){
				nextX=headX-1;
				nextY=headY;	
			}
			else if(this.direction == "up"){
				nextX=headX;
				nextY=headY-1;	
			}
			else{
				nextX=headX;
				nextY=headY+1;
			}
			this.cells.unshift({x:nextX,y:nextY});
		}
	};
	snake.createSnake();

	function keypressed(e){
		if(e.key == "ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key == "ArrowRight"){
			snake.direction="right";
		}
		else if(e.key == "ArrowDown"){
			snake.direction="down";
		}
		else if(e.key == "ArrowUp"){
			snake.direction="up";
		}
	}

	
	document.addEventListener('keydown',keypressed);
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	//let us draw food
	pen.fillStyle=food.color;
	pen.fillRect(food.x*15,food.y*15,15,15);
}

function getFoodItem(){
	var foodX=Math.round(Math.random()*(W-15)/15);
	var foodY=Math.round(Math.random()*(H-15)/15);

	food={
		x:foodX,
		y:foodY,
		color:"red"
	}
	return food;
}

function update(){
	snake.updateSnake();
}

function gameLoad(){
	draw();
	update();
}

inIt();
setInterval(gameLoad,100);