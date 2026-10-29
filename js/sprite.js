// Kawaii star sprite: drops in, twinkles, says "scroll down"
// Fades out as the page scrolls.
// . empty  K black  N navy  L lavender  P pink

const SPRITE = [
  "........KN........",
  ".......KLLK.......",
  ".......NLLN.......",
  "......KLLLLN......",
  ".....KLLLLLLK.....",
  "...KKLLLLLLLLKK...",
  "KKKLLLNLLLLNLLLKKK",
  "KLLLLLNLLLLNLLLLLK",
  ".KLLPPLLLLLLPPLLK.",
  "..KLPPLNLLNLPPLK..",
  "...KLLLLNNLLLLK...",
  "....KLLLLLLLLK....",
  ".....KLLLLLLK.....",
  "....NLLLLLLLLN....",
  "...NLLLLKNLLLLN...",
  "..NLLLLK..KLLLLK..",
  ".KLLLKK....KNLLLK.",
  "KLLNN........NNLLK",
  ".KN............NN.",
];

// same star with eyes half-shut, for blinking
const BLINK = SPRITE.map((row, r) =>
  r === 6 ? row.replace(/N/g, "L") : row
);

const ARROW = [
  "..N..",
  "..N..",
  "N.N.N",
  ".NNN.",
  "..N..",
];

const PALETTE = {
  K: "#252728",
  N: "#343549",
  L: "#d9d2f4",
  P: "#f7a9bb",
};

const SPARKLE_COLOURS = ["#f7a9bb", "#b9aef0", "#ffd36e"];
const LABEL = "scroll down";

let cnv, PX, starX, starY, targetY, vy, landed, landFrame, sparkles;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  // sit on top of the page without blocking clicks
  cnv.position(0, 0);
  cnv.style("position", "fixed");
  cnv.style("pointer-events", "none");
  cnv.style("z-index", "10");
  noSmooth();
  textFont("monospace");
  textAlign(CENTER, CENTER);
  layout();
  reset();
}

const MARGIN = 24; // gap from the screen edges

function layout() {
  PX = width < 600 ? 3 : 4; // pixel size: smaller on phones
  starX = width - SPRITE[0].length * PX - MARGIN;
  targetY = height - SPRITE.length * PX - MARGIN;
}

function reset() {
  starY = -SPRITE.length * PX - 20;
  vy = 0;
  landed = false;
  sparkles = [];
}

function draw() {
  clear(); // transparent, so your site shows through

  // fade out as the visitor scrolls
  const fade = 1 - constrain(window.scrollY / (windowHeight * 0.4), 0, 1);
  cnv.elt.style.opacity = fade;
  if (fade === 0) return;

  const sw = SPRITE[0].length * PX;
  const sh = SPRITE.length * PX;

  // --- falling with a little bounce ---
  if (!landed) {
    vy += 0.8;
    starY += vy;
    if (starY > targetY) {
      starY = targetY;
      vy *= -0.4;
      if (abs(vy) < 2) {
        landed = true;
        landFrame = frameCount;
      }
    }
    // sparkle trail while falling
    if (random() < 0.5) {
      addSparkle(starX + random(sw), starY - random(PX * 6));
    }
  }

  // gentle float once landed
  const bob = landed ? round(sin((frameCount - landFrame) * 0.05) * 1.5) * PX * 0.5 : 0;
  const y = round(starY + bob);

  // --- twinkles around the star ---
  if (landed && random() < 0.07) {
    addSparkle(
      starX + random(-sw * 0.3, sw * 1.1),
      y + random(-sh * 0.3, sh)
    );
  }
  for (const s of sparkles) drawSparkle(s);
  sparkles = sparkles.filter((s) => s.life < s.max);

  // --- the star (blinks every few seconds) ---
  const blinking = landed && (frameCount - landFrame) % 200 > 192;
  drawSprite(blinking ? BLINK : SPRITE, starX, y, PX);

  // --- speech bubble + arrow fade in after landing ---
  if (landed) {
    const a = constrain((frameCount - landFrame) / 30, 0, 1);
    drawingContext.globalAlpha = a;
    // bubble sits to the left of the star, arrow underneath it
    const b = drawBubble(starX - PX * 3, y + round(sh * 0.15));
    const arrowBob = round(sin(frameCount * 0.12) * 1.5) * PX * 0.5;
    drawSprite(ARROW, round(b.cx - 2.5 * PX), b.bottom + PX * 3 + arrowBob, PX);
    drawingContext.globalAlpha = 1;
  }
}

function drawSprite(sprite, x, y, px) {
  noStroke();
  for (let r = 0; r < sprite.length; r++) {
    for (let c = 0; c < sprite[r].length; c++) {
      const col = PALETTE[sprite[r][c]];
      if (col) {
        fill(col);
        rect(x + c * px, y + r * px, px, px);
      }
    }
  }
}

// right = where the bubble's right edge ends, top = its top edge
function drawBubble(right, top) {
  textSize(PX * 3);
  const bw = ceil((textWidth(LABEL) + PX * 4) / PX) * PX;
  const bh = PX * 5;
  const x = right - bw - PX;
  const midY = top + PX + bh / 2;

  noStroke();
  fill(PALETTE.N);
  // tail pointing right at the star
  rect(right, round(midY - PX / 2), PX * 2, PX);
  // pixel border + fill
  rect(x - PX, top, bw + PX * 2, bh + PX * 2);
  fill(255);
  rect(x, top + PX, bw, bh);

  fill(PALETTE.N);
  text(LABEL, x + bw / 2, midY);

  return { cx: x + bw / 2, bottom: top + bh + PX * 2 };
}

function addSparkle(x, y) {
  sparkles.push({ x, y, life: 0, max: 36, col: random(SPARKLE_COLOURS) });
}

function drawSparkle(s) {
  s.life++;
  const arm = floor(sin((s.life / s.max) * PI) * 3); // grows then shrinks
  const x = round(s.x / PX) * PX; // snap to the pixel grid
  const y = round(s.y / PX) * PX;
  noStroke();
  fill(s.col);
  rect(x, y, PX, PX);
  for (let i = 1; i < arm; i++) {
    rect(x + i * PX, y, PX, PX);
    rect(x - i * PX, y, PX, PX);
    rect(x, y + i * PX, PX, PX);
    rect(x, y - i * PX, PX, PX);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  layout();
  if (landed) starY = targetY;
}