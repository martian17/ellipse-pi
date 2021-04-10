var canvas = document.getElementById("canvas");
var width = 500;
var height = 200;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");


var dist = function(a,b){
    return Math.sqrt(a*a+b*b);
};



var points = [];
//place points along the edge
for(var i = 1; i < width; i+=1){
    points.push({
        x:i,
        y:0
    });
}

for(var i = 1; i < height; i+=1){
    points.push({
        x:width,
        y:i
    });
}

for(var i = width-1; i > 0; i-=1){
    points.push({
        x:i,
        y:height
    });
}

for(var i = height-1; i > 0; i-=1){
    points.push({
        x:0,
        y:i
    });
}

for(var i = 0; i < points.length; i++){
    var point = points[i];
    vx = 250-point.x;
    vy = 100-point.y;//to the center
    var dd = dist(vx,vy);
    point.vx = vx/dd;
    point.vy = vy/dd;
}



var ax = 150;
var ay = 100;
var bx = 350;
var by = 100;
//var rr = 197;
var rr = 230;

var draw = function(){
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    for(var i = 0; i < points.length; i++){
        var point = points[i];
        ctx.lineTo(point.x,point.y);
    }
    ctx.closePath();
    ctx.strokeStyle = "#f00";
    ctx.stroke();
};

var step = function(){
    for(var i = 0; i < points.length; i++){
        var point = points[i];
        var x = point.x;
        var y = point.y;
        var r = dist(x-ax,y-ay)+dist(x-bx,y-by);
        var dr = r-rr;
        point.x += dr*point.vx/10;
        point.y += dr*point.vy/10;
    }
};

var calculateArea = function(){
    var area = 0;
    for(var i = 0; i < points.length; i++){
        var p1 = points[i];
        var p2 = points[(i+1)%points.length];
        area += p1.x*p2.y-p2.x*p1.y;
    }
    return Math.abs(area/2);
};

var radiuses = function(){
    var rmax = 0;
    var rmin = Infinity;
    for(var i = 0; i < points.length; i++){
        var p = points[i];
        var rrr = dist(250-p.x,100-p.y);
        if(rrr > rmax)rmax = rrr;
        if(rrr < rmin)rmin = rrr;
    }
    return [rmin,rmax];
};




var start = 0;
var animate = function(t){
    if(start === 0)start = t;
    var dt = (t - start)/1000;//now things are in seconds, not in milliseconds
    start = t;
    draw();
    step();
    var area = calculateArea();
    var [a,b] = radiuses();
    var pi = area/a/b;
    
    ctx.font = "30px Serif";
    ctx.fillStyle = "#000";
    ctx.fillText("π="+pi,10,30);
    
    requestAnimationFrame(animate);
};

requestAnimationFrame(animate);



