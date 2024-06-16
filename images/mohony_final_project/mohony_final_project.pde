float x;
float sW = 4;
color red = color(255, 30, 10);     //create a variable of the colour red
color grey = color(50);            //create a variable of the colour green
color white = color(255);       //create a variable of the colour white
color lightGrey = color(100);            ////create a variable of the colour light grey
float y = 180;                         //defines y in order to make the rotation occur byt 180 degrees
float angle = 0.0;                  //angle starts at 0 degreees
float z = 0;

void setup(){
  size(1200, 1600);                    //defines size of canvas
  surface.setLocation(987, 70);        //defines position of canvas in relation to top left of screen
  //noLoop();
  //moving();
}

void draw(){
  //moving();
  background(255);                           //background colour white
  //stroke(255); 
  


  // transformation for moving star in the background
  pushMatrix();                                    //pushes current transformation onto matrix stack
  translate(width/2+40, height/2+ 80);              //position circle in the canvas
  rotate(frameCount / 100.0);                       //framrate that the star rotates
  noStroke();                                       //no outline
  scale(3);                                          //scaled it up by 3
  star(0, 0, 80, 100, 120);                          // size ofstar and the amount of points
  fill(grey);                                       //colour of star
  popMatrix();                                      //ends matrix stack
  
  translate(width/2+100, height/2);                 //position of the red line circles

  
  for(int angle = 0; angle<=900; angle +=2){         //looping through each ang;e if angle is  if equal to than 900
    
    x = random(250, 300);                          //random lines to create abstracted circle
    
    pushMatrix();                                  //pushes current transformation onto matrix stack
    rotate(radians(angle));                        //rotate using radians
    stroke(red);                                    //lines filled in red
    strokeWeight(sW);                               //thickness of lines
    line(x, 0, width, 0);                            //how many lines and position
    popMatrix();                                     //ends matrix stack
  }
  
  angle += 0.05;                                 //speed of lines moving

  //grey line
  stroke(lightGrey);
  strokeWeight(30);    
  rotate(angle);
  line(width, -1000, -1000, 800);
 
  //red line
  stroke(red);
  strokeWeight(30);    //red line
  line(-900, -800, 700, 700); 

  //white line
  strokeWeight(40);
  stroke(white);
  line(-500, -1000, -100, 900);

  //black line
  stroke(0);       
  strokeWeight(sW);
  line(-900, -1200, -300, 800);

  
}


//function for the star
void star(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;                    //the angle that it would spin at
  float halfAngle = angle/2.0;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


//void mousePressed(){
//  redraw();
//}

void keyPressed(){
  
  if (key == 'r'){
    z +=1;
    setup();
    
  }
  else if(key == 's'){                         //is is pressed rotation stops
    stop();
  }

}
