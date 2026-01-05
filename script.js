// Star Animation
function createStars() {
    const containers = document.querySelectorAll('.stars-container');
    
    containers.forEach(container => {
        for (let i = 0; i < 20; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            
            let size = Math.random() * 3 + 'px';
            star.style.width = size;
            star.style.height = size;
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 5 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            container.appendChild(star);
        }
    });
}

// Neon Orbs Animation
function moveNeonOrbs() {
    const orbs = document.querySelectorAll('.neon-orb');
    orbs.forEach(orb => {
        const randomX = Math.floor(Math.random() * 90);
        const randomY = Math.floor(Math.random() * 90);
        orb.style.left = randomX + '%';
        orb.style.top = randomY + '%';
    });
}

const audio = document.getElementById('bgMusic');
const playIcon = document.getElementById('playIcon');
const disk = document.getElementById('musicDisk');
const smallDisk = document.getElementById('smallDisk');
const controller = document.getElementById('musicController');
const musicTitle = document.querySelector('.music-title');

const playlist = [
    { title: "Sea Wishes", src: "./assets/audios/SeaWishes.mp3" },
    { title: "Ad Astra", src: "./assets/audios/AdAstra.mp3" },
    { title: "Visage", src: "./assets/audios/Visage.mp3" }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    currentTrackIndex = index;
    audio.src = playlist[currentTrackIndex].src;
    musicTitle.innerText = playlist[currentTrackIndex].title;
    audio.load();
}

function updateUI(isPlaying) {
    if (isPlaying) {
        playIcon.innerText = "⏸";
        disk.style.animationPlayState = "running";
        smallDisk.style.animationPlayState = "running";
    } else {
        playIcon.innerText = "▶";
        disk.style.animationPlayState = "paused";
        smallDisk.style.animationPlayState = "paused";
    }
}

function togglePlay() {
    if (audio.paused) {
        startAudio();
    } else {
        audio.pause();
        updateUI(false);
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    startAudio();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    startAudio();
}

// Audio Start Function //
function startAudio() {
    audio.volume = 0.5;
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            updateUI(true);
        }).catch(error => {
            console.log("Autoplay ditahan browser. Menunggu interaksi pengguna.");
            updateUI(false);
        });
    }
}

function minimizeToggle() {
    controller.classList.toggle('is-minimized');
}

// Event Listeners //
audio.addEventListener('ended', nextTrack);

// Audio Interaction //
const triggerEvents = ['click', 'scroll', 'touchstart', 'mousemove'];
triggerEvents.forEach(evt => {
    document.addEventListener(evt, () => {
        if (audio.paused) {
            startAudio();
        }
    }, { once: true });
});

window.addEventListener('load', () => {
    createStars();
    moveNeonOrbs();
    setInterval(moveNeonOrbs, 8000);
    startAudio(); 
});