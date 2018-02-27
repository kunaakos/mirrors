var videoInput;
var ctracker;
var img;
var w = 80;
var h = 60;
//var drawCanvas;

function setup() {
   
	
    createCanvas(w, h);
//    colorMode(HSB, 255)
//	drawCanvas = document.getElementById('defaultCanvas0');
    videoInput = createCapture();
    videoInput.size(w, h);
    videoInput.position(0, 0);
    videoInput.id("v");
    videoInput.hide();
    var mv = document.getElementById("v");
    mv.muted = true;
    
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);
    noStroke();
	img = createImage(w, h)
	background(255);
}
      
function draw(){
	
	
//	scale(-1, 1)
//	translate(-40, 0)


	var p1, p2, mSize;
    var positions = ctracker.getCurrentPosition();
	
	if(positions.length > 0) {
		p1 = createVector(positions[27][0], positions[27][1] );
		p2 = createVector(positions[32][0], positions[32][1] );
		mSize = p1.dist(p2);
	}
 
	videoInput.loadPixels();
	img.loadPixels();
  //var stepSize = round(constrain(mouseX / 8, 2, 100));
    var stepSize = 1
    for (var y=0; y<height; y+=stepSize) {
    	for (var x=0; x<width; x+=stepSize) {
      		var i = y * width + x;
			var darkness = 0
			if(videoInput.pixels[i*4] != undefined){
				
//				var c = color(videoInput.pixels[i*4], videoInput.pixels[i*4+1], videoInput.pixels[i*4+2])
//				darkness = saturation(c) / 255;
				darkness = videoInput.pixels[i*4] / 255;
			}
//			console.log(videoInput.pixels[i*4])
			var radius = stepSize * darkness;
			
  			if(darkness<0.8){
				img.set(x, y, [255, 255, 255, 255]);
//				fill(0)
				if(positions.length > 0) {
	//			var eye1 = createVector(positions[23][0], positions[23][1] )
					var currentpixel = createVector(x, y)
					var distance1 = p1.dist(currentpixel)
					var distance2 = p2.dist(currentpixel)
					if(Math.min(distance1, distance2) < mSize*0.4)
//						fill(0, 0, 255)
						img.set(x, y, [0, 0, 255, 255]);
				}
//        		rect(x, y, stepSize, stepSize);
    		}
			
			else {
				img.set(x, y, [0, 0, 0, 255]);
			}
    	}
  	}
	img.updatePixels();
	image(img, 0, 0);
//	ctracker.draw(drawCanvas)
}