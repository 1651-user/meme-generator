function generateMeme() {
    const imageInput = document.getElementById("imageInput");
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
   
    const memeGallery = document.getElementById("memeGallery");
    const memeImage = new Image();
    memeImage.src = canvas.toDataURL("image/png");
    memeImage.className = "meme-preview";
    memeGallery.appendChild(memeImage);


    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                canvas.width = img.width / 2;
                canvas.height = img.height / 2;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                ctx.font = "30px Impact";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.textAlign = "center";

                ctx.fillText(topText, canvas.width / 2, 40);
                ctx.strokeText(topText, canvas.width / 2, 40);
                ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
                ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
}

 function downloadMeme() {
    const canvas = document.getElementById("memeCanvas");
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

