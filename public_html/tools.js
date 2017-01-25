//Tolls.js full of fun and excing functions to enter tain you and your friends.
//*****************************************************************************
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


var timerId;
var counter=0;
var endScreen;
var creatcommets;


// creates a random Number
function randomNumber(max) {
	
    return Math.floor((Math.random() * max) + 1);
} 





//creates comets  
function createCommets(count){
		
			var c=[];
			
			for (i = 0; i <count;i++){
				c.push(new comet("rosetta-comet2.gif",5,randomNumber(50)+5,100,100,"left","Comet"+i,100, 300,randomNumber(25)-15,randomNumber(25)-15));
				
			
			}
				
			return c;

}			

function reset(){
    
    //sets background colour
    if(scoreBoard.lives==3){
        document.getElementById("bdyTag").className = "threeLives";
    }
    else if (scoreBoard.lives==2){
        document.getElementById("bdyTag").className = "twoLives";
    }
    else if(scoreBoard.lives==1){
        document.getElementById("bdyTag").className = "oneLife";
    }
    else{
        
    }
    
         
    
    //kills rosetta
    if (rosetta){
        rosetta.die();
    }
    // creates rosetta 
    rosetta=new Lander("rocket.gif",5,7,100,50,"left","Rosetta", 300, 300,0,0,"invincibleGlow.gif");
    // creats comets 
    commets=createCommets(cometsNumber);

    rosetta.setup();
    //creates the comets until they have comets lenght				
    for (i = 0; i < commets.length; i++) { 

        commets[i].setup();
    }
     scoreId = setInterval(function(){					 

            scoreBoard.addScore(1)					
					
	},500);     
        
        
         
   
	
}

//sets every thing up at start
function run(){
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  

    
     
    setTimeout(function(){
        createCommets;
                          
       
    }, 7000)
    
    if (endScreen){
        endScreen.die();     
    }
   
    scoreBoard.die();
    scoreBoard.reset();
    scoreBoard.setup();
    
        
    soundBank.play("countDown");
    if (soundBank.on==1){
         setTimeout(reset,7000);
    }
    
                                
								
}
// binds keys to there movement and moves them
function movement(){
    
       if (rosetta.dead==0){
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
                rosetta.swapImg("RocketThrust.png",500);
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
        //Space=32
        
        else if (key.keyCode==32){
            if (plasmaBalls.length < 1){
             p1=new PlasmaBall("plasmaBall.png",5,7,20,34,"left","plasmaBall", rosetta.y,rosetta.x,0,0);    
             p1.setup(rosetta.angle);    
             plasmaBalls.push(p1);
            }
         
        }
        
        
        //m= 109
        else if (key.keyCode==109){

            soundBank.mute();
                        

        }
         else if (key.keyCode==173){
           debug=1;
       }    
        
      
       
            
            
            
            
            
            
        else {
            console.log("unassigned key pressed:" + key.keyCode);
        }
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
        
            newVelX1 = (obj1.dx * (obj1.radius - obj2.radius) + (2 * obj2.radius * obj2.dx)) / (obj1.radius + obj2.radius);
            newVelY1 = (obj1.dy * (obj1.radius - obj2.radius) + (2 * obj2.radius * obj2.dy)) / (obj1.radius + obj2.radius);
            newVelX2 = (obj2.dx * (obj2.radius - obj1.radius) + (2 * obj1.radius * obj1.dx)) / (obj1.radius + obj2.radius);
            newVelY2 = (obj2.dy * (obj2.radius - obj1.radius) + (2 * obj1.radius * obj1.dy)) / (obj1.radius + obj2.radius);
            //obj1.clearLast();
            //obj2.clearLast();         
            obj1.x = obj1.x + newVelX1;
            obj1.y = obj1.y + newVelY1;
            obj2.x = obj2.x + newVelX2;
            obj2.y = obj2.y + newVelY2;
            

            
            obj1.dx = newVelX1;
            obj1.dy = newVelY1;
            //obj1.init();
            obj2.dx = newVelX2;
            obj2.dy = newVelY2;
            
            

            
        
    }
    
    
function collided(){
    if(debug==1){
        return;
    }
    clearInterval(scoreId);
    
    scoreBoard.loseLife();
    killAll();
    
 
    
    
    

    if (scoreBoard.lives==0){
        gameOver();
        return 1;
                                 
    }
   
    rosetta.die();
    delete rosetta;
    setTimeout(function(){
        reset();}
    ,2000);
    return 1;
    
}
    
    
function checkCollide(){
    var objects = commets.slice(0);
    objects.unshift(rosetta);
    objects=objects.concat(plasmaBalls);
    
        for (var i=0;i<objects.length;i++){
        
            for (var j=1;j<objects.length;j++){
    
                if (j != i){
                    
                    var firstComet = objects[i];
                    var secondComet = objects[j];
                    
                    if (Math.abs ((secondComet.x + (secondComet.width/2)) - (firstComet.x + (firstComet.width/2)) ) < (secondComet.width/2 + firstComet.width/2) &&
                        Math.abs ((secondComet.y + (secondComet.height/2)) - (firstComet.y + (firstComet.height/2)) ) < (secondComet.height/2 + firstComet.height/2) &&
                            (firstComet.collision[secondComet.name]!=1 || secondComet.collision[firstComet.name]!=1)     ){
                                
                        if ((firstComet.type=="Lander" || secondComet.type=="Lander") && 
                                (firstComet.type=="comet" || secondComet.type=="comet")){
                            if (firstComet.invincible==0){
                                return 1;
                            }
                        }
                        else if ((firstComet.type=="PlasmaBall" || secondComet.type=="PlasmaBall") && 
                                (firstComet.type=="comet" || secondComet.type=="comet")){
                                redirectComet(firstComet,secondComet);
                        }
                         else if (firstComet.type=="comet" && secondComet.type=="comet"){
                             firstComet.setBorder(2,"#00FF00")
                              secondComet.setBorder(2,"#00FF00")

                            firstComet.collision[secondComet.name]=1;
                            secondComet.collision[firstComet.name]=1;
                            firstComet.collCount++;
                            secondComet.collCount++;

                            bounce(firstComet,secondComet);
                        } 
                            
                        //if rosetta collids then return 1
        
                        
                            

                       

                    }
                    
                    else if (Math.abs ((secondComet.x + (secondComet.width/2)) - (firstComet.x + (firstComet.width/2)) ) > (secondComet.width/2 + firstComet.width/2) ||
                        Math.abs ((secondComet.y + (secondComet.height/2)) - (firstComet.y + (firstComet.height/2)) ) > (secondComet.height/2 + firstComet.height/2)){
                        
                        if (firstComet.collision[secondComet.name] == 1 &&
                            secondComet.collision[firstComet.name] == 1   ){
                            delete firstComet.collision[secondComet.name];
                            delete secondComet.collision[firstComet.name];
                            firstComet.collCount--;
                            secondComet.collCount--;                          

                        }
                        if (firstComet.collCount == 0){
                            firstComet.setBorder(2,"#FF0000")
                        }
                        if (secondComet.collCount ==0){
                            secondComet.setBorder(2,"#FF0000")
                        }
                        
                    }
                }
    
    
            }
        }
         

     
     }
     
function killAll(){  
    for (var i=0;i<cometsNumber;i++){
            commets[i].die();
            delete commets[i];

    }

                    
}

function gameOver(){

    //end screen 
    endScreen=new ScoreBoard(10,"orange",300,100,scoreBoard.score,0,"", "GAME OVER", 100,1,"endScreen",1);
    scoreBoard.die();
    delete scoreBoard;
    endScreen.setup();
    endScreen.addScore(0);
    clearInterval(timerId);
    rosetta.dead=1;
    rosetta.swapImg("explodingRocket.gif",0);
    soundBank.play("sadNoise");
    /*if (soundBank.on==1){
         setTimeout(reset,10)
                            }*/
    
    
}
function redirectComet(obj0,obj1){
    var pb;
    var c;
    if (obj0.type=="comet"){
        pb=obj1;
        c=obj0;
    }
    else{
       pb=obj0;
       c=obj1;
    }
    c.dx=pb.dx;
    c.dy=pb.dy;
    pb.die();
    plasmaBalls=[];
    
}

//Makes rocket follow mouse
function followMouse(){
    
    
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    
    //find the difference in position between mous and rocket
    var deltax = x - rosetta.x;
    var deltay = y - rosetta.y;

    
    //calculate the angle is radions
    var rad = Math.atan2(deltay,deltax);
    
    //convert to degrees
    var deg = rad * (180 / Math.PI);
    
    //shift by 90 degrees
    deg += 90;
   
    //rotate rocket by the different in angle
    rosetta.rotate( deg - rosetta.angle);
   
    //accelerate the rocket
    rosetta.accelerate(1);   
    scoreBoard.addScore(5);
    
}

  






