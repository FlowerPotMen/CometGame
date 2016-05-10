var timerId;
var counter=0;
// creates a random Number
function randomNumber(max) {
	
			return Math.floor((Math.random() * max) + 1);
} 



function checkOverlap(obj1,obj2){
    var distanceX=Math.abs(obj1.x-obj2.x);
    var distanceY=Math.abs(obj1.y-obj2.y);
    
    var distance=Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    var radius=(obj1.width/2)+(obj2.height/2);
    
    if (distance<=radius && (obj1.collision==0 || obj2.collision==0) ){
        obj1.collision=1;
        obj2.collision=1;
                        

        return 1;
       
        
        
    }
   else if(distance>radius) {
       obj1.collision=0;
       obj2.collision=0;
       
   }
}
//creates comets  
function createCommets(count){
		
			var c=[];
			
			for (i = 0; i <count;i++){
				c.push(new comet("rosetta-comet2.gif",5,randomNumber(50)+5,100,100,"left","Comet"+i,100, 300));
				
			
			}
				
			return c;
}			

function reset(){
				// creates rosetta 
				rosetta=new Lander("rocket.gif",5,7,100,50,"left","Rosetta", 300, 300);
				// creats comets 
				commets=createCommets(cometsNumber);

				rosetta.setup();
				//creates the comets until they have comets lenght				
				for (i = 0; i < commets.length; i++) { 
				

					commets[i].setup();
				}
				timerId = setInterval(function(){					 
				
                                    counter++;
				
                                    if (counter==3){
					scoreBoard.addScore(1);
					counter=0;
                                    }
				
				//scoreBoard.addScore(1); 
					

					
					//check crashes
					//checkCollide();					
					
				},50);
	
	
}
//sets every thing up at start
function run(){
		
    scoreBoard.setup();
                                
    soundBank.play("countDown");
    if (soundBank.on==1){
         setTimeout(reset,7000);    
    }
    else {
        reset();
    }
                                    
                                
								
}
// binds keys to there movement and moves them
function movement(){
				var key = window.event;
				//alert(key.keyCode); 
				 
			
				//A
				if(key.keyCode==97){
					rosetta.rotate(-10);
					return;
				}
				//W
				else if(key.keyCode==119){
					rosetta.accelerate(1);
					scoreBoard.addScore(10);
                                        rosetta.swapImg("RocketThrust.png");
					soundBank.play("thruster");
                                        
				}	
				//D
				else if (key.keyCode==100){
					rosetta.rotate(10);
				}
				//S
				else if(key.keyCode==115){
					rosetta.accelerate(0);
					scoreBoard.addScore(1);
				}
                                //m= 109
                                
                               
                                else if (key.keyCode==109){
                                   
                                    soundBank.mute();
                                   
                                }
                                
				 
}

//creates a score board with life and score 
function scoreBoard(){
	var sB=document.getElementById("scoreBoard");
	
	for (i=1;i<(lives+1);i++){
		
		
		
	}
	
	
	//seting up rocket image
	var pic = document.createElement("IMG");
	pic.height=45;
	pic.src="rocket.png";
	sB.appendChild(pic);
	
}

 function bounce(obj1,obj2){
        
            newVelX1 = (obj1.directionLeft * (obj1.radius - obj2.radius) + (2 * obj2.radius * obj2.directionLeft)) / (obj1.radius + obj2.radius);
            newVelY1 = (obj1.directionUp * (obj1.radius - obj2.radius) + (2 * obj2.radius * obj2.directionUp)) / (obj1.radius + obj2.radius);
            newVelX2 = (obj2.directionLeft * (obj2.radius - obj1.radius) + (2 * obj1.radius * obj1.directionLeft)) / (obj1.radius + obj2.radius);
            newVelY2 = (obj2.directionUp * (obj2.radius - obj1.radius) + (2 * obj1.radius * obj1.directionUp)) / (obj1.radius + obj2.radius);
            //obj1.clearLast();
            //obj2.clearLast();         
            obj1.x = obj1.x + newVelX1;
            obj1.y = obj1.y + newVelY1;
            obj2.x = obj2.x + newVelX2;
            obj2.y = obj2.y + newVelY2;
            

            
            obj1.directionLeft = newVelX1;
            obj1.directionUp = newVelY1;
            //obj1.init();
            obj2.directionLeft = newVelX2;
            obj2.directionUp = newVelY2;
            
            
            //obj1.radius++;
            //obj2.radius--;
            
            //if (obj2.radius == 1){
            //    Balls.delete(obj2.name);
            //}
            
        
    }



function checkCollide(from){
    
    var objects = commets.slice(0);
    objects.unshift(rosetta);
    
    for (var i=0;i<objects.length-1;i++){
        
        for (var j=i+1;j<objects.length-1;j++)
        
        //if (objects[i].name != from.name){
            if (checkOverlap(objects[i],objects[j]) ==1){
                
                
                
                //is it rosetta?
                
                if (i == 0){
                    
                    
                }
                
                else{
               
                    
                        
                        bounce(objects[i],objects[j]);
                        return 1;
                    

                }
                
                    
            }

        //}
    }
        
}


    