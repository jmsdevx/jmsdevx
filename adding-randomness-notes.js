const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

//lerp = linear interpolation
// value = lerp(min, max, t)
// t value between 0 and 1
// t = 0 --> min, t = 1 --> max

const settings = {
  dimensions: [2048, 2048]
};

//
random.setSeed(random.getRandomSeed());
console.log(random.getSeed());

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 20;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        //adjust point size variance with radius randomness
        //use gaussian for more interesting distributions
        //wrap in absolute value bc negative radius will cause error
        points.push({
          position: [u, v],
          radius: Math.abs(0.01 + random.gaussian() * 0.015)
        });
      }
    }
    return points;
  };

  //to get consistent result use deterministic seed
  //random.setSeed(number);

  //add filter fn to remove some points randomly
  const points = createGrid().filter(() => random.value() > 0.5);
  console.log(points);

  const margin = 350;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius } = data;
      const [u, v] = position;

      //use lerp w/ margin to define grid bounds
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      //use radius * width so it is relative to diff screen sizes
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);

      //use fill over stroke for filled in shapes
      context.fillStyle = "red";
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
