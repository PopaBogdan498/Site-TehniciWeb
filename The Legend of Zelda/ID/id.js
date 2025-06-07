function volume()
{
    const music = document.getElementById('background-music');
    const volumeControl = document.getElementById('volume-control');
    music.volume = volumeControl.value;
    volumeControl.addEventListener('input', (event) => {
        music.volume = event.target.value;
    });
}

function age()
{
    const slider = document.getElementById('age');
        const sliderValue = document.getElementById('slider-value');
        slider.addEventListener('input', () => {
            sliderValue.textContent = slider.value;
        });
}

function submit() {
    const submitBox = document.getElementById('submit');
    const canvas = document.getElementById('canvas');
    
    submitBox.addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas-image.png';
        link.click();
    });
}


function id() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const inputs = document.querySelectorAll('.form-input');
    const imageInput = document.getElementById('avatar'); 

    let loadedImage = null; 

    function updateCanvas() {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = '20px Comic Sans MS';
        ctx.fillStyle = 'blue';
    
        inputs.forEach((input, index) => {
            if (input.type !== 'file') {
                const text = input.value;
                const yPosition = 70 + index * 30;
                const xPosition = 200;
                ctx.fillText(text, xPosition, yPosition);
            }
        });
    
        if (loadedImage) {
            const targetWidth = 150;
            const targetHeight = 150;
    
            const originalWidth = loadedImage.width;
            const originalHeight = loadedImage.height;
    
            const widthRatio = targetWidth / originalWidth;
            const heightRatio = targetHeight / originalHeight;
            const scale = Math.max(widthRatio, heightRatio); 

            const resizedWidth = originalWidth * scale;
            const resizedHeight = originalHeight * scale;
    
            const cropX = (resizedWidth - targetWidth) / 2;
            const cropY = (resizedHeight - targetHeight) / 2;
    
            ctx.drawImage(
                loadedImage,
                cropX / scale, cropY / scale, targetWidth / scale, targetHeight / scale, 
                10, 50, targetWidth, targetHeight                                     
            );
        }
    }
    
    inputs.forEach(input => {
        input.addEventListener('input', updateCanvas);
    });
    
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                loadedImage = new Image();
                loadedImage.onload = updateCanvas;
                loadedImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    

    updateCanvas();
}
