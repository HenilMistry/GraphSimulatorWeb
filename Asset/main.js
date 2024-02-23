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
let WeEdges = [];
let animationEdges = [];
let animationNodes = [];
let click = 0;
let firstNode = -1;
let secondNode = null;
let NodeToolActivated = 0;
let animationFrames = 0;
let animate = false;
let animationSettings = {};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Just for testing..
// WeEdges.push(new WeightedEdge(new Node(10,10,100,20,"Red",c),new Node(10,100,100,20,"Red",c),"5",c));

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
  } else if(ActiveTool == Tools.WeightedEdge) {
    if(Nodes.length > 0) {
      Nodes.forEach((node, index) => {
        if(distance(node.x,node.y,mouse.x,mouse.y) <= node.radius) {
          // Just for testing...
          // console.log("Collision with "+index);
          click++;
          if(click%2==0) {
            // it means it's a second click..
            secondNode = node;
            openWeightedModal();
            click = 0;
          } else {
            firstNode = node;
          }
        }
      });
    } else {
      alert("No nodes are on the Canvas!");
      selectTool("None");
    }
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

addEventListener("keydown",(e) => {
  // console.log(e.keyCode);
  // 27=Esc Key...
  if(e.keyCode==27) {
    // unselect active tool...
    selectTool("None");
  }
});

// Implementation
let objects;
function init() {
  objects = [];
}

// Animation Loop
function animationLoop() {
  requestAnimationFrame(animationLoop);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Rendering all the UdEdges. Edges on the canvas 
  UdEdges.forEach((edge) => {
    edge.update();
  });

  // Rendering all the weighted edges on the canvas 
  WeEdges.forEach((edge) => {
    edge.update();
  });

  // Rendering all nodes on the canvas 
  Nodes.forEach((node)=>{
    node.update();
  });

  if(animate) {
    // setting active tool to null 
    ActiveTool = null;
    // console.log("frames : "+animationFrames);
    animationFrames++;
    // animation for kruskals algorithm...
    if(animationSettings.animation=="Kruskals") {
      // change to next step of animation...
      if(animationFrames%(animationSettings.stepDelay)==0) {
          animationSettings.edgeIndex++;
          if(animationSettings.edgeIndex > animationSettings.animationEdges.length-1) {
            animationSettings.edgeIndex = 0;
            animationSettings.nodeIndex = 0;
            animationSettings.colorIndex = 0;
            label_info.innerHTML = "Kruskal's Algorithm : Animation Completed, Press the button to start again!";
            animate = false;
            openAnswerModal(getKruskalsMstString());
          }
      }
      // change to next blink phase...
      if(animationFrames%(animationSettings.blinkingDelay)==0) {
        animationSettings.colorIndex++;
      }
      // animate the things on canvas...
      if(animate) {
        for(let i=0; i<animationSettings.edgeIndex; i++) {
          animationSettings.animationEdges[i].paint("Red");
        }
        animationSettings.animationEdges[animationSettings.edgeIndex].paint(((animationSettings.colorIndex%2)?("Red"):("Black")));
        label_info.innerHTML = "Kruskal's Algorithm : Selecting Edge "+animationSettings.animationEdges[animationSettings.edgeIndex].a.label+"--"+animationSettings.animationEdges[animationSettings.edgeIndex].b.label+" with edge weight : "+animationSettings.animationEdges[animationSettings.edgeIndex].weight;
      }
    } else if(animationSettings.animation=="Prims") {
      // change to next step of animation...
      if(animationFrames%(animationSettings.stepDelay)==0) {
        animationSettings.nodeIndex++;
        animationSettings.edgeIndex++;
        if(animationSettings.nodeIndex > animationSettings.animationNodes.length-1 || animationSettings.edgeIndex > animationSettings.length-1) {
          animationSettings.edgeIndex = 0;
          animationSettings.nodeIndex = 0;
          animationSettings.colorIndex = 0;
          label_info.innerHTML = "Prims's Algorithm : Animation Completed, Press the button to start again!";
          animate = false;
          openAnswerModal(getPrimsMstString());
        }
      }
      // change to next blink phase...
      if(animationFrames%(animationSettings.blinkingDelay)==0) {
        animationSettings.colorIndex++;
      }
      // animate the things on canvas...
      if(animate) {
        for(var i=0; i<animationSettings.edgeIndex; i++) {
          animationSettings.animationEdges[i].paint("Red");
        }
        animationSettings.animationNodes[animationSettings.nodeIndex].paint(((animationSettings.colorIndex%2)?("Red"):("Green")));
        label_info.innerHTML = "Prim's Algorithm : Exploring node : "+animationSettings.nodeIndex+" for the shortest edge!";
      }
    }
  }

  // Rendering the reference edge...
  if(firstNode!=null) {
    // console lines are just for testing 
    // console.log("Drawing ref. line");
    c.beginPath();
    c.strokeStyle = "green";
    c.lineWidth = 5;
    c.setLineDash([5, 5]);
    c.moveTo(firstNode.x, firstNode.y);
    if(secondNode!=null) {
      c.lineTo(secondNode.x,secondNode.y);
    } else {
      c.lineTo(mouse.x,mouse.y);
    }
    c.stroke();
    c.closePath();
  }
}

init();
animationLoop();

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