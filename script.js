// Auto-load everything you saved before
window.addEventListener('load', () => {
    const saved = JSON.parse(localStorage.getItem('tsuki-site') || '{}');
    document.querySelectorAll('[data-key]').forEach(el => {
        if (saved[el.dataset.key]) {
            if (el.tagName === 'IMG') el.src = saved[el.dataset.key];
            else el.innerHTML = saved[el.dataset.key];
        }
    });
    if (saved.socials) {
        saved.socials.forEach(s => addSocialButton(s.url, s.img));
    }
    setTimeout(() => document.getElementById('answer-bubble').style.display = 'block', 3000);
});

// Auto-save everything you type or drop
function save() {
    const data = {};
    document.querySelectorAll('[data-key]').forEach(el => {
        if (el.tagName === 'IMG') data[el.dataset.key] = el.src;
        else data[el.dataset.key] = el.innerHTML;
    });
    data.socials = [];
    document.querySelectorAll('.social-btn').forEach(btn => {
        data.socials.push({url: btn.href, img: btn.querySelector('img').src});
    });
    localStorage.setItem('tsuki-site', JSON.stringify(data));
}
document.addEventListener('input', save);
document.addEventListener('click', e => { if (e.target.matches('[contenteditable], button')) setTimeout(save, 100); });

// Answer phone → show site
document.getElementById('answer-bubble').onclick = () => {
    document.getElementById('phone-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.body.style.overflow = 'auto';
};

// Open visual novel
document.addEventListener('click', e => {
    if (e.target.closest('#talk-tsuki') || e.target.closest('[data-key="vn-button"]')) {
        document.getElementById('modal').style.display = 'flex';
    }
});
function closeModal() { document.getElementById('modal').style.display = 'none'; }
function showRant() {
    document.getElementById('vn-choices').style.display = 'none';
    document.getElementById('rant-form').style.display = 'block';
}

// Image drop/upload
document.querySelectorAll('.image-drop').forEach(drop => {
    ['dragover', 'drop'].forEach(ev => drop.addEventListener(ev, e => e.preventDefault()));
    drop.addEventListener('drop', e => {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result;
                drop.innerHTML = '';
                drop.appendChild(img);
                save();
            };
            reader.readAsDataURL(file);
        }
    });
    drop.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    drop.innerHTML = '';
                    drop.appendChild(img);
                    save();
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });
});

// Add social button
function addSocial() {
    const url = prompt('Paste your link (Twitter, Roblox, etc.)');
    if (!url) return;
    const img = prompt('Paste image URL for this button (or leave blank and drop image later)');
    addSocialButton(url, img || 'https://via.placeholder.com/220x60/ff69b4/fff?text=New+Button');
}
function addSocialButton(url, imgSrc) {
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.className = 'social-btn';
    const img = document.createElement('img');
    img.src = imgSrc; img.alt = 'Social';
    a.appendChild(img);
    document.getElementById('social-buttons').appendChild(a);
    save();
}

// Sparkles
for(let i=0;i<20;i++){
    const s = document.createElement('div');
    s.style.cssText = `position:absolute;width:8px;height:8px;background:white;border-radius:50%;left:${Math.random()*100}vw;top:${Math.random()*100}vh;animation:sparkle ${3+Math.random()*3}s infinite;opacity:0.6;`;
    document.querySelector('.sparkles').appendChild(s);
}
