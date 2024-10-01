
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var winWidth = canvas.width = window.innerWidth;
var winHeight = canvas.height = window.innerHeight;

var circles = []; // creates the circle object
var circleAmt = 64; // number of circles

while ( circleAmt-- ) circles.push( new circle() ); //add the circles

function circle() { // this function creates each circle and appends it to the container element
	
   this.pos = { //position
    x: Math.random() * winWidth, 
    y: Math.random() * winHeight 
  };
  	
    this.radius = 24.; //init radius
    
    this.clr = {r: 255, g: Math.floor(Math.random() * (92 - 1) + 1), b: 0, a: 0.3 }; // random amt of green, converted into rgba statement
    this.rgb = "rgba(" + this.clr.r + ", " + this.clr.g + ", " + this.clr.b + ", " + this.clr.a + ")";
    
	this.vel = { // velocity
    x: Math.floor(Math.random() * (2.6 - 1.8) + 1.8), 
    y: Math.floor(Math.random() * (1.1 - 1.0) + 1.0) 
    };
  
	this.show = function () { //make the circle!
	
	ctx.beginPath();
    ctx.fillStyle = this.rgb;
    ctx.arc(this.pos.x, this.pos.y, this.radius, Math.PI*2, false);
    ctx.shadowColor=this.rgb;
    ctx.shadowBlur=36; // slows it down considerably, but worth it for effect, not enough blur in my opinion
    ctx.fill();
    
    this.updatePos();
    
    };
    
    this.updatePos = function () {
    if ( this.pos.x  <=  winWidth/2 ) {
	    this.pos.x -= this.vel.x;
	    this.pos.y -= this.vel.y;
	    this.radius+=0.1; // grow and move over time
    }
    else {
	    this.pos.x += this.vel.x;
	    this.pos.y -= this.vel.y;
	    this.radius+=0.1;
    };
  };
  
}; 

function draw () {
	ctx.fillStyle = "rgba(0,0,0,.75)";
	ctx.fillRect(0,0,winWidth,winHeight);
	
		  circles.forEach(function(v, i, arr){
		  if (v.pos.x <= -64 || v.pos.x >= (winWidth + 64)) {
        
        /* garbage collection, makes circles flicker I think too which is a glitch but sometimes glitches can be beautiful, thus prompting this sketch, anyone know a method that doesn't make the object flicker? */
        
		  var arrayPos = circles.indexOf(v);
			 circles.splice(arrayPos,1); // comment to fix flicker
        /* uncomment to flicker the circles */ 
        /*  delete circles[arrayPos];*/
			 circles.push( new circle() ); // make new circle
		  	}
		    v.show();
		  });
};

let frame = function() {
  draw();
  window.requestAnimationFrame(frame);
}
 window.requestAnimationFrame(frame);

