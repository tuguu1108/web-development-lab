const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

function setTheme(theme) {
    root.dataset.theme = theme;
    themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
    themeBtn.textContent = theme === 'dark' ? 'Гэрэл горим' : 'Харанхуй горим';
    try { localStorage.setItem('theme', theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

const cards = document.querySelectorAll('.flip');

cards.forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('is-flipped');
        }
    });
});

document.getElementById('flip-all').addEventListener('click', () => {
    const allFlipped = [...cards].every(c => c.classList.contains('is-flipped'));
    cards.forEach(c => c.classList.toggle('is-flipped', !allFlipped));
});