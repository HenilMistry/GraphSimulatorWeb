/**
 * This file contains the information about animation
 * for Kruskals Algorithm.
 */

// From KruskalsAlgo.js script... 
var selectedEdges = [];
let KruskalsAnimationSettings = {
    blinkingDelay: 50,
    stepDelay: 1000,
    edgeIndex: 0,
    nodeIndex: 0,
    colorIndex: 0,
    animation: "Kruskals"
};

function animateKruskal() {
    let edges = [];
    selectedEdges = getSelectedEdges();

    // making copy of selected edges for simulation...
    selectedEdges.forEach((edge) => {
        edges.push(new WeightedEdge(edge.a, edge.b, edge.weight, edge.c));
    });

    // setting the variables in main.js script... 
    animationEdges = edges;
    animationSettings = KruskalsAnimationSettings;

    // starting the animation...
    animate = true;
}