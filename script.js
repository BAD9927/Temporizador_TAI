const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const timeInput = document.getElementById('timeInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const alertBox = document.getElementById('alertBox');
const tickSound = document.getElementById('tickSound');
const alarmSound = document.getElementById('alarmSound');

let timer;
let timeLeft;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        playTickSound();
        timer = setTimeout(startTimer, 1000);
    } else {
        showAlert();
        playAlarmSound();
        updateDisplay(); // Ensure display shows 00:00 when timer ends
    }
}

function playTickSound() {
    tickSound.currentTime = 0;
    tickSound.play();
}

function playAlarmSound() {
    alarmSound.currentTime = 0;
    alarmSound.play();
}

function showAlert() {
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 3000);
}

startBtn.addEventListener('click', () => {
    clearTimeout(timer);
    const inputMinutes = parseInt(timeInput.value);
    if (inputMinutes > 0 && inputMinutes <= 60) {
        timeLeft = inputMinutes * 60;
        updateDisplay();
        startTimer();
    } else {
        window.alert('Please enter a valid time between 1 and 60 minutes.');
    }
});

resetBtn.addEventListener('click', () => {
    clearTimeout(timer);
    timeLeft = 0;
    updateDisplay();
    timeInput.value = '';
    tickSound.pause();
    tickSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;
});

updateDisplay();