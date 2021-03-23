const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);



// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 10;
// ctx.beginPath();
// ctx.arc(100,100,50,0, Math.PI *2);
// ctx.stroke();
// ctx.fill();
// console.log(ctx);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(10,20,150,50);
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
});

// canvas.addEventListener('mousemove', function(){
//     mouse.x = event.x;
//     mouse.y = event.y;
//     drawCircle();
// })

function drawCircle(){
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,50,0,Math.PI *2);
    ctx.fill();
}

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        
    }
}

function animate(){
    // ctx.clearRect(0,0, canvas.width, canvas.height);
    // drawCircle();
    requestAnimationFrame(animate);
}
// animate();
setupCanvas();


//idea for fill-screen draw game 
//when the screen is 100% a different color, you win!

// function game(){
//     animate();
//     ctx.fillStyle = 'rgba(100,255,150,255)';
//     ctx.font = '20px Helvetica';
//     ctx.fillText('Paint until the screen is a different color! Be Thorough!', 0, 30);
// }
// game();


    ctx.fillStyle = 'rgba(100,255,150,255)';
    ctx.font = '20px Helvetica';
    ctx.fillText('Paint until the screen is a different color! Be Thorough!', 0, 30);


    var mousedown = false;
    var oldx = null;
    var oldy = null;
    var pixels = null;
    var letterpixels = null;
    
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split('');
    var randomSingleLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    var randomLetter = randomSingleLetter.toString();
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var randomDrawingColor = Math.floor(Math.random()*16777215).toString(16);

    function setupCanvas() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        ctx.lineWidth = 30;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgb(0, 0, 50)';
        ctx.font = 'bold 300px helvetica';
        ctx.fillStyle = '#'+ randomColor;
        ctx.textBaseline = 'middle';
        drawletter(randomLetter);
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        letterpixels = getpixelamount('#'+ randomColor);
      }

     
      function drawletter(letter) {
        var centerX = (canvas.width - ctx.measureText(letter).width) / 2;
        var centerY = canvas.height / 2;
        ctx.fillText(letter, centerX, centerY);
      };
    
      function showerror(error) {
        mousedown = false;
        alert(error);
      };
    function paint(x, y) {
        var colour = getpixelcolour(x, y);
        if (colour.a === 0) {
          showerror('You Rebel, You! Paint inside the lines, Fool!');
        } else {
          ctx.beginPath();
          if ((oldx > 0 && oldy > 0) &&
              (Math.abs(oldx - x) < ctx.lineWidth / 2 && Math.abs(oldy - y) < ctx.lineWidth / 2)) {
            ctx.moveTo(oldx, oldy);
          }
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.closePath();
          oldx = x;
          oldy = y;
        }
      };
/*
  getpixelcolour(x, y)
  returns the rgba value of the pixel at position x and y
*/
function getpixelcolour(x, y) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var index = ((y * (pixels.width * 4)) + (x * 4));
    return {
      r: pixels.data[index],
      g: pixels.data[index + 1],
      b: pixels.data[index + 2],
      a: pixels.data[index + 3]
    };
  }
  
  /*
    getpixelamount(r, g, b)
    returns the amount of pixels in the canvas of the colour
    provided
  */
  function getpixelamount(r, g, b) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var all = pixels.data.length;
    var amount = 0;
    for (i = 0; i < all; i += 4) {
      if (pixels.data[i] === r &&
          pixels.data[i + 1] === g &&
          pixels.data[i + 2] === b) {
        amount++;
      }
    }
    return amount;
  }
  function pixelthreshold() {
    if (getpixelamount(0, 0, 50) / letterpixels > 0.35) {
     alert('You Got It! Click OK to Restart~~!');
     canvas.addEventListener('click', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        location.reload();
     })
    }
  };


  function onmousedown(ev) {
    mousedown = true;
    ev.preventDefault();
  };
  function onmouseup(ev) {
    mousedown = false;
    pixelthreshold();
    ev.preventDefault();
  };
  function onmousemove(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    if (mousedown) {
      paint(x, y);
    }
  };
  canvas.addEventListener('mousedown', onmousedown, false);
  canvas.addEventListener('mouseup', onmouseup, false);
  canvas.addEventListener('mousemove', onmousemove, false);

  setupCanvas();

