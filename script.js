// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Phone Ring & Open Modal
const phone = document.getElementById('phone');
const modal = document.getElementById('modal');

setTimeout(() => {
    phone.classList.add('ringing');
}, 3000);

phone.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
});

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    showChoices(); // Reset to start
}

// VN Logic
let currentState = 'start';

function showChoices() {
    document.getElementById('vn-choices').style.display = 'block';
    document.getElementById('rant-form').style.display = 'none';
    document.getElementById('vn-text').textContent = "Hi there! I'm Tsuki. What sparks your curiosity today? 💫";
    currentState = 'start';
}

function nextDialogue(topic) {
    let text = '';
    if (topic === 'art') {
        text = "Art's my escape—layering colors like Roblox textures. What's your fave medium? (Hit 'Bye' to chat more later! 🎨)";
    } else if (topic === 'roblox') {
        text = "Roblox is endless creativity! Pro tip: Always test avatars in private servers. What's your dream game? 🚀";
    }
    document.getElementById('vn-text').textContent = text;
    // Hide choices after selection for flow, or keep them—tweak as needed
}

function showRantInput() {
    document.getElementById('vn-choices').style.display = 'none';
    document.getElementById('rant-form').style.display = 'block';
    document.getElementById('vn-text-rant').textContent = "Ooh, a rant? I'm all ears (and pixels). What burning topic should I unleash on?";
}

function backToChoices() {
    showChoices();
}

// Form Success (Web3Forms callback—optional alert)
document.getElementById('rant-form').addEventListener('submit', function(e) {
    // Web3Forms handles the submit; this is for UX
    setTimeout(() => {
        alert("Rant request sent! I'll brew up something spicy soon. Thanks! 🔥"); // Or update text dynamically
        closeModal();
    }, 1000);
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
