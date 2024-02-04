/**
 * This script contains the information about how to create and show matrix 
 * Created some of the functions that will help into that.
 */

// get the nodes from the node list
var nodes = Nodes.length; // From main.js script

// getting the modal...
const bModel = new bootstrap.Modal('#matModal');
const matModelBody = document.getElementById('matModalBody');

/**
 * This function will form the matrix,
 * According to present nodes and edges.
 */
function formMatrix() {
    // check for availability of nodes...
    if(getNodes() == 0) {
        alert("There are no nodes on the canvas!");
    } else { // generate the marix in form of table..    
        let matrix = getUdMatrix();
        // clear previous result..
        matModelBody.innerHTML = "";
        // show it in form of table...
        for(var i=0; i<matrix.length; i++) {
            for(var j=0; j<matrix[i].length; j++) {
                matModelBody.innerHTML += matrix[i][j]+"\t";
            }
            matModelBody.innerHTML += "<br>";
        }
        bModel.show();
    }
}

/**
 * It will just help me close the matrix modal!
 */
function closeMatModal() {
    bModel.hide();
}

/**
 * This function will return the total nodes that are there
 * on the canvas...
 * @returns The total nodes on the canvas
 */
function getNodes() {
    nodes = Nodes.length;
    return nodes;
}

/**
 * This function will returns the matrix form of the graph!
 * @returns matrix of Undirectd Graph
 */
function getUdMatrix() {
    // The console lines are just for debugging... 
    let matrix = [];
    // init matrix...
    for(var i=0; i<nodes; i++) {
        let temp_row = [];
        for(var j=0; j<nodes; j++) {
            temp_row[j] = '0';
        }
        matrix[i] = temp_row;
    }
    // console.log(matrix);

    // forming the matrix...
    // forming for undirected graph..
    UdEdges.forEach((edge) => {
        matrix[edge.a.label][edge.b.label] = '1';
        matrix[edge.b.label][edge.a.label] = '1';
    });
    // console.log(matrix);
    return matrix;
}