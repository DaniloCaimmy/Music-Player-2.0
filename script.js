let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlicon = document.getElementById("ctrlicon");
let currentSongIndex = 0;
let currentTimeElem = document.getElementById("currentTime");
let totalTimeElem = document.getElementById("totalTime");

song.ontimeupdate = function () {
currentTimeElem.innerText = formatTime(song.currentTime);
totalTimeElem.innerText = formatTime(song.duration);
};




const songs = [
    { title: "Мой мармеладный", artist: "Katya Lel'", image: "imagem/Gatin topzão.jpg", src: "song/Катя Лель - Мой мармеладный (slowed).mp3" },
    { title: "Happy", artist: "Pharrell Williams", image: "imagem/Gato sorrindo.jpg", src: "song/Pharrell Williams - Happy (Video).mp3" },
    { title: "Pagode Russo", artist: "Luis Gonzaga", image: "imagem/Gato Nordestino.jpg", src: "song/Pagode Russo.mp3" },
    { title: "Cheri Cheri Lady", artist: "Modern Talking", image: "imagem/Gato Cherry Lady.jpg", src: "song/Modern Talking - Cheri Cheri Lady (Official Music Video).mp3" }
];


function addCustomSong() {
const fileInput = document.getElementById('fileInput');

if (fileInput.files.length > 0) {
const newSong = {
    title: fileInput.files[0].name.replace('.mp3', ''),
    artist: 'Desconhecido',
    image: 'imagem/Imagem padrão.jpg',  // Substitua pelo caminho real da imagem
    src: URL.createObjectURL(fileInput.files[0])
};

// Adicione a nova música ao array de músicas
songs.push(newSong);

// Atualize a interface com a nova música
currentSongIndex = songs.length - 1;
updateSongInfo();

// Opcional: inicie a nova música automaticamente
playPause();
}
}


function formatTime(seconds) {
const minutes = Math.floor(seconds / 60);
const remainingSeconds = Math.floor(seconds % 60);
return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;}


function updateSongInfo() {
    const currentTitleElem = document.getElementById("current-song-title");
    const currentArtistElem = document.getElementById("current-artist");
    const songImage = document.querySelector(".song-img");

    currentTitleElem.innerText = songs[currentSongIndex].title;
    currentArtistElem.innerText = songs[currentSongIndex].artist;
    songImage.src = songs[currentSongIndex].image;
}

function playPause() {
    if (ctrlicon.classList.contains("fa-pause")) {
        song.pause();
        ctrlicon.classList.remove("fa-pause");
        ctrlicon.classList.add("fa-play");
    } else {
        song.src = songs[currentSongIndex].src;
        song.play();
        ctrlicon.classList.add("fa-pause");
        ctrlicon.classList.remove("fa-play");
        updateSongInfo();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    song.src = songs[currentSongIndex].src;
    song.play();
    updateSongInfo();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    song.src = songs[currentSongIndex].src;
    song.play();
    updateSongInfo();
}

function selectSong(index) {
currentSongIndex = index;
song.src = songs[currentSongIndex].src;
updateSongInfo();

if(song.paused){
        playPause();
}

function playPause() {
if (ctrlicon.classList.contains("fa-pause")) {
song.pause();
ctrlicon.classList.remove("fa-pause");
ctrlicon.classList.add("fa-play");
} else {
song.play();
ctrlicon.classList.add("fa-pause");
ctrlicon.classList.remove("fa-play");
updateSongInfo();
}
}

}



song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

setInterval(() => {
    progress.value = song.currentTime;
}, 500);

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlicon.classList.add("fa-pause");
    ctrlicon.classList.remove("fa-play");
};

// Atualiza as informações da música quando a página carrega
updateSongInfo();