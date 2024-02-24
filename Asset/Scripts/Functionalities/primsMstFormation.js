/**
 * This script will deal with the generation of prim's MST without
 * the showing animtion, just it will showcase the final answer!
 */

// from matrixFormation.js script
final_string = "";

function formPrimsMST() {
    // apply prim's algo but do not start animation...
    applyPrims(false);
    final_string = getPrimsMstString();
    // pass it to modal's body...
    matModelBody.innerHTML = final_string;
    // show the modal...
    bModel.show();
}