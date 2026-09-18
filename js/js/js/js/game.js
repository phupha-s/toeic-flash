import { db, ref, set, onValue, update, get } from "./firebase.js";
import { questions } from "./questions.js";

const roomCode = localStorage.getItem('toeic_flash_room');
const playerName = localStorage.getItem('toeic_flash_player');
const playerId = localStorage.getItem('toeic_flash_playerId');
const isHost = localStorage.getItem('toeic_flash_isHost') === 'true';

let currentQuestionIndex = 0;
let userScore = 0;
let timerInterval = null;
let timeLeft = 60;
let hasAnswered = false;

document.addEventListener('DOMContentLoaded', () => {
    if (!roomCode || !playerId) {
        alert("ไม่พบข้อมูลการเข้าร่วมห้อง กลับสู่หน้าหลัก");
        window.location.href = "index.html";
        return;
    }

    initGame();
});

function initGame() {
    listenToRoomState();
    listenToLeaderboard();
}

function listenToRoomState() {
    onValue(ref(db, `rooms/${roomCode}`), (snapshot) => {
        const roomData = snapshot.val();
        if (!roomData) return;

        if (roomData.status === 'finished') {
            window.location.href = "result.html";
            return;
        }

        const qIndex = roomData.currentQuestion || 0;
        if (qIndex !== currentQuestionIndex || currentQuestionIndex === 0) {
            currentQuestionIndex = qIndex;
            loadQuestion(currentQuestionIndex);
        }
    });
}

function loadQuestion(index) {
    if (index >= questions.length) {
        if (isHost) {
            set(ref(db, `rooms/${roomCode}/status`), 'finished');
        }
        return;
    }

    hasAnswered = false;
    const q = questions[index];

    document.getElementById('question-number').innerText = `ข้อที่ ${index + 1} / ${questions.length}`;
    document.getElementById('question-text').innerText = q.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, optIndex) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(optIndex, q.answer);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!hasAnswered) {
                disableOptions();
            }
            if (isHost) {
                setTimeout(nextQuestion, 2000);
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElem = document.getElementById('timer-display');
    if (timerElem) {
        timerElem.innerText = `⏱️ เหลือเวลา: ${timeLeft} วินาที`;
    }
}

function handleAnswer(selectedIndex, correctIndex) {
    if (hasAnswered) return;
    hasAnswered = true;
    disableOptions();

    const options = document.querySelectorAll('.option-btn');
    if (selectedIndex === correctIndex) {
        options[selectedIndex].style.background = '#4CAF50';
        options[selectedIndex].style.color = '#fff';
        const pointsEarned = 10 + Math.floor(timeLeft / 6);
        userScore += pointsEarned;

        update(ref(db, `rooms/${roomCode}/players/${playerId}`), {
            score: userScore
        });
    } else {
        options[selectedIndex].style.background = '#f44336';
        options[selectedIndex].style.color = '#fff';
        options[correctIndex].style.background = '#4CAF50';
        options[correctIndex].style.color = '#fff';
    }

    if (isHost) {
        setTimeout(nextQuestion, 3000);
    }
}

function disableOptions() {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    clearInterval(timerInterval);
    const nextQ = currentQuestionIndex + 1;
    if (nextQ < questions.length) {
        set(ref(db, `rooms/${roomCode}/currentQuestion`), nextQ);
    } else {
        set(ref(db, `rooms/${roomCode}/status`), 'finished');
    }
}

function listenToLeaderboard() {
    onValue(ref(db, `rooms/${roomCode}/players`), (snapshot) => {
        const players = snapshot.val();
        if (!players) return;

        const playerArray = Object.keys(players).map(key => ({
            id: key,
            ...players[key]
        }));

        playerArray.sort((a, b) => b.score - a.score);

        const leaderboardElem = document.getElementById('elevator-leaderboard');
        if (!leaderboardElem) return;

        leaderboardElem.innerHTML = '';
        playerArray.forEach((p, idx) => {
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.padding = '8px 12px';
            div.style.margin = '4px 0';
            div.style.background = p.name === playerName ? '#ffe0b2' : '#e0f7fa';
            div.style.borderRadius = '4px';
            div.innerHTML = `<span>#${idx + 1} ${p.name}</span> <strong>${p.score} คะแนน</strong>`;
            leaderboardElem.appendChild(div);
        });
    });
}
