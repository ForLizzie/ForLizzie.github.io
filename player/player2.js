var songs = [
	{ 
		title: "Die For You",
		songURL: "https://www.dropbox.com/s/93h290yjtru9dz4/DieForYou.mp3?dl=0"
	},
	{ 
		title: "Paper Rings",
		songURL: "https://www.dropbox.com/s/22c3j561ya5btwg/PaperRings.mp3?dl=0"
	},
	{ 
		title: "HEAD OVER HEELS",
		songURL: "https://www.dropbox.com/s/sf6pp0o8yihgq4z/HEADOVERHEELS.mp3?dl=0"
	},
	{ 
		title: "Willow",
		songURL: "https://www.dropbox.com/s/eb3mklbtq90tc16/Willow.mp3?dl=0"
	},
	{ 
		title: "Loverboy",
		songURL: "https://www.dropbox.com/s/8j01t43huml6o3a/Loverboy.mp3?dl=0"
	},
]
const playerArea = document.getElementById("mediaPlayer")
const playButton = document.getElementById("playState")
const stopButton = document.getElementById("stopItem")
const nextButton = document.getElementById("nextItem")
const prevButton = document.getElementById("backItem")
const durationLabel = document.getElementById("currentDuration")
const songTitleLabel = document.getElementById("songTitleLabel")
const audioPlayer = document.getElementById("audioPlayer")
const volumeSlider = document.getElementById("volumeSlider")
let currentIndex = 0
let dataAvailable = false
let currentLength;
let timer;

timer = setInterval(updateDurationLabel, 100)

volumeSlider.addEventListener("input", () => {
	audioPlayer.volume = parseFloat(volumeSlider.value)
}, false)

playButton.addEventListener("click", () => {
	playerArea.classList.toggle("play")
	if (audioPlayer.paused) {
		setTimeout(()=> {audioPlayer.play()}, 300)
		timer = setInterval(updateDurationLabel, 100)
	} else {
		audioPlayer.pause()
		clearInterval(timer)
	}
}, false)

stopButton.addEventListener("click", () => {
	playerArea.classList.remove("play")
	audioPlayer.pause()
	audioPlayer.currentTime = 0
	updateDurationLabel()
}, false)

nextButton.addEventListener("click", () => {
	dataAvailable = false
	loadNext(true)
}, false)

prevButton.addEventListener("click", () => {
	dataAvailable = false
	loadNext(false)
	
}, false)

audioPlayer.addEventListener("loadeddata", () => {
    dataAvailable = true
	currentLength = audioPlayer.duration
});

// FUNCTIONS

// Converts time in ms to zero-padded string in seconds
function parseTime(time) {
	const minutes = Math.floor(time / 60)
	const seconds = Math.floor(time - minutes * 60)
	const secondsZero = seconds < 10 ? "0" : ""
	const minutesZero = minutes < 10 ? "0" : ""
	return minutesZero + minutes.toString() + ":" + secondsZero + seconds.toString()
}

// Loads next song
function loadNext(next) {
	audioPlayer.pause()
	if (next) {
		currentIndex = (currentIndex + 1) % songs.length
	} else {
		currentIndex = (currentIndex - 1) < 0 ? songs.length - 1 : currentIndex - 1
	}
	audioPlayer.src = songs[currentIndex].songURL
	songTitleLabel.innerHTML = songs[currentIndex].title
	audioPlayer.play()
}

// Updates the duration label
function updateDurationLabel(){
	if (dataAvailable) {
		durationLabel.innerText = parseTime(audioPlayer.currentTime) + " / " + parseTime(currentLength)	
	} else {
		durationLabel.innerText = parseTime(audioPlayer.currentTime)
	}
}

//rewind on completion
audioPlayer.addEventListener("ended", () => {
     myAudio.currentTime = 0
});
