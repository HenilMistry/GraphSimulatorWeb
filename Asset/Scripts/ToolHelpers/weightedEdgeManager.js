/**
 * This script contains the information about how to manage weighted edge tool 
 */

// getting the modal...
const weModal = new bootstrap.Modal('#weightModal');
// getting the value from weight field 
const edgeWeightField = document.getElementById("edge-weight");
let edgeWeightRegex = "/\b\d*\b/";

/**
 * This function will check for valid edge weight and 
 * it will close the modal accordingly.
 */
function closeWeightModal() {
    if(edgeWeightField.value==null || edgeWeightField.value=="") {
        if(confirm("Are you sure you don't want to edge weight? Default Weight=1!") == true) {
            WeEdges.push(new WeightedEdge(firstNode,secondNode,1,c));
            firstNode = null;
            secondNode = null;
            weModal.hide();    
        }
    } else {
        if(!checkForWeightValue()) {
            alert("Please enter valid value for edge weight!");
        } else {
            WeEdges.push(new WeightedEdge(firstNode,secondNode,edgeWeightField.value,c));
            firstNode = null;
            secondNode = null;
            weModal.hide();
        }
    }
}

/**
 * This function will open the dialog box for
 * entering edge weight, from user input.
 */
function openWeightedModal() {
    weModal.show();
}

/**
 * This function will check that whether the edge weight is coirrectly
 * enteretd or not!
 * @returns Boolean
 */
function checkForWeightValue() {
    if(edgeWeightField.value=="") {
        return false;
    } else {
        return !isNaN(edgeWeightField.value);
    }
}
