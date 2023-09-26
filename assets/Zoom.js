
const container = document.getElementById('topView');
const content = document.getElementById('content');
const zoomInButton = document.getElementById('zoom-in-button');
const zoomOutButton = document.getElementById('zoom-out-button');
// document.getElementById("zoom-in-button").style.width = "";

let scale = 1.5;
let pre_scale = 1.5;
content.style.left = "-480px";
content.style.top = "-270px";

zoomInButton.addEventListener('click', () => {
    if(scale >= 1.0) {
        zoomOutButton.style.opacity = 1;
        content.style.cursor = "grab";
    }
    scale = Number(scale) + 0.2;
    console.log(scale);
    applyTransform();
});

zoomOutButton.addEventListener('click', () => {
    if(scale <= 1.000000001) {
        zoomOutButton.style.opacity = 0.7;
        content.style.cursor = "default";
        return ;
    }
    scale -= 0.2;
    applyTransform();
});
function applyTransform() {
    console.log(scale);
    if(scale <= 1.0) scale = 1.0;
    content.style.transform = `scale(${scale})`;
    let cur_left = '';
    let cur_top = '';
    
    for(let i = 0 ; i < content.style.left.length; i++) {
        if(content.style.left[i] === 'p' || content.style.left[i] === 'x') break;
        cur_left += content.style.left[i];
    }
    for(let i = 0 ; i < content.style.top.length; i++) {
        if(content.style.top[i] === 'p' || content.style.top[i] === 'x') break;
        cur_top += content.style.top[i];
    }

    let nxt_left = Number(cur_left) - (scale - pre_scale) * window.innerWidth * 0.5;
    let nxt_top = Number(cur_top) - (scale - pre_scale) * window.innerHeight * 0.5;
    pre_scale = scale;
    let flag = 0;
    
    if(Number(nxt_left) <= -(scale - 1.0) * window.innerWidth) {
        content.style.left = -(scale - 1.0) * window.innerWidth + "px"; flag = 1;
    }
    if(Number(nxt_left) >= 0) {
        content.style.left = "0px"; flag = 1;
    }
    if(Number(nxt_top) <= -(scale - 1.0) * window.innerHeight) { 
        content.style.top = -(scale - 1.0) * window.innerHeight + "px"; flag = 1;
    }
    if(Number(nxt_top) >= 0) {
        content.style.top = "0px"; flag = 1;
    }

    if(flag === 0) {
        content.style.left = nxt_left + "px";
        content.style.top = nxt_top + "px";
    }
    
    console.log(content.style.left);
}

let offset = [0,0];
let dragPosition = [0,0];
let isDown = false;

content.addEventListener('mousedown', function(e) {
isDown = true;
offset = [
    content.offsetLeft - e.clientX,
    content.offsetTop - e.clientY
];
dragPosition = [e.clientX, e.clientY];

}, true);

document.addEventListener('mouseup', function() {
   isDown = false;
   content.style.cursor = "grab";
}, true);

document.addEventListener('mousemove', function(e) {
    event.preventDefault();
    if (isDown) {
        content.style.cursor = "grabbing";
        let cur_left = '';
        let cur_top = '';
        
        for(let i = 0 ; i < content.style.left.length; i++) {
            if(content.style.left[i] === 'p' || content.style.left[i] === 'x') break;
            cur_left += content.style.left[i];
        }
        for(let i = 0 ; i < content.style.top.length; i++) {
            if(content.style.top[i] === 'p' || content.style.top[i] === 'x') break;
            cur_top += content.style.top[i];
        }

        if((e.clientX + offset[0]) > 0 || (e.clientX + offset[0]) < -1 * window.innerWidth * (scale - 1)) {
            offset = [
                content.offsetLeft - e.clientX,
                content.offsetTop - e.clientY
            ];
            return;
        }
        content.style.left = (e.clientX + offset[0]) + 'px';
        if((e.clientY + offset[1]) > 0 || (e.clientY + offset[1]) < -1 * window.innerHeight * (scale - 1)) {
            offset = [
                content.offsetLeft - e.clientX,
                content.offsetTop - e.clientY
            ];
            return;
        }
        content.style.top  = (e.clientY + offset[1]) + 'px';

        console.log(Number(cur_left));
        console.log(dragPosition[0] - e.clientX);
        console.log(" ");
   }
}, true);

function scaleset() {
    let initalScale_value = document.getElementById("initalScale").value;
    if(initalScale_value > 5) {
        alert("拡大できる最大サイズは10倍です。 もう一度入力してください。");
        return;
    }
    scale = initalScale_value;
    zoomOutButton.style.opacity = 1;
    content.style.cursor = "grab";

    if(scale < 1) {
        zoomOutButton.style.opacity = 0.7;
        content.style.cursor = "default";
    }

    if(scale >= 1) {
        zoomOutButton.style.opacity = 1;
        content.style.cursor = "grab";
        content.style.transform = `scale(${initalScale_value})`;
    }
    if(scale == 1) {
        content.style.cursor = "default";
    }
}


// =======================Pinch==========================

let previousDistance = 0;

// Add event listener for the touchstart event
content.addEventListener('touchstart', (event) => {
  // Prevent default touch behavior
  event.preventDefault();

  // Check if there are exactly two touches
  if (event.touches.length === 2) {
    // Calculate the initial distance between the two touches
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    previousDistance = distance;
  }
});

// Add event listener for the touchmove event
content.addEventListener('touchmove', (event) => {
  // Prevent default touch behavior
  event.preventDefault();

  // Check if there are exactly two touches
  if (event.touches.length === 2) {
    // Calculate the current distance between the two touches
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

    // Calculate the scale factor based on the change in distance
    const scaleFactor = distance / previousDistance;

    // Update the zoom scale based on the scale factor
    const newScale = scale * scaleFactor;

    // Apply the zoom scale to the element
    content.style.transform = `scale(${newScale})`;

    // Update the previous distance for the next touchmove event
    previousDistance = distance;
  }
});

// Add event listener for the touchend event
content.addEventListener('touchend', () => {
  // Update the initial scale for the next touchstart event
  scale *= scaleFactor;
});