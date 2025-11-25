// Load everything you saved before
window.addEventListener('load', () => {
    const data = JSON.parse(localStorage.getItem('tsuki') || '{}');
    document.querySelectorAll('[data-save]').forEach(el => {
        if (data[el.dataset.save]) {
            if (el.tagName === 'IMG') el.src = data[el.dataset.save];
            else el.innerHTML = data[el.dataset.save];
        }
    });
    if (data.socials) data.socials.forEach(s => addBtn(s.url, s.img));
    setTimeout(() => document.getElementById('answer-bubble').style.display='block', 3000);
});

// Auto-save everything
function save() {
    const data = {};
    document.querySelector  document.querySelectorAll('[data-save]').forEach(el => {
        data[el.dataset.save] = el.tagName === 'IMG' ? el.src : el.innerHTML;
    });
    data.socials = Array.from(document.querySelectorAll('#social-buttons a')).map(a => ({url: a.href, img: a.querySelector('img').src}));
    localStorage.setItem('tsuki', JSON.stringify(data));
}
document.addEventListener('input', () => setTimeout(save, 500));
document.addEventListener('click', () => setTimeout(save, 500));

// Phone → main site
document.getElementById('answer-bubble').onclick = () => {
    document.getElementById('phone-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
};

// Open / close VN
function openVN() { document.getElementById('modal').style.display = 'flex'; }
function closeVN() { document.getElementById('modal').style.display = 'none'; }
function showRant() {
    document.querySelector('.vn-choices').style.display = 'none';
    document.getElementById('rant-form').style.display = 'block';
}

// Drag & drop images
document.querySelectorAll('.img-box').forEach(box => {
    ['dragover','drop'].forEach(e => box.addEventListener(e, ev => ev.preventDefault()));
    box.addEventListener('drop', e => {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const r = new FileReader();
            r.onload = () => { box.querySelector('img').src = r.result; save(); };
            r.readAsDataURL(file);
        }
    });
    box.addEventListener('click', () => {
        const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
        input.onchange = e => {
            const file = e.target.files[0];
            if (file) {
                const r = new FileReader();
                r.onload = () => { box.querySelector('img').src = r.result; save(); };
                r.readAsDataURL(file);
            }
        };
        input.click();
    });
});

// Add social button
function addSocial() {
    const url = prompt('Link URL (e.g. your Roblox profile)');
    if (!url) return;
    addBtn(url, 'https://via.placeholder.com/260x80/ff69b4/fff?text=New+Button');
}
function addBtn(url, src) {
    const a = document.createElement('a'); a.href = url; a.target = '_blank';
    const img = document.createElement('img'); img.src = src;
    a.appendChild(img);
    document.getElementById('social-buttons').appendChild(a);
    save();
}

// Sparkles
for(let i=0;i<25;i++){
    const s=document.createElement('div');
    s.style.cssText=`position:absolute;width:8px;height:8px;background:white;border-radius:50%;left:${Math.random()*100}vw;top:${Math.random()*100}vh;animation:sparkle ${3+Math.random()*4}s infinite;opacity:0.7;`;
    document.querySelector('.sparkles').appendChild(s);
}
