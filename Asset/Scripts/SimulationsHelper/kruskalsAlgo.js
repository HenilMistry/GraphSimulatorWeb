/**
 * This script contains the information about Kruskals Algoithm.
 * All about Kruskals algorithm and all controls of this algorithm
 * are here.
 */

// From the matrixFormation script... 
var weightedEdges = getWeEdges();
var totalNodes = Nodes.length;
var KruskalsMST = "";

// This will help in animation utility...
var selectedEdgesInOrder = [];

function applyKruskals(showAnimation) {
    selectedEdgesInOrder = [];
    // Resetting the String for the Kruskal's MST...
    KruskalsMST = "<h1>Below is the Kruskal's MST!<h1>";
    KruskalsMST += "<table class='table table-hover table-striped table-primary'>";
    KruskalsMST += "<thead><tr><th>Edge</th><th>Edge Weight</th></tr></thead><tbody>";

    totalNodes = getNodes();
    // console.log("Total nodes : "+totalNodes);

    // first of all we have sort all of the weighted edges...
    // in ascending order, so that we can access minimum weighted edge
    weightedEdges.sort((a,b) => {
        return Number(a.weight) - Number(b.weight);
    });
    // console.log("After sorting...");
    // console.log(weightedEdges);

    let parent = new Array(totalNodes);
    let rank = new Array(totalNodes);

    // initializing parent and rank list...
    makeSet(parent,rank,totalNodes);

    // to store the minimum cost for particular MST
    let minCost = 0;

    for(var j=0; j<totalNodes; j++) {
        let v1 = findParent(parent, weightedEdges[j].a.label);
        let v2 = findParent(parent, weightedEdges[j].b.label);
        let weight = weightedEdges[j].weight;
        // console.log("v1 : "+v1+" v2 : "+v2+" weight : "+weight);

        if(v1!=v2) {
            unionSet(v1,v2,parent,rank,totalNodes);
            minCost+=Number(weight);
            selectedEdgesInOrder.push(weightedEdges[j]);
            // reference string...
            // console.log(weightedEdges[j].a.label+"------"+weightedEdges[j].b.label+"\t"+weight);
            // KruskalsMST += "<br><h3>"+weightedEdges[j].a.label+"---"+weightedEdges[j].b.label+"\t"+weight+"</h3>";
            KruskalsMST += "<tr><td>"+weightedEdges[j].a.label+"---"+weightedEdges[j].b.label+"</td><td>"+weight+"</td></tr>";
        }
    }
    KruskalsMST += "<tr><td><b>Cost of MST</b></td><td><b>"+minCost+"</b></td></tr></tbody></table>";

    console.log("Cost of MST : "+minCost);
    console.log(selectedEdgesInOrder);
    if(showAnimation) {
        animateKruskal();
    }
}

/**
 * This function unions two sets based on
 * their rank
 * @param {*} u 
 * @param {*} v 
 * @param {*} parent 
 * @param {*} rank 
 * @param {*} n 
 */
function unionSet(u, v, parent, rank, n) {
    u = findParent(parent, u);
    v = findParent(parent, v);

    if(rank[u] < rank[v]) {
        parent[u] = v;
    } else if(rank[v]<rank[u]) {
        parent[v] = u;
    } else {
        parent[v] = u;
        // if ranks of both sets are same...
        // rank increases...
        rank[u]++;
    }
}

/**
 * This function will help to find the parent.
 * @param {*} parent 
 * @param {*} component 
 * @returns The parent of an edge 
 */
function findParent(parent, component) {
    if(parent[component]==component) {
        return component;
    } else {
        return parent[component] = findParent(parent, parent[component]);
    }
}

/**
 * This function will initialize the parent and
 * rank lists.
 * @param {*} parent 
 * @param {*} rank 
 * @param {*} n 
 */
function makeSet(parent, rank, n) {
    for(let i=0; i<n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}

/**
 * This function will return the list of all weighted edges,
 * forming the weighted graph.
 * @returns The list containing all weighted edges
 */
function getWeEdges() {
 var edges = WeEdges;
 return edges;   
}

/**
 * 
 * @returns The in-order selection of Edges...
 */
function getSelectedEdges() {
    let edges = selectedEdgesInOrder;
    return edges;
}

function getKruskalsMstString() {
    return KruskalsMST;
}