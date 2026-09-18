let currentQIndex = 0;
let timeLeft = 60;
let timerInterval;
let currentScore = 0;
let highestScore = 0;
let selectedAnswer = null;

// อัปเดตลิฟต์คะแนน
function updateElevator(isCorrect) {
    if (isCorrect) {
        currentScore++;
        if (currentScore > highestScore) highestScore = currentScore;
    } else {
        currentScore = 0; // ตอบผิดลิฟต์ร่วงกลับ 0
    }

    // รีเซ็ต UI ลิฟต์
    document.querySelectorAll('.floor').forEach(el => {
        el.innerHTML = el.id.replace('floor-', '');
        el.classList.remove('active-floor');
    });

    // วาดตำแหน่งตัวละครใหม่
    const activeFloorEl = document.getElementById(`floor-${currentScore}`);
    if (activeFloorEl) {
        activeFloorEl.classList.add('active-floor');
        activeFloorEl.innerHTML = `${currentScore} 🧍`;
    }

    document.getElementById('high-score').innerText = highestScore;
}

function loadQuestion() {
    const q = questions[currentQIndex];
    document.getElementById('current-q').innerText = currentQIndex + 1;
    document.getElementById('question-text').innerText = q.text;
    
    const audioBtn = document.getElementById('btn-audio');
    if (q.type === 'listening') {
        audioBtn.style.display = "inline-block";
        document.getElementById('q-audio').src = q.audioSrc;
    } else {
        audioBtn.style.display = "none";
    }

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    selectedAnswer = null;

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(btn, index);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function selectOption(btn, index) {
    document.querySelectorAll('.option-btn').forEach(el => el.classList.remove('selected'));
    btn.classList.add('selected');
    selectedAnswer = index;
}

function playAudio() {
    const audio = document.getElementById('q-audio');
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio file missing/blocked: ", e));
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    document.getElementById('time-left').innerText = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;
        if (timeLeft <= 0) {
            submitAnswer(); // หมดเวลาบังคับส่ง
        }
    }, 1000);
}

function submitAnswer() {
    clearInterval(timerInterval);
    const q = questions[currentQIndex];
    
    const isCorrect = (selectedAnswer === q.correct);
    updateElevator(isCorrect);

    // ไปข้อถัดไปหรือจบเกม
    setTimeout(() => {
        currentQIndex++;
        if (currentQIndex < questions.length) {
            loadQuestion();
        } else {
            // จบ 10 ข้อ ไปหน้าผลลัพธ์ (เดี๋ยวสร้างใน Step หน้า)
            alert(`GAME OVER! สถิติสูงสุดของคุณคือ: ${highestScore}`);
            window.location.href = "result.html"; 
        }
    }, 1000);
}

// เริ่มเกมทันทีที่โหลดหน้าเสร็จ
window.onload = loadQuestion;
function updateElevator(isCorrect) {
    if (isCorrect) {
        currentScore++;
        if (currentScore > highestScore) {
            highestScore = currentScore;
            // บันทึกคะแนนสูงสุดไว้ใน LocalStorage
            localStorage.setItem('toeic_flash_highscore', highestScore);
        }
    } else {
        currentScore = 0; // ตอบผิดลิฟต์ร่วงกลับ 0
    }

    // รีเซ็ต UI ลิฟต์
    document.querySelectorAll('.floor').forEach(el => {
        el.innerHTML = el.id.replace('floor-', '');
        el.classList.remove('active-floor');
    });

    // วาดตำแหน่งตัวละครใหม่
    const activeFloorEl = document.getElementById(`floor-${currentScore}`);
    if (activeFloorEl) {
        activeFloorEl.classList.add('active-floor');
        activeFloorEl.innerHTML = `${currentScore} 🧍`;
    }

    document.getElementById('high-score').innerText = highestScore;
}
function submitAnswer() {
    clearInterval(timerInterval);
    const q = questions[currentQIndex];
    
    const isCorrect = (selectedAnswer === q.correct);
    updateElevator(isCorrect);

    setTimeout(() => {
        currentQIndex++;
        if (currentQIndex < questions.length) {
            loadQuestion();
        } else {
            // จบ 10 ข้อ ย้ายไปหน้าแสดงผล Leaderboard
            window.location.href = "result.html"; 
        }
    }, 1000);
}
