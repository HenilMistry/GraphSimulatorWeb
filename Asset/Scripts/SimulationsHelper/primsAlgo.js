/**
 * This script contains the information about prims Algoithm.
 * All about prims algorithm and all controls of this algorithm
 * are here.
 */

// From the matrixFormation script... 
var weightedGraphMatrix = getWeMatrix();

// list to store constructed MST...
let tree = [];
// list to store key value pairs to pick minimum edge...
let key = [];
// to represented set of vertices included in MST...
let mstSet = [];
var PrimsMST = "";

// This will help in animation utility...
var selectedNodesInOrder = [];

/**
 * This function will apply the prims algorithm...
 */
function applyPrims() {
    selectedEdgesInOrder = [];
    selectedNodesInOrder = [];
    weightedGraphMatrix = getWeMatrix();

    // init all keys...
    for(var i = 0; i<getNodes(); i++) {
        key[i] = 100000; // to represent infinite...
        mstSet[i] = false; // initially it is not included...
    }

    // always include first node in the MST...
    key[0] = 0;
    tree[0] = -1;

    for(var i=0; i<getNodes()-1; i++) {
        var u = minKey(key, mstSet);
        // console.log("\nSelected vertex : "+u);
        // add the picked vertex to the MST...
        mstSet[u] = true;
        // add the picked vertex to selectedNodesInOrder...
        selectedNodesInOrder.push(u);

        // update the key value and parent index 
        // of the adjecent vertices of the picked vertex.
        // Also make sure to consider the vertices 
        // which are not covered.
        for(var v = 0; v < getNodes(); v++) {
            // console.log("Weight : "+weightedGraphMatrix[u][v]+" key : "+key[v]+" index : "+v);
            // console.log(weightedGraphMatrix[u][v] != 0);
            // console.log( mstSet[v] == false);
            // console.log(Number(weightedGraphMatrix[u][v]) < Number(key[v]));
            if(weightedGraphMatrix[u][v] != 0 && mstSet[v] == false && Number(weightedGraphMatrix[u][v]) < Number(key[v])) {
                // console.log("Updating tree");
                tree[v] = u;
                key[v] = weightedGraphMatrix[u][v];
            }
        }
        // console.log("key : \n"+key);
        // console.log("tree : \n"+tree);
    }

    printPrimsMST(tree, weightedGraphMatrix);
    animatePrims();
}

/**
 * This function will print the Prims's MST 
 * and it will take tree and matrix as input
 * @param {*} tree 
 * @param {*} matrix 
 */
function printPrimsMST(tree, matrix) {
    // TODO: Make some animation over here...
    console.log("Edge \tWeight");
    for(var i=1; i<getNodes(); i++) {
        console.log(tree[i] + " - " + i + "\t" + matrix[i][tree[i]]);
    }
}

/**
 * This function will give you the Prim's MST,
 * if the Prim's Algorithm has been applied before.
 * @returns String : for Prim's MST
 */
function getPrimsMstString() {
    PrimsMST = "<h1>Below is the Prim's MST!</h1><br>";
    for(var i=1; i<getNodes(); i++) {
        PrimsMST += "<h3>"+tree[i]+" - "+i+"\t"+weightedGraphMatrix[i][tree[i]]+"</h3><br>";
        selectedEdgesInOrder.push(new WeightedEdge(Nodes[tree[i]],Nodes[i],"*",c));
    }
    return PrimsMST;
}

/**
 * This function returns the selection of nodes
 * for animation simulation purpose.
 * @returns The in-order selection of nodes!
 */
function getSelectedNodes() {
    return selectedNodesInOrder;
}

/**
 * This function will take key and mstSet as list 
 * and it will find the vertex with minimum key value,
 * from the set of vertices that are not included in
 * the MST.
 * @param {*} key 
 * @param {*} mstSet 
 * @returns min_index : The vertex with minimum key
 */
function minKey(key, mstSet) {
    // init. min. values...
    var min = 100000, min_index;

    for(var i=0; i<getNodes(); i++) {
        if(mstSet[i] == false && Number(key[i]) < Number(min)) {
            // console.log("Chnaging min_index : ")
            // console.log("key["+i+"] : "+key[i] + " and min : "+min);
            min = key[i];
            min_index = i;
        }
        // console.log("min : "+min+" min_index : "+min_index);
    }
    // console.log("\nSelected min index : "+min_index);
    return min_index;
}