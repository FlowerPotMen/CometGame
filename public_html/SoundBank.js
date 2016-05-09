function SoundBank (){
   this.on=1; 
   this.sounds={
       "countDown":new Audio("sounds/countDown.wav"),
       "sadNoise":new Audio("sounds/SadTrombone.wav"),
       "boom":new Audio("sounds/SonicBoom.mp3"),
       "rocketThrust":new Audio ("sounds/rocketThruster.wav"),
       "thruster":new Audio ("sounds/rocketThruster2.wav"),
        };
   
    this.play=function(sound,volume){
        if (this.on==1){
          this.sounds[sound].play(); 
        }
        
        
    };
    this.addSound=function(){
        
    };
   this.mute=function(){
       if (this.on===1 ){
           this.on=0;
           
           
       }
       else{
           this.on=1;
       }
   };
}


