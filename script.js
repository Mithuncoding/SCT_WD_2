// Selecting DOM elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Stopwatch variables
let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapNumber = 0;

// Function to update the display
function updateDisplay(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const formattedTime = 
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    display.textContent = formattedTime;
}

// Helper function to pad numbers with leading zeros
function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}

// Function to start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
    }, 10);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

// Function to pause the stopwatch
function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
    lapNumber = 0;
}

// Function to record a lap
function recordLap() {
    lapNumber += 1;
    const li = document.createElement('li');
    const lapLabel = document.createElement('span');
    lapLabel.textContent = `Lap ${lapNumber}`;
    const lapTime = document.createElement('span');
    lapTime.textContent = display.textContent;
    li.appendChild(lapLabel);
    li.appendChild(lapTime);
    lapsList.prepend(li);
}

// Event listeners
startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
