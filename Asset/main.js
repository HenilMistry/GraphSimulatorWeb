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
let NodeToolActivated = 0;

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
// What to do when mouse is clicked...
addEventListener("click", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  // Console lines are just for testing 
  // console.log("MOUSE x:"+mouse.x+" y:"+mouse.y);

  if(ActiveTool == Tools.NODE) {
    if(NodeToolActivated != 1) {
      Nodes.push(new Node(Nodes.length,mouse.x,mouse.y,20,"Red",c));
    }
    NodeToolActivated = 0;

    // console.log(Nodes);
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

// What to do when window is resized 
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// What to do when mousemove event is occurred 
addEventListener("mousemove",(e)=>{
  // console lines are just for testing 
  // console.log(e.x+" "+e.y);
  mouse.x = e.x;
  mouse.y = e.y;
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

  // Rendering the reference edge...
  if(firstNode!=null) {
    // console lines are just for testing 
    // console.log("Drawing ref. line");
    c.beginPath();
    c.strokeStyle = "green";
    c.lineWidth = 5;
    c.setLineDash([5, 5]);
    c.moveTo(firstNode.x, firstNode.y);
    c.lineTo(mouse.x,mouse.y);
    c.stroke();
    c.closePath();
  }
}

init();
animate();

/**
 * This function will find the distance between two coordinates in
 * 2D Plane. Provided their coordinates. Point A (x1,y1) and Point B (x2,y2) 
 * It returns the distance in Floating value!
 * @param {*} x1 : x coordinate of point A
 * @param {*} y1 : y coordinate of point A
 * @param {*} x2 : x cordinate of point B
 * @param {*} y2 : y coordinate of point B
 * @returns 
 */
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}