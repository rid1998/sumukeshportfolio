let xyCoordinates = new Array;
let iter = 0;
let shapes = new Array;
var start = true;
let selectRandomShape;
var interval;
var canvas = document.getElementById("canvas");
var ctx;


function storeXYCoords(canvas, e) {
    canvas = document.getElementById("canvas");
    let border = canvas.getBoundingClientRect();
    var x = e.clientX - border.left;
    var y = e.clientY - border.top;

    if(iter < 5) {
        xyCoordinates[iter] = [x,y];
        iter++;
    }
    console.log(xyCoordinates, iter);
}

function startGame() {
    var canvas = document.getElementById("canvas");
    let errMessage = document.getElementById('error-message');
   
    if(iter < 5){
        errMessage.style.padding = "10px";
        errMessage.style.display = "block";
        errMessage.style.background = "red"; 
        errMessage.innerHTML = "Please click on more" + (5 - iter) + " Points";  
    } else { 
        errMessage.style.display = 'none'
        interval = setInterval(
        function () {
            if (start) {
                createShape();
            }
        }, 1000);}
}

function stopGame() {
    xyCoordinates = [];
    clearInterval(interval)
    location.reload();
}
 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function createShape() {
    start = false;
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i=5; i<=20; i++) {
        await sleep(500)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle(xyCoordinates[0][0], xyCoordinates[0][1], i*2);
        drawRectangle(xyCoordinates[1][0], xyCoordinates[1][1], i*2, i*4);
        drawSquare(xyCoordinates[2][0], xyCoordinates[2][1], i*3);
        drawTriangle(xyCoordinates[3][0], xyCoordinates[3][1], i*3, i*2);
        drawSemicircle(xyCoordinates[4][0], xyCoordinates[4][1], i*3);
        await sleep(500)
    }
    start = true;
}

function drawRectangle(x,y,l,w) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(x, y, l, w);
    ctx.fillStyle = 'cyan';
    ctx.fill();
    ctx.stroke();
}

function drawCircle(x,y,rad) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.strokeStyle = 'black'
    ctx.arc(x,y,rad, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
}

function drawSquare(x,y,l) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(x, y, l, l);
    ctx.fillStyle = 'purple';
    ctx.fill();
    ctx.stroke();
}
    

function drawTriangle(x,y,l,w) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d')
    ctx.beginPath()
     ctx.moveTo(x, y)
     ctx.lineTo(x+l, y)
     ctx.lineTo(x+l, y+w)
     ctx.closePath();
     ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();    
}

function drawSemicircle(x,y,rad) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d')
    ctx.beginPath();
    ctx.arc(x,y,rad, 0, Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.strokeStyle = 'yellow'
    ctx.stroke();
}
