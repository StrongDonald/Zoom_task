
const container = document.getElementById('topView');
const content = document.getElementById('content');
const zoomInButton = document.getElementById('zoom-in-button');
const zoomOutButton = document.getElementById('zoom-out-button');

let scale = 1;

zoomInButton.addEventListener('click', () => {
    if(scale >= 1.0) {
        zoomOutButton.style.opacity = 1;
        content.style.cursor = "grab";
    }
    scale = Number(scale) + 0.1;
    console.log(scale);
    applyTransform();
});

zoomOutButton.addEventListener('click', () => {
    if(scale <= 1.000000001) {
        zoomOutButton.style.opacity = 0.7;
        content.style.cursor = "default";
        return ;
    }
    scale -= 0.1;
    applyTransform();
});

let lastTouchDistance = 0;

// container.addEventListener('touchstart', (event) => {
//   if (event.touches.length === 2) {
//     lastTouchDistance = calculateTouchDistance(event.touches);
//   }
// });

// container.addEventListener('touchmove', (event) => {
//   if (event.touches.length === 2) {
//     const touchDistance = calculateTouchDistance(event.touches);
//     const delta = touchDistance - lastTouchDistance;

//     scale += delta * 0.01;
//     applyTransform();

//     lastTouchDistance = touchDistance;
//   }
// });

function calculateTouchDistance(touches) {
    const [touch1, touch2] = touches;
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function applyTransform() {
    content.style.transform = `scale(${scale})`;
}

// let dragElement;

// function handleDragging(event) {
//     console.log("OK");
//     content.style.cursor = "grabbing";
//     dragElement = event.target;
//     event.dataTransfer.effectAllowed = "grab";
//     let deltaX = event.movementX;
//     let deltaY = event.movementY;
//     let rect = content.getBoundingClientRect();
//     content.style.left = rect.x + deltaX + 'px';
//     content.style.top  = rect.x + deltaY + 'px';
// }

var offset = [0,0];
var isDown = false;

content.addEventListener('mousedown', function(e) {
isDown = true;
offset = [
    content.offsetLeft - e.clientX,
    content.offsetTop - e.clientY
 ];
}, true);

document.addEventListener('mouseup', function() {
   isDown = false;
   content.style.cursor = "grab";
}, true);

document.addEventListener('mousemove', function(e) {
    event.preventDefault();
    if (isDown) {
        content.style.cursor = "grabbing";
        console.log(content.offsetTop);

        console.log(" ");
        content.style.left = (e.clientX + offset[0]) + 'px';
        content.style.top  = (e.clientY + offset[1]) + 'px';

        console.log(e.clientX);
        console.log(e.clientY);
   }
}, true);

function scaleset() {
    let initalScale_value = document.getElementById("initalScale").value;
    if(initalScale_value > 10) {
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
