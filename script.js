// script.js

const phoneScreen = document.getElementById('phone-screen');
const answerBubble = document.getElementById('answer-bubble');
const mainContent = document.getElementById('main-content');
const modal = document.getElementById('modal');
const openVnButton = document.getElementById('open-vn');
const vnText = document.getElementById('vn-text');
const vnChoices = document.getElementById('vn-choices');
const rantForm = document.getElementById('rant-form');

// Phone Ring & Show Answer Bubble
setTimeout(() => {
    document.querySelector('.phone-icon').classList.add('ringing'); // If you add ringing class
    answerBubble.style.display = 'block';
}, 3000);

// Click Answer to Show Main Site
answerBubble.addEventListener('click', () => {
    phoneScreen.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.style.overflow = 'auto';
});

// Open VN on Button Click
openVnButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// VN Game Logic
function advanceVN(choice) {
    let newText = '';
    if (choice === 'art') {
        newText = 'Art is magic! I love drawing chibi Roblox chars~ What\'s your fave style? ♡'; // Editable in code
    } else if (choice === 'roblox') {
        newText = 'Roblox is my playground! Favorite game mode? 🚀💕';
    } else if (choice === 'rant') {
        vnChoices.style.display = 'none';
        rantForm.style.display = 'block';
        return;
    }
    vnText.textContent = newText;
    // Add more game branches here if needed
}

function backToStart() {
    vnText.textContent = 'Hi! I\'m Tsuki~ What\'s up? 💫♡'; // Editable
    vnChoices.style.display = 'flex';
    rantForm.style.display = 'none';
}

function closeModal() {
    modal.style.display = 'none';
    backToStart(); // Reset VN
}

// Form Submit
rantForm.addEventListener('submit', (e) => {
    setTimeout(() => {
        alert('Sent to Tsuki! She\'ll rant soon~ 🔥♡');
        closeModal();
    }, 1000);
});

// Dynamic Sparkles
const sparkles = document.querySelector('.sparkles');
for (let i = 0; i < 15; i++) { // More sparkles
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    sparkles.appendChild(sparkle);
}
