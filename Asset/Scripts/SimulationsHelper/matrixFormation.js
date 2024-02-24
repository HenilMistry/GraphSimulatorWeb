/**
 * This script contains the information about how to create and show matrix 
 * Created some of the functions that will help into that.
 */

// get the nodes from the node list
var nodes = Nodes.length; // From main.js script

// getting the modal...
const bModel = new bootstrap.Modal('#matModal');
const matModelBody = document.getElementById('matModalBody');
let final_string = "";

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
        final_string = "";
        final_string = "<h1>Matrix for a graph:</h1>"
        final_string += "<table class='table table-hover table-striped table-primary'>";
        final_string += "<thead><tr><th scope='col'>#</th>";

        // for making table header...
        for(var i=0; i<matrix.length; i++) {
            final_string += "<th scope='col'> Node "+i+"</th>";
        }
        final_string += "</tr></thead><tbody>";

        // show it in form of table...
        for(var i=0; i<matrix.length; i++) {
            final_string += "<tr><th scope='row'> Node "+i+"</th>";
            for(var j=0; j<matrix[i].length; j++) {
                final_string += "<td>"+matrix[i][j]+"</td>";
            }
            final_string += "</tr>";
        }
        final_string += "</tbody></table>";

        final_string += "<br><h1>Matrix for wighted graph:</h1>";
        final_string += "<table class='table table-hover table-striped table-primary'>";
        final_string += "<thead><tr><th scope='col'>#</th>";
        matrix = getWeMatrix();
        // for making table header...
        for(var i=0; i<matrix.length; i++) {
            final_string += "<th scope='col'> Node "+i+"</th>";
        }
        final_string += "</tr></thead><tbody>";

        // show it in form of table...
        for(var i=0; i<matrix.length; i++) {
            final_string += "<tr><th scope='row'> Node "+i+"</th>";
            for(var j=0; j<matrix[i].length; j++) {
                final_string += "<td>"+matrix[i][j]+"</td>";
            }
            final_string += "</tr>";
        }
        final_string += "</tbody></table>";
        matModelBody.innerHTML = final_string;
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

/**
 * This function will returns the matrix form of the graph!
 * This will consider all weighted edges.
 * @returns matrix of Directed Graph
 */
function getWeMatrix() {
    // console lines are just for debugging... 
    var matrix = [];
    // init matrix...
    for(var i=0; i<getNodes(); i++) {
        var temp_row = [];
        for(var j=0; j<nodes; j++) {
            temp_row[j] = '0';
        }
        matrix[i] = temp_row;
    }
    console.log(matrix);

    // forming the matix 
    WeEdges.forEach((edge) => {
        matrix[edge.a.label][edge.b.label] = edge.weight;
        matrix[edge.b.label][edge.a.label] = edge.weight;
    });
    console.log(matrix);

    return matrix;
}