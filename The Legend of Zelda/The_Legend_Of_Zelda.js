function setupAudioToggle(playButtonId, audioId) {
    const playButton = document.getElementById(playButtonId);
    const audio = document.getElementById(audioId);
    const allAudioElements = document.querySelectorAll('audio');

    playButton.addEventListener('click', () => {
        if (!audio.paused) {
            audio.pause();
        } else {
            allAudioElements.forEach((otherAudio) => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
            audio.play();
        }
    });
}

function logo(){
    const image = document.getElementById('playSFX');
            const audio = document.getElementById('logoSFX');
            image.addEventListener('click', () => {
                audio.currentTime = 0;
                audio.play();
            });
}

function logonin(){
    const ninimage = document.getElementById('playnin');
            const ninaudio = document.getElementById('logonin');
            ninimage.addEventListener('click', () => {
                ninaudio.currentTime = 0;
                ninaudio.play();
            });
}

function observ(elementId) {
    const textElement = document.getElementById(elementId);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textElement.classList.add('visible');
            } else {
                textElement.classList.remove('visible');
            }
        });
    });

    observer.observe(textElement);
}

function trailers() {
    const images = document.querySelectorAll('.games img');
    const textDisplay = document.getElementById('text-display');
 
    images.forEach(image => {
        image.addEventListener('click', () => {
            const videoUrl = image.getAttribute('data-video-url');
            const videoId = extractVideoId(videoUrl);
            
            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.width = '560';
                iframe.height = '315';
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                textDisplay.innerHTML = '';
                textDisplay.appendChild(iframe);
                textDisplay.style.display = 'block';
            } else {
                alert('Invalid YouTube URL.');
            }
        });
    });
}
function extractVideoId(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}
