//stuff that explain whta the lander has 
function Lander(img, health, speed, height,width, direction, name, y, x,dx,dy,img2){
        this.type="Lander";
	SpaceObject.call(this,img, health, speed, height,width, direction, name, y, x,dx,dy);
        this.img2=img2;
        
}


