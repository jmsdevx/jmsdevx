const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048]
};

random.setSeed(random.getRandomSeed());
console.log(random.getSeed());

//noise
//value is in -1...1 range
//const v = noise2D(x , y);
//map to 0..1 range
//const n = v * 0.5 + 0.5;
//turn into a percentage
//const L = Math.floor(n * 100);
//get color value
//const hsl = `hsl(0, 0%, ${L}%)`;
//frequency of noise signal (more variation and changes);
//const v = noise2D(x * frequency, y * frequency);

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes).slice(0, colorCount));
  console.log(palette);
  const createGrid = () => {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.15;
        points.push({
          radius,
          position: [u, v],
          color: random.pick(palette),
          rotation: random.noise2D(u, v)
        });
      }
    }
    return points;
  };

  // random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.35);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(200, 300, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.lineWidth = 20;
      // context.fillStyle = color;
      // context.fill();

      context.save();

      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("~", u, v);

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
