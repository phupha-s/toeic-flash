function createRoom() {
    const name = document.getElementById('playerName').value;
    if(!name) return alert("กรุณาใส่ชื่อผู้เล่น!");
    
    // จำลองการสร้างห้อง
    document.getElementById('display-room-code').innerText = "G3TOEIC";
    document.getElementById('join-screen').classList.add('hidden');
    document.getElementById('lobby-screen').classList.remove('hidden');
}

function joinRoom() {
    const name = document.getElementById('playerName').value;
    const room = document.getElementById('roomCode').value;
    if(!name || !room) return alert("กรุณาใส่ชื่อผู้เล่นและรหัสห้อง!");
    
    document.getElementById('display-room-code').innerText = room.toUpperCase();
    document.getElementById('join-screen').classList.add('hidden');
    document.getElementById('lobby-screen').classList.remove('hidden');
}

function startGame() {
    window.location.href = "game.html"; // ย้ายไปหน้าเกม
}
