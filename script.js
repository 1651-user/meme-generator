let dragging = null;
let topTextPos = { x: 0, y: 40 };
let bottomTextPos = { x: 0, y: 200 };
let currentImage = null;

function generateMeme() {
    const imageInput = document.getElementById("imageInput");
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                currentImage = img;
                canvas.width = img.width / 2;
                canvas.height = img.height / 2;

                // Center text positions
                topTextPos.x = canvas.width / 2;
                bottomTextPos.x = canvas.width / 2;

                drawMeme(topText, bottomText);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
}

function drawMeme(topText, bottomText) {
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "30px Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.fillText(topText, topTextPos.x, topTextPos.y);
    ctx.strokeText(topText, topTextPos.x, topTextPos.y);
    ctx.fillText(bottomText, bottomTextPos.x, bottomTextPos.y);
    ctx.strokeText(bottomText, bottomTextPos.x, bottomTextPos.y);
}

// Drag behavior
const canvas = document.getElementById("memeCanvas");

canvas.addEventListener("mousedown", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;

    const nearTop = Math.abs(y - topTextPos.y) < 30;
    const nearBottom = Math.abs(y - bottomTextPos.y) < 30;

    if (nearTop) dragging = "top";
    else if (nearBottom) dragging = "bottom";
});

canvas.addEventListener("mousemove", function (e) {
    if (dragging) {
        const x = e.offsetX;
        const y = e.offsetY;
        if (dragging === "top") {
            topTextPos.x = x;
            topTextPos.y = y;
        } else {
            bottomTextPos.x = x;
            bottomTextPos.y = y;
        }

        const topText = document.getElementById("topText").value;
        const bottomText = document.getElementById("bottomText").value;
        drawMeme(topText, bottomText);
    }
});

canvas.addEventListener("mouseup", function () {
    dragging = null;
});
