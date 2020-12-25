var songs = [
	{ 
		title: "Die For You",
		songURL: "https://drive.google.com/file/d/1ahKYlsfZt9A5B6n5nMCosGkMJAtG752V/view?usp=sharing"
	},
	{ 
		title: "Paper Rings",
		songURL: "https://drive.google.com/file/d/1B3IJ6cpnURQOxcSbeesO4OG1hRTKiwT2/view?usp=sharing"
	},
	{ 
		title: "HEAD OVER HEELS",
		songURL: "https://drive.google.com/file/d/1oz7_11f8p0GAsfbLzC6e6pm7_DRoMwAX/view?usp=sharing"
	},
	{ 
		title: "Willow",
		songURL: "https://drive.google.com/file/d/1bVFr-3xnqRyDEN5Avo-OlxyAMiln-0Zo/view?usp=sharing"
	},
	{ 
		title: "Loverboy",
		songURL: "https://drive.google.com/file/d/1VcSKYIbGfk-oY-1c11YWLS-_2ePD5Mny/view?usp=sharing"
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
