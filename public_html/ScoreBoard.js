//ScoreBoard.js A place of studious learning and examination of facts and figours.
//********************************************************************************
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function ScoreBoard (border, borderColour, x, y, score, lives, icon,text,fontSize,pointToLife,name,button,height,width){
	this.border=border;
	this.borderColour=borderColour;
	this.x=x;
	this.y=y;
	this.score=score;
	this.lives=lives;
	this.icon=icon;
	this.board=document.createElement("div");
	this.counter=document.createElement("div");
	this.lifeDisplay=document.createElement("div");
	this.text=text;
	this.fontSize=fontSize;
	this.pointToLife=pointToLife;
        this.name = name;
        this.board.id = name;
        this.button=button;
        this.height=height;
        this.width=width;
	

       this.reset=function(){
           	this.border=border;
                this.borderColour=borderColour;
                this.x=x;
                this.y=y;
                this.score=score;
                this.lives=lives;
                this.icon=icon;
                this.board=document.createElement("div");
                this.counter=document.createElement("div");
                this.lifeDisplay=document.createElement("div");
                this.text=text;
                this.fontSize=fontSize;
                this.pointToLife=pointToLife;
                this.name = name;
                this.board.id = name;
           
       }
       
	//setup-creares score board
	this.setup=function(){
		
		
			//creates the border, colour, and pos
                        this.board.style.height=this.height;
                        this.board.style.width=this.width;
			this.board.style.position="absolute";
			this.board.style.left=this.x;
			this.board.style.top=this.y;
			this.board.style.border = "thick solid " + this.borderColour;
                        
                       
                     
                     
                     //maekes game over button
                     if (this.button==1){
                         var btn = document.createElement("BUTTON");
			this.board.appendChild(btn);
                        var t = document.createTextNode("New Game");
                        btn.onclick = function(){run()};
                        btn.appendChild(t);
                        btn.style.position="absolute";
                        btn.style.left="45%";
                        btn.style.top="20%";
                        btn.style.border = "thick solid " + this.borderColour;
                        //btn.style.text-align = "center";
                     }
			
			
			//creats the text font type and size 
			var title=document.createElement("h1");
			var t = document.createTextNode(this.text);
			title.appendChild(t);
			title.style.color="Yellow";
			title.style.fontFamily = "AR DELANEY";
			title.style.fontSize = this.fontSize;
			this.board.appendChild(title);
			
			//puts life count and lifeDisplay together 
			scoreBoard.scoreCount();
			this.board.appendChild(this.counter);
			scoreBoard.lifeCount();	
			this.board.appendChild(this.lifeDisplay);
			document.body.appendChild(this.board);
			
			
			
	}		
		
	//life count-shows how maney lives 
	this.lifeCount=function(){
		
		while(this.lifeDisplay.childNodes.length>0){
				
					this.lifeDisplay.removeChild(this.lifeDisplay.childNodes[0]);
			
			}
		
		
		
		//puts a small rocket on screen for lifes acording to life count numbers
		for (i = 0; i<this.lives;i++){ 
			var pic=document.createElement("img");
			pic.src=this.icon;	
			pic.height=50;
			this.lifeDisplay.appendChild(pic)
		}
	}
		
	//lose life-takes away life
	this.loseLife=function(){
		this.lives--;
		this.lifeCount();
                
		
	}
	
	//gain life-gains life
	this.gainLife=function(){
		this.lives++;
		this.lifeCount();
		
		
				
	}	
	
	//add score-adds score
	this.addScore=function(score){
		//xx= first score
		xx=this.score;
		//yy= added score
		yy=score;
		// z= bothtogether 
		z=xx+yy;
		//p= modulus remainder 
		p=z % this.pointToLife;
		
		if(p<yy){
			
			this.gainLife();
		}
		this.score=this.score+score;
		this.scoreCount();
		
		
	}
	
	//display the score
	this.scoreCount=function(){	
		
			//removes score
			if(this.counter.childNodes.length>0){
				//removes old score and puts a new one up
					this.counter.removeChild(this.counter.childNodes[0]);
			
			}
			
			//adds score
			var title=document.createElement("h2");
			var t = document.createTextNode(this.score);
			title.appendChild(t);
			//title.style.color="Magenta";
                        title.className="score";
			this.counter.appendChild(title);
	}
        
        //die
        this.die = function(){
            
            for (i=0;i<document.body.childNodes.length;i++){
			if (document.body.childNodes[i].id == this.name){
					document.body.removeChild(document.body.childNodes[i]);
					break;
                                        
                                              
                            
                            
			}
		}
            
        }
        //sets the score
        this.scoreSet = function(s){
            this.score=s;   
        }		
}
        
	

	





