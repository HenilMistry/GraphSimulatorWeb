const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
let Nodes = [];
let UdEdges = [];
let click = 0;
let firstNode = -1;

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("click", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  // Console lines are just for testing 
  // console.log("MOUSE x:"+mouse.x+" y:"+mouse.y);
  if(ActiveTool == Tools.NODE) {
    Nodes.push(new Node(mouse.x,mouse.y,20,"Red",c));
    console.log(Nodes);
  } else if(ActiveTool == Tools.UndirectedEdge) {
    if(Nodes.length > 0) {
      Nodes.forEach((node, index) => {
        if(distance(node.x,node.y,mouse.x,mouse.y) <= node.radius) {
          // Just for testing...
          // console.log("Collision with "+index);
          click++;
          if(click%2==0) {
            // it means it's a second click..
            UdEdges.push(new EdgeHelper(firstNode,node,c));
            click = 0;
            firstNode = null;
          } else {
            firstNode = node;
          }
        }
      });
    } else {
      alert("No nodes are on the Canvas!");
      selectTool("None");
    }
    console.log(UdEdges);
  }
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Implementation
let objects;
function init() {
  objects = [];
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Rendering all the UdEdges. Edges on the canvas 
  UdEdges.forEach((edge) => {
    edge.update();
  });

  // Rendering all nodes on the canvas 
  Nodes.forEach((node)=>{
    node.update();
  });
}

init();
animate();

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}