let startTime;
let timerInterval;
let duration;
let isPaused = false;
let elapsedTimeBeforePause = 0;
let lastTimestamp;

const setupScreen = document.getElementById('setup-screen');
const timerScreen = document.getElementById('timer-screen');
const minutesInput = document.getElementById('minutes');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const quitBtn = document.getElementById('quit-btn');
const timeLeftDisplay = document.getElementById('time-left');
const elapsedTimeDisplay = document.getElementById('elapsed-time');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateColorization(progress) {
    document.body.style.filter = `grayscale(${1 - progress})`;
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - startTime + elapsedTimeBeforePause) / 1000);
    const remainingSeconds = Math.max(0, duration - elapsedSeconds);
    
    timeLeftDisplay.textContent = formatTime(remainingSeconds);
    elapsedTimeDisplay.textContent = `Elapsed: ${formatTime(elapsedSeconds)}`;
    
    const progress = Math.min(1, elapsedSeconds / duration);
    updateColorization(progress);
    
    if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        alert('Study session completed!');
    }
}

startBtn.addEventListener('click', () => {
    const minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes');
        return;
    }
    
    duration = minutes * 60;
    startTime = Date.now();
    elapsedTimeBeforePause = 0;
    setupScreen.classList.add('hidden');
    timerScreen.classList.remove('hidden');
    
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});

pauseBtn.addEventListener('click', () => {
    if (isPaused) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        pauseBtn.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        elapsedTimeBeforePause += Date.now() - startTime;
        pauseBtn.textContent = 'Resume';
    }
    isPaused = !isPaused;
});

quitBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    setupScreen.classList.remove('hidden');
    timerScreen.classList.add('hidden');
    minutesInput.value = '';
    document.body.style.filter = 'grayscale(1)';
});

// Handle tab visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (!isPaused && timerInterval) {
            clearInterval(timerInterval);
            elapsedTimeBeforePause += Date.now() - startTime;
        }
    } else {
        if (!isPaused && timerInterval) {
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);
        }
    }
});