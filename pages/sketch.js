var mySpinningPatternWebGL = function(p) {

  let spheres = [];
  let numSpheres = 3;
  let t = 0; // For color animation

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    
    // Reduce the range for initial positions to make spheres more central
    let positionRange = p.min(p.width, p.height) * 0; 

    // Create multiple spheres
    for (let i = 0; i < numSpheres; i++) {
      let sphere = {
        radius: p.random(250, 250), // Radius of the spheres
        pos: p.createVector(p.random(-positionRange, positionRange), p.random(-positionRange, positionRange), p.random(-positionRange, positionRange)),
        xRot: p.random(0.001, 0.003), // Rotation speed around X-axis
        yRot: p.random(0.001, 0.003), // Rotation speed around Y-axis
        zRot: p.random(0.001, 0.003)  // Rotation speed around Z-axis
      };

      spheres.push(sphere);
    }
  };

  p.draw = function() {
    p.background(0);
    // p.background(33, 0, 91);
    p.noFill();
    p.strokeWeight(1);

    spheres.forEach((elem, index) => {
      p.push();
      p.translate(elem.pos.x, elem.pos.y, elem.pos.z);

      // Apply rotation
      p.rotateX(p.frameCount * elem.xRot);
      p.rotateY(p.frameCount * elem.yRot);
      p.rotateZ(p.frameCount * elem.zRot);

      // Change color over time
      let r = p.sin(t + index) * 127 + 128;
      let g = p.sin(t + index + p.TWO_PI / 3) * 127 + 128;
      let b = p.sin(t + index + p.TWO_PI / 3 * 2) * 127 + 128;
      p.stroke(r, g, b);

      // Display the sphere
      p.sphere(elem.radius);
      p.pop();
    });

    t += 0.003; // Increment t for color changes
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};


  // Create a new p5 instance and attach it to an element with the ID 'mySpinningPatternWebGLContainer'
  new p5(mySpinningPatternWebGL, 'mySpinningPatternWebGLContainer');
  




// // Encapsulate the sketch in the "instance mode" syntax
// var myPattern = function(p) {
//   let angleOffset = 0;
//   let spinAngle = 0;

//   p.setup = function() {
//     p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
//     p.strokeWeight(2);
//   };

//   p.draw = function() {
//     p.background(200, 200, 200);
//     p.stroke(180, 50, 255);

//     // Rotate around the Y-axis for spinning
//     p.rotateY(spinAngle);

//     for (let angle = 0; angle < p.TWO_PI; angle += p.radians(2)) {
//       let offset = p.sin(angle * 6 + angleOffset) * 50;
//       let r = 200 + offset;
//       let x = r * p.cos(angle);
//       let y = r * p.sin(angle);

//       // Draw lines from the center to the edge of the pattern
//       p.line(0, 0, 0, x, y, 0);
//       // Draw the perpendicular lines for symmetry
//       p.line(0, 0, 0, y, x, 0);
//     }

//     // Update the angles for animation
//     angleOffset += 0.02;
//     spinAngle += 0.01;
//   };

//   // Resize function to adjust the canvas when the window is resized
//   p.windowResized = function() {
//     p.resizeCanvas(p.windowWidth, p.windowHeight);
//   };
// };

// // Create a new p5 instance and attach it to an element with the ID 'myPatternContainer'
// var myp5 = new p5(myPattern, 'myPatternContainer');






































// let angleOffset = 0;
// let spinAngle = 0;

// function setup() {
//   createCanvas( 610, 610, WEBGL);
// }

// function draw() {
//   background(0);
//   stroke(180, 50, 255);
//   noFill();
  
//   translate(width / 2, height / 2); // Center the design
//   rotate(spinAngle); // Apply rotation to the entire canvas
  
//   beginShape();
//   for (let angle = 0; angle < TWO_PI; angle += radians(2)) { // Increment angle by 2 degrees
//     let offset = sin(angle * 6 + angleOffset) * 50; // Create a wave pattern
//     let r = 200 + offset; // Radius with offset
//     let x = r * cos(angle); // Polar to cartesian coordinate conversion
//     let y = r * sin(angle);
    
//     // Draw symmetric lines
//     line(x, y, -x, -y);
//     line(y, x, -y, -x);
//   }
//   endShape(CLOSE);
  
//   angleOffset += 0.01; // Change the angle offset for animation
//   spinAngle += 0.001; // Increase the spin angle for rotation
// }

// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);
// }
