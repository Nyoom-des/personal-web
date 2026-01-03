// Star Animation
function createStars() {
    const containers = document.querySelectorAll('.stars-container');
    
    containers.forEach(container => {
        for (let i = 0; i < 20; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            
            // Randomize position and animation
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

moveNeonOrbs();

setInterval(moveNeonOrbs, 8000);

const audio = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const disk = document.getElementById('musicDisk');
const smallDisk = document.getElementById('smallDisk');
const controller = document.getElementById('musicController');
const playlist = [
    {
        title: "Sea Wishes",
        src: "./assets/audios/SeaWishes.mp3"
    },
    {
        title: "Ad Astra",
        src: "./assets/audios/AdAstra.mp3"
    },
    {
        title: "Visage",
        src: "./assets/audios/Visage.mp3"
    }
];

let currentTrackIndex = 0;
const musicTitle = document.querySelector('.music-title');

// Load Track Function
function loadTrack(index) {
    currentTrackIndex = index;
    audio.src = playlist[currentTrackIndex].src;
    musicTitle.innerText = playlist[currentTrackIndex].title;
}

// Music Player Next Track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    updateUI(true);
}

// Music Player Previous Track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
    updateUI(true);
}

// Toggle Play UI
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

// Toggle Play Function
function togglePlay() {
    if (audio.paused) {
        audio.play();
        updateUI(true);
    } else {
        audio.pause();
        updateUI(false);
    }
}

// Continue Track
audio.addEventListener('ended', nextTrack);

// Music & Disk Start
function startAudio() {
    audio.play().then(() => {
        disk.style.animationPlayState = "running";
        smallDisk.style.animationPlayState = "running";
        playIcon.innerText = "⏸";
    }).catch(error => {
        console.log("Autoplay dicegah oleh browser, menunggu interaksi pengguna.");
    });
}

// Minimize Music Player
function minimizeToggle() {
    controller.classList.toggle('is-minimized');
}

// Autoplay Function
document.addEventListener('click', function() {
    if (audio.paused && !audio.ended) {
        audio.play();
        audio.volume = 0.5;
        disk.style.animationPlayState = "running";
        smallDisk.style.animationPlayState = "running";
    }
}, { once: true });

window.addEventListener('load', () => {
    audio.volume = 0.5;
    startAudio();
});

['click', 'scroll', 'touchstart', 'mousemove'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (audio.paused) {
            startAudio();
        }
    }, { once: true });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    createStars();
});