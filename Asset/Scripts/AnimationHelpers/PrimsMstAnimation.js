/**
 * This file contains the information about
 * animation of Prim's Algorithm.
 */

// From primsAlgo.js script... 
var selectedNodes = [];
let PrimsAnimationSettings = {
    blinkingDelay: 50,
    stepDelay: 1000,
    edgeIndex: 0,
    nodeIndex: 0,
    animationNodes : [],
    animationEdges : [],
    colorIndex: 0,
    animation: "Prims",
};

function animatePrims() {
    console.log("MST : "+getPrimsMstString());
    let nodes = [];
    selectedNodes = getSelectedNodes();
    selectedEdges = getSelectedEdges();
    console.log("Selected nodes : "+selectedNodes);
    console.log("Selected edges : ");
    console.log(selectedEdges);

    // making copy of selected nodes for simulation...
    selectedNodes.forEach((node) => {
        nodes.push(new Node("",Nodes[node].x,Nodes[node].y,30,"Red",Nodes[node].c));
    });
    
    // setting the variables in main.js script... 
    PrimsAnimationSettings.animationEdges = selectedEdges;
    PrimsAnimationSettings.animationNodes = nodes;
    animationNodes = nodes;
    animationEdges = selectedEdges;
    animationSettings = PrimsAnimationSettings;

    // starting the animation...
    animate = true;
    selectedNodesInOrder = [];
    selectedEdgesInOrder = [];
}