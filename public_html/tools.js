var timerId;
var counter=0;
// creates a random Number
function randomNumber(max) {
	
			return Math.floor((Math.random() * max) + 1);
} 
//chekes for a crash 
function checkCrash(){

    //has lander crashed 
    for (i=0;i<commets.length;i++){
            if (checkOverlap(rosetta, commets[i])==1){
                    // stopes me from dieing or what im calling and reset 
                    if (debug!=1){

                            // score board lose life comets go
                            clearInterval(timerId);
                            scoreBoard.loseLife();
                            
                                   rosetta.die();
                            soundBank.play("boom");
                            delete rosetta;
                                    
                                    rosetta.die();
                            soundBank.play("boom");
                            delete rosetta;
                            
                            }
                            
                            //if rosetta dies deleat her 
                           /* rosetta.die();
                            soundBank.play("boom");
                            delete rosetta;*/
                            
                            // if the score is 0 bring up endscreen 
                            if (scoreBoard.lives == 0){

                                soundBank.play("sadNoise");
                            
                                endScreen=new ScoreBoard(0,"white",700,100,scoreBoard.score,0,"","Game Over",72);
                                endScreen.setup();
                                return;
                            }
                            // if lives arnt 0 reset witch resets every thing but the score
                            else{
                                setTimeout(function(){reset()},3000);
                                    //scoreBoard.addScore(-10);
                            }



                    }

            }
    }
    //have comets collided
    for (q=0;q<commets.length;q++){
            for (j=q+1;j<commets.length;j++){
                    if (checkOverlap(commets[q],commets[j])==1){

                            /*commets[q].oppositeDirection();
                            commets[j].oppositeDirection();
                            //alert ("friendly fire");*/
                            bounce(commets[q], commets[j]);
                    }
            }
    }
}
//chekes if two objects are over lapping 
/*function checkOverlap(objectA, objectB){
	
			
				var A=objectA[0];
				var B=objectA[1];
				var C=A+objectA[2];
				var D=B+objectA[3];
				
				var W=objectB[0];
				var X=objectB[1];
				var Y=W+objectB[2];
				var Z=X+objectB[3];
				
					
				
				if 
					(
						(
							(W>=A && W<=C) ||
							(Y>=A && Y<=C)
						) &&
						(
							(X>=B && X<=D) ||
							(Z>=B && Z<=D)
						)
				 	)
				{
						return 1;
					
				}
				return 0;
				
	
				/*is top left corner of objectB	 inside area of objectA
				if (objectA[0]<=objectB[0] && (objectA[0]+objectA[2]) >=objectB[0]){
					
					if (objectA[1]<=objectB[1] && (objectA[1]+objectA[3]) >=objectB[1]){
	
					}
					
				}
				
				//is top right corner of objectB	 inside area of objectA
				if (objectA[2]<=objectB[2] && (objectA[2]+objectA[0]) >=objectB[2]){
						alert ("you got a hit")
				}		
						
					
					
	
}*/


/*function checkOverlap(obj1, obj2){
    var a1=obj1.x;
    var b1=obj1.y;
    var c1=obj2.width/2;
    
    var a2=obj2.x;
    var b2=obj2.y;
    var c2=obj2.width/2;
    
    var radius=c1+c2;
    
    if (Math.abs(a1-a2) < radius && Math.abs(b1-b2) < radius && (obj1.collision==0 || obj2.collision==0) ){
        obj1.collision=1;
        obj2.collision=1;
        return 1;
       
        
        
        
    }
   else {
       obj1.collision=0;
       obj2.collision=0;
       
   }
    
    
    
    
    
};*/

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
                                setTimeout(reset,7000);
								
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
    
    //obj1.stop();
    //obj2.stop();
    
    var m1 = parseInt(obj1.width * obj1.height);
    var m2 = parseInt(obj2.width * obj2.height);
    
    var dx = (obj1.x + (obj1.width/2)) - (obj2.x + (obj2.width/2));
    var dy = (obj1.y + (obj1.height/2)) - (obj2.y + (obj2.height/2));
    
    var ca = Math.atan2(dy,dx);
    
    var mag1 = Math.sqrt((obj1.directionLeft*obj1.directionLeft)+
                          (obj1.directionUp * obj1.directionUp));
                  
    var mag2 = Math.sqrt((obj2.directionLeft*obj2.directionLeft)+
                        (obj2.directionUp * obj2.directionUp));
    
    var d1 = Math.atan2(obj1.directionUp,obj1.directionLeft);
    var d2 = Math.atan2(obj2.directionUp,obj2.directionLeft);
    
    var newx1 = mag1 * Math.cos(d1 - ca);
    var newy1 = mag1 * Math.sin(d1 - ca);
    var newx2 = mag2 * Math.cos(d2 - ca);
    var newy2 = mag2 * Math.sin(d2 - ca);
    
    var finalx1 = ((m1-m2)*newx1+(m2+m2)*newx2)/(m1+m2);
    var finalx2 = ((m1+m1)*newx1+(m2-m1)*newx2)/(m1+m2);
    var finaly1 = newy1;
    var finaly2 = newy2;
    
    obj1.directionLeft = Math.cos(ca)*finalx1+Math.cos(ca+Math.PI/2)*finaly1;
    obj1.directionUp   = Math.sin(ca)*finalx1+Math.sin(ca+Math.PI/2)*finaly1;
    obj2.directionLeft = Math.cos(ca)*finalx2+Math.cos(ca+Math.PI/2)*finaly2;
    obj2.directionUp   = Math.sin(ca)*finalx2+Math.sin(ca+Math.PI/2)*finaly2;
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


    