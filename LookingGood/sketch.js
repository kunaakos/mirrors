var videoInput;
var ctracker;
var myImage1;
var myImage2;
var anchorpoint1;
var anchorpoint2;
//var sequence =[];
var ec;
var text0 = "";
var myFont;
var alpha0 = 0;
var fadeSpeed0 = 5;

function preload() {
	myFont = loadFont("GTPressuraMonoR.otf");
}

function setup() {
    // setup canvas
    createCanvas(400, 300);
	
	textFont(myFont);
	textSize(15);
    
    // setup camera capture
    videoInput = createCapture();
    videoInput.size(400, 300);
    videoInput.position(0, 0);
    videoInput.id("v");
    videoInput.hide();
    var mv = document.getElementById("v");
    mv.muted = true;
    
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);
    noStroke();
    
    myImage2 = loadImage("Face.png");
    
    anchorpoint1 = createVector(0, 0);
    anchorpoint2 = createVector(0, 1);
    
    ec = new emotionClassifier();
    ec.init(emotionModel);
    
    //for (var i = 0; i < 100; i++) {
        
        //sequence[i]=loadImage("Emotion/Emotion_"+nf(i,5)+".png");
    //}
}
      
function draw() {
  background(0,36,255);

//	fill(255, alpha0);
// 	text0 = "Looking good today";
//	alpha0 = alpha0 + fadeSpeed0;
//	alpha0 = constrain(alpha0, 0, 255);
	
	
	push()
	scale(-1, 1)
    translate(-400, 0)
	

    var positions2 = ctracker.getCurrentPosition();
    
    //console.log(anchorpoint1);
    
    if(positions2.length > 0) {
        anchorpoint1 = p5.Vector.lerp(anchorpoint1, createVector(positions2[33][0], positions2[33][1] ), 0.3);
        
        anchorpoint2 = p5.Vector.lerp(anchorpoint2, createVector(positions2[7][0], positions2[7][1] ), 0.3);
        
        
    }
    
    if(anchorpoint1!=undefined) {
        var angleRad = Math.atan2(anchorpoint2.y - anchorpoint1.y, anchorpoint2.x - anchorpoint1.x);
        //translate(positions2[62][0], positions2[62][1]); 
        
        translate(anchorpoint1.x + (anchorpoint2.x - anchorpoint1.x) * 0.5, anchorpoint1.y + (anchorpoint2.y - anchorpoint1.y) * 0.5);
        rotate(angleRad - PI/2);
        imageMode(CENTER,CENTER);
    
    	var mSize2 = anchorpoint1.dist(anchorpoint2);
		
        image(myImage2, 0, 0, mSize2 * 1.7, mSize2 * 1.7);    
    }
    
    //var n = frameCount % 100;
    //image(sequence[n], 0, 0);
    
    var cp = ctracker.getCurrentParameters();
    var er = ec.meanPredict(cp);
	
	pop()
	
    if (er) {
        console.log(er[5].value);
        
        //if (er[5].value > 0.5) {
        //image(myImage2, 0, 0, mSize2 * 1.5, mSize2 * 1.5); 
        //}
		
		if (er[5].value > 0.6) {
			
			fill(255, alpha0);
 			text0 = "Looking good today";
			alpha0 = alpha0 + fadeSpeed0;
			alpha0 = constrain(alpha0, 0, 255);
 			text(text0, 125, 250);
			 
        
		}
		
		else {
		
//			fadeSpeed0 = -5;
		
		}
              
    }
              
}