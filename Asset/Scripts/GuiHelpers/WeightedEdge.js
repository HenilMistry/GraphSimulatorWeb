// This file should be included after NodeHelper and EdgeHelper
// This is helpful to render an Weighted Edge on canvas 
class WeightedEdge extends EdgeHelper {
    constructor(nodeA, nodeB, weight,context) {
        super(nodeA,nodeB,context);
        this.weight = weight;
    }

    draw() {
        let x = (this.a.x+this.b.x)/2;
        let y = (this.a.y+this.b.y)/2;
        super.draw();
        this.c.beginPath();
        this.c.fillStyle = "Green";
        this.c.fillRect(x-15,y-15,30,30);
        this.c.fill();
        this.c.fillStyle = "Yellow";
        this.c.fillText(this.weight,x-15,y);
        this.c.closePath();
    }

    update() {
        this.draw();
    }
}