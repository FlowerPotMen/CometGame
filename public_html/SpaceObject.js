
//SpaceObjects.js where all the space objects live in a happy harmony.
//********************************************************************
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function SpaceObject(img, health, speed, height,width, direction, name, y, x,dx,dy){
>>>>>>> origin/master
	this.image=img;
	this.health=health;
	this.speed=speed;
	this.height=height;
	this.width=width;
	this.direction=direction;
	this.name=name; 		
	this.y=y;
	this.x=x;
	this.pic = document.createElement("IMG");
	this.boom = document.createElement("IMG");
	this.bottom=window.innerHeight;
	this.right=window.innerWidth;
	this.angle = 0;
	this.directionLeft = 0;
	this.directionUp = 0;
	this.bodyPos;
	this.spin=0;
        this.timerId = 0;
        this.radius = this.width/2;
        this.collision=[];
        this.collCount =0;
        this.dx = dx;
        this.dy = dy;
        
        //METHODS
        //*******
        //@@@@@@@
        
    this.move = function(){
      
        
        if (this.x<0){
            this.x = this.right;
        }
        else if(this.x > this.right){
            this.x = 0
        }
        if (this.y<0){
            this.y = this.bottom;
        }
        else if(this.y > this.bottom){
            this.y = 0
        }
        
      	/*if( this.x<0 || this.x>this.maxx){
        	this.dx=-this.dx;
        }
	if( this.y<0 || this.y>this.maxy){
		this.dy=-this.dy;
        }*/
        
        
        this.x+=this.dx;
	this.y+=this.dy;
        
        this.pic.style.left=this.x;
        this.pic.style.top=this.y;
        
        this.rotate(this.spin);
        
        
    }
        
	//moves objects 
	this.move_old=function(){
		
		for(i=0;i<this.directionUp;i++){
			this.moveUp();
                        //checkCollide(this);
                           
		}
		
		for(i=0;i<this.directionLeft;i++){
			this.moveLeft();
                        //checkCollide(this);
                        /*if (checkCollide(this)==1){
                            return;
                        }*/
		}
		
		for(i=0;i>this.directionUp;i--){
			this.moveDown();
                        //checkCollide(this);
                        /*if (checkCollide(this)==1){
                            return;
                        }*/
		}
		for(i=0;i>this.directionLeft;i--){
			this.moveRight();
                        //checkCollide(this);
                        /*if (checkCollide(this)==1){
                            return;
                        }*/
		}
		
		//alert(this.x + ":" + this.y);
		
                this.rotate(this.spin);
                
	}
	
	
	//changes the direction
	this.changeDirection=function(left,up){
		this.dy+=(up/2);
		this.dx+=(left/2);
	}
	//changes the direction of the object sends object in opposite direction 
	this.oppositeDirection=function(){
		this.dx=this.dx-(this.dx*2);
		this.dy=this.dy-(this.dy*2);
	}


	//makes stuff appear on screen 
	this.setup=function(){
		
		
		this.pic.src=this.image;
		this.pic.height=this.height;
		this.pic.width=this.width;
		this.pic.style.position="absolute";
		this.pic.style.top=this.y;
		this.pic.style.left=this.x;
		this.pic.id=this.name;

		//puts the picture on to the object
		document.body.appendChild(this.pic);
		this.bodyPos=document.body.childNodes.length-1;
		
		var me = this;
		
		
		
		timerId = setInterval(function(){
			me.move(); 
		},this.speed);

		
	}
	

	//rotates the rocket
	this.rotate = function(degrees){
		this.angle = this.angle + degrees;
		
		if (this.angle > 350){
			this.angle = this.angle - 360;
		}
		
		if (this.angle < 0) {
			this.angle = this.angle + 360;
		}
		
		
		
		if(navigator.userAgent.match("Chrome")){
			this.pic.style.WebkitTransform = "rotate("+this.angle+"deg)";
		} else if(navigator.userAgent.match("Firefox")){
			this.pic.style.MozTransform = "rotate("+this.angle+"deg)";
		} else if(navigator.userAgent.match("MSIE")){
			this.pic.style.msTransform = "rotate("+this.angle+"deg)";
		} else if(navigator.userAgent.match("Opera")){
			this.pic.style.OTransform = "rotate("+this.angle+"deg)";
		} else {
			this.pic.style.transform = "rotate("+this.angle+"deg)";
		}
		
		
		//document.getElementById("status").innerHTML = "rotate("+degrees+"deg)";
	}


	//Calculates the trajectory for the rocket	
	this.accelerate = function(forward){
		var quadrant = 1;
		var a = 5;
		var b = 5;
		
		var traj = this.angle;
		
		while (traj > 80){
			quadrant++;
			traj = traj - 90;
		}

		if (traj > 45){
			while (traj > 45){
				b-=1;
				traj-=10;
			}
		}
		else{
			while (traj < 45){
				a-=1;
				traj+=10;
			}
		}
		
		if(forward==0){
			a=a-(a*2);
			b=b-(b*2);
		}

		if (quadrant == 1){
			this.changeDirection(0-a,b);
		}
		else if (quadrant == 2){
			this.changeDirection(0-b,0-a);
		}
		else if (quadrant == 3){
			this.changeDirection(a,0-b);
		}
		else if (quadrant == 4){
			this.changeDirection(b,a);
		}
		
		
	}
	
	//moves left 
	this.moveLeft=function(){
		this.x=this.x-1;
		if (this.x < 0){
			this.x = this.right;
		}
		this.pic.style.left=this.x;

	}
	//moves right
	this.moveRight=function(){
		this.x=this.x+1;
		if (this.x > this.right){
			this.x=0;
		}
		this.pic.style.left=this.x;
		
	}
	//moves up
	this.moveUp=function(){
		
		
		
		this.y=this.y-1;
		if(this.y<=0){
				this.y=this.bottom;
		}
		
		this.pic.style.top=this.y;
		
		
	}
	
	//moves down
	this.moveDown=function(){
		this.y=this.y+1;
		if(this.y>=this.bottom){
			this.y=0;
		}
		this.pic.style.top=this.y;
	}
	
	//makes a random number
	this.randomNumber=function(max){
		return Math.floor((Math.random() * max) + 1);
		
	}
	

	//things that get called for the reset function
	this.reset=function(){
			this.image=img;
	this.health=health;
	this.speed=speed;
	this.height=height;
	this.width=width;
	this.direction=direction;
	this.name=name; 		
	this.y=y;
	this.x=x;
	this.pic = document.createElement("IMG");
	this.bottom=window.innerHeight;
	this.right=window.innerWidth;
	this.angle = 0;
	this.directionLeft = 0;
	this.directionUp = 0;
	}
	
	//Boom on screen and life/gameover 
	this.die=function(){
		
                clearInterval(this.timerId);
		//removes space object icon

				rosetta.die();

                    
		for (i=0;i<document.body.childNodes.length;i++){
			if (document.body.childNodes[i].id == this.name){
					document.body.removeChild(document.body.childNodes[i]);
					break;
                                        
                                              
                            
                            
			}
		}

	}
        
        
        
        //swaps rocket image when thrusting 
	this.swapImg=function(newImg){
          this.pic.src=newImg;
          this.pic.height=120;
          this.pic.width=50;
          me=this;
          setTimeout(function(){
              me.pic.src=me.image;
              me.pic.height=100;
              me.pic.width=50;
          },(500));
            
            
            
            
        }
}


//stuff that explain whta the lander has 
function Lander(img, health, speed, height,width, direction, name, y, x,dx,dy){

	SpaceObject.call(this,img, health, speed, height,width, direction, name, y, x,dx,dy);

}

//stuff that explain whta the comets have
function comet(img, health, speed, height,width, direction, name, y, x,dx,dy){	
	SpaceObject.call(this,img, health, speed, height, width, direction, name, y, x,dx,dy);
	
	

	this.setup=function(){
		
		
		
		//makes the comets spawn in a random location 
		var startPos=this.randomNumber(2);
		if(startPos==1){
			this.y=window.innerHeight;
			this.x=this.randomNumber(window.innerWidth);
		}
		else{
			this.x=window.innerWidth;
			this.y=this.randomNumber(window.innerHeight);
		}
	
		
		this.height=this.randomNumber(190)+10;
		this.width=this.height;
                this.spin=this.randomNumber(10);
	
		
		//makes the comets spawn in a random direction
		this.angle=this.randomNumber(360);
		this.accelerate(1);
		this.accelerate(1);
		
		this.pic.src=this.image;
		this.pic.height=this.height;
		this.pic.width=this.width;
		this.pic.style.position="absolute";
		this.pic.style.top=this.y;
		this.pic.style.left=this.x;
		this.pic.id=this.name;
                this.setBorder(2,"#FF0000")

		

		//makes the start position random
		document.body.appendChild(this.pic);	
		
		var me = this;
		
		
		
		this.timerId = setInterval(function(){
			me.move(); 
                    
		},this.speed);
		
	}
        
        this.setBorder=function(width,color){
            
            this.pic.style.border=width + "px solid " + color;
        }
		
		
	

}	
	 
