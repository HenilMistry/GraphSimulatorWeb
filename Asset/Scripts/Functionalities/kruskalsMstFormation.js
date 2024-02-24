/**
 * This script will deal with the formation of kruskal's MST
 * without showing the animtion, it wll just populate the answer!
 */

// from matrixFormation.js script
final_string = "";

function formKruskalsMST() {
    // apply prim's algo but do not start animation...
    applyKruskals(false);
    final_string = getKruskalsMstString();
    // pass it to modal's body...
    matModelBody.innerHTML = final_string;
    // show the modal...
    bModel.show();
}