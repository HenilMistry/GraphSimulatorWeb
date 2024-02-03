// A class for rendering the node for graph on canvas 
class Node {
    constructor(label,x,y,radius,color,context) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.c = context;
    }
    
    draw() {
        this.c.beginPath();
        this.c.font = 'italic 18px Arial';
        this.c.fillStyle = "Black";
        this.c.fillText(this.label,this.x-(this.radius),this.y-(this.radius));
        this.c.arc(this.x,this.y,this.radius,Math.PI*2,false);
        this.c.fillStyle = this.color;
        this.c.fill();
        this.c.closePath();
    }

    update() {
        this.draw();
    }
}