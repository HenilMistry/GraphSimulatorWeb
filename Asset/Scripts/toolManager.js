// Enum Type, That contins the list of all avilable tools
const Tools = Object.freeze({
    NODE : "Node",
    UndirectedEdge : "UdEdge"
});

// A variable to keep track of active, slected tool 
ActiveTool = null;
// A variable, that is HTML Element, that is contianing information text 
const label_info = document.getElementById("label_info");

// A function to select the toolbar, which will update the ActiveTool avariable
function selectTool(name) {
    switch(name) {
        case Tools.NODE:
            ActiveTool=Tools.NODE;
            label_info.innerHTML = "Selected Node Tool : Now, click anywhere on canvas to add node!";
            break;
        
        case Tools.UndirectedEdge:
            ActiveTool=Tools.UndirectedEdge;
            label_info.innerHTML = "Selected Undirected Edge : Now, click on any two nodes subsequently to add an edge!";
            break;
        
        default:
            ActiveTool = null;
            label_info.innerHTML = "Select some tool to start making Graph!";
            alert("Some Error Occured While Selecting The Tool!");
            break;
    }
}