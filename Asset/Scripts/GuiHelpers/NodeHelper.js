// A class for rendering the node for graph on canvas 
class Node {
    constructor(x,y,radius,color,context) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.c = context;
    }
    
    draw() {
        this.c.beginPath();
        this.c.arc(this.x,this.y,this.radius,Math.PI*2,false);
        this.c.fillStyle = this.color;
        this.c.fill();
        this.c.closePath();
    }

    update() {
        this.draw();
    }
}