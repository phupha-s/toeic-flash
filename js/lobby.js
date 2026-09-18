import { db, ref, set, push, onValue } from "./firebase.js";

// สร้างรหัสห้องสุ่ม 5 ตัวอักษร
function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ผูก Event Listener เมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.getElementById('btn-create-room');
    const btnJoin = document.getElementById('btn-join-room');
    const btnStart = document.getElementById('btn-start-game');

    if (btnCreate) btnCreate.addEventListener('click', createRoom);
    if (btnJoin) btnJoin.addEventListener('click', joinRoom);
    if (btnStart) btnStart.addEventListener('click', startGame);
});

function createRoom() {
    const nameInput = document.getElementById('player-name');
    const playerName = nameInput ? nameInput.value.trim() : '';
    
    if (!playerName) {
        alert("กรุณากรอกชื่อของคุณก่อนสร้างห้อง");
        return;
    }

    const roomCode = generateRoomCode();
    const roomRef = ref(db, `rooms/${roomCode}`);

    set(roomRef, {
        createdAt: Date.now(),
        status: 'waiting',
        currentQuestion: 0
    }).then(() => {
        const playersRef = ref(db, `rooms/${roomCode}/players`);
        const newPlayerRef = push(playersRef);
        
        set(newPlayerRef, {
            name: playerName,
            isHost: true,
            score: 0
        });

        localStorage.setItem('toeic_flash_room', roomCode);
        localStorage.setItem('toeic_flash_player', playerName);
        localStorage.setItem('toeic_flash_isHost', 'true');

        showLobby(roomCode, true);
    }).catch((error) => {
        console.error("Firebase Error: ", error);
        alert("เชื่อมต่อ Firebase ไม่สำเร็จ: " + error.message);
    });
}

function joinRoom() {
    const nameInput = document.getElementById('player-name');
    const codeInput = document.getElementById('room-code-input');
    
    const playerName = nameInput ? nameInput.value.trim() : '';
    const roomCode = codeInput ? codeInput.value.trim().toUpperCase() : '';

    if (!playerName || !roomCode) {
        alert("กรุณากรอกชื่อและรหัสห้องให้ครบถ้วน");
        return;
    }

    const roomRef = ref(db, `rooms/${roomCode}`);
    onValue(roomRef, (snapshot) => {
        if (snapshot.exists()) {
            const playersRef = ref(db, `rooms/${roomCode}/players`);
            const newPlayerRef = push(playersRef);
            
            set(newPlayerRef, {
                name: playerName,
                isHost: false,
                score: 0
            });

            localStorage.setItem('toeic_flash_room', roomCode);
            localStorage.setItem('toeic_flash_player', playerName);
            localStorage.setItem('toeic_flash_isHost', 'false');

            showLobby(roomCode, false);
        } else {
            alert("ไม่พบรหัสห้องนี้ กรุณาตรวจสอบอีกครั้ง");
        }
    }, { onlyOnce: true });
}

function showLobby(roomCode, isHost) {
    document.getElementById('join-screen').style.display = 'none';
    document.getElementById('lobby-screen').style.display = 'block';
    document.getElementById('display-room-code').innerText = roomCode;

    if (isHost) {
        document.getElementById('btn-start-game').style.display = 'inline-block';
    } else {
        document.getElementById('btn-start-game').style.display = 'none';
    }

    listenToPlayers(roomCode);
    listenToGameStart(roomCode);
}

function listenToPlayers(roomCode) {
    onValue(ref(db, `rooms/${roomCode}/players`), (snapshot) => {
        const players = snapshot.val();
        const playerListContainer = document.getElementById('player-list');
        playerListContainer.innerHTML = '';
        let count = 0;

        for (let key in players) {
            count++;
            const p = players[key];
            const div = document.createElement('div');
            div.style.padding = '8px';
            div.style.margin = '4px 0';
            div.style.background = '#f0f0f0';
            div.style.borderRadius = '4px';
            div.innerText = `${count}. ${p.name} ${p.isHost ? '👑 (Host)' : ''}`;
            playerListContainer.appendChild(div);
        }

        document.getElementById('player-count').innerText = count;
    });
}

function listenToGameStart(roomCode) {
    onValue(ref(db, `rooms/${roomCode}/status`), (snapshot) => {
        if (snapshot.val() === 'playing') {
            window.location.href = "game.html";
        }
    });
}

function startGame() {
    const roomCode = localStorage.getItem('toeic_flash_room');
    if (roomCode) {
        set(ref(db, `rooms/${roomCode}/status`), 'playing');
    }
}
