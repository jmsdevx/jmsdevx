const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048]
};

random.setSeed(random.getRandomSeed());
console.log(random.getSeed());

const sketch = () => {
  const createGrid = () => {
    //array to hold points values
    const points = [];
    //total count of points in grid
    const count = 5;
    //nested iteration builds the grid
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        //use uv space - numbers between 0 and 1
        //topleft = 0:0 bottomright = 1:1
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        //using (x || y) / (count - 1) creates even spaced grid
        //**ternary condition is to prevent dividing by zero**
        points.push([u, v]);
      }
    }
    return points;
  };

  //generate coordinates to be iterated + rendered
  const points = createGrid();
  console.log(points);

  return ({ context, width, height }) => {
    //set color of rect with fillStyle
    context.fillStyle = "white";
    //set size with fillRect(topleftX, topleftY, width, size)
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      //scale uv back up to px space
      const x = u * width;
      const y = v * height;

      //beginPath called before beginning each line
      context.beginPath();
      //arc draws circle using following parameters
      //ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      //strokeStyle = color
      context.strokeStyle = "black";
      //lineWidth = stroke width
      context.lineWidth = 40;
      //outlines current path
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
