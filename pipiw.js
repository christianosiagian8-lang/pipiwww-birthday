
/* ============================
   Script for For My Ndut page
   - typing effect (kombinasi speed)
   - music control
   - open PPT button (replace pptLink)
   - hearts/confetti on click
   ============================ */

// ----- Teks surat (array - setiap elemen = 1 garis/paragraf) -----
const letter = [
  "Selamat ulang tahun, Ndut.",
  "Hari ini, 11 November, dunia kayak berhenti sebentar buat ngerayain seseorang yang paling berarti buat aku.",
  "Aku cuma mau bilang... maaf.",
  "Maaf karena dulu aku belum cukup jadi tempat pulang yang tenang buat kamu.",
  "Kadang masih terlintas semua hal yang pernah kita punya — yang sederhana, tapi penuh makna.",
  "Aku rindu versi kita yang dulu, tapi lebih dari itu... aku pengin versi baru kita, yang lebih tenang, lebih dewasa, dan lebih bahagia.",
  "Ndut, semoga kamu tumbuh di setiap tahun dengan senyum yang nggak lagi dipaksa, dan dengan hati yang tahu...",
  "kalau masih ada seseorang di sini, yang diam-diam selalu berdoa buat bahagiamu.",
  "Dan kalau takdir ngizinin, aku pengin mencintaimu lagi — dengan cara yang paling lembut, tanpa luka, tanpa tergesa.",
  "Dari aku, Tian ❤️"
];

// ----- typing effect -----
const container = document.getElementById("loveLetter");
let idxLine = 0;
let idxChar = 0;
let current = "";
let typingSpeed = 60;

function typeLetter() {
  if (idxLine < letter.length) {
    const line = letter[idxLine];

    // kombinasi: pelan jika ada kata 'maaf' atau 'rindu'
    if (line.toLowerCase().includes("maaf") || line.toLowerCase().includes("rindu")) typingSpeed = 95;
    else typingSpeed = 45;

    if (idxChar < line.length) {
      current += line.charAt(idxChar);
      container.innerHTML = current + "|";
      idxChar++;
      setTimeout(typeLetter, typingSpeed);
    } else {
      // selesai satu line -> add gap / newlines
      current += "\n\n";
      idxChar = 0;
      idxLine++;
      // sedikit jeda antar baris
      setTimeout(typeLetter, 900);
    }
  } else {
    container.innerHTML = current; // remove cursor
    // after finished, optionally show controls visually
    container.classList.add('show');
  }
}

// start typing after small delay so page elements load
setTimeout(typeLetter, 900);

// ----- music control -----
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('bgMusic');
let playing = false;
playBtn.addEventListener('click', () => {
  if (!playing) {
    audio.play().catch(()=>{/* autoplay blocked; user gesture required */});
    playBtn.textContent = '⏸️ Pause Musik';
  } else {
    audio.pause();
    playBtn.textContent = '▶️ Putar Musik';
  }
  playing = !playing;
});

// ----- Open PPT button -----
// GANTI baris ini dengan link PPT kamu (Google Drive / OneDrive share link)
const pptLink = "https://drive.google.com/uc?export=download&id=1DyFfGxqh4icCh_8-BpVvrJ7Lkk97kIgR";


document.getElementById('openBtn').addEventListener('click', () => {
  // spawn confetti/hearts
  spawnConfetti(30);
  // open PPT in new tab
  window.open(pptLink, '_blank');
});

// ----- Decorations: hearts + confetti -----
const decor = document.getElementById('decor');

function spawnHeart(x, y, sz = 26) {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.width = sz + 'px';
  el.style.height = sz + 'px';
  el.style.opacity = (0.4 + Math.random()*0.6);
  el.style.pointerEvents = 'none';
  el.style.transform = `translateY(0) rotate(${Math.random()*90}deg)`;
  el.innerHTML = `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" xmlns="http://www.w3.org/2000/svg"><path fill="#c86b82" d="M12 21s-7-4.35-9-6.35C-1 10 4 5 7 7c1.5 1 1.8 3.3 5 6 3.2-2.7 3.5-5 5-6 3-2 8 3 4 7.65C19 16.65 12 21 12 21z"/></svg>`;
  decor.appendChild(el);

  // animate up and fade
  requestAnimationFrame(()=> {
    el.style.transition = `transform ${6 + Math.random()*4}s linear, opacity 2.5s ease`;
    el.style.transform = `translateY(-60vh) rotate(${Math.random()*360}deg)`;
    el.style.opacity = 0;
  });

  setTimeout(()=> el.remove(), 8000);
}

function spawnConfetti(n=24) {
  const w = window.innerWidth, h = window.innerHeight;
  for (let i=0;i<n;i++){
    const x = w/2 + (Math.random()*300 - 150);
    const y = h/2 + (Math.random()*120 - 60);
    spawnHeart(x, y, 12 + Math.random()*22);
  }
}

// gentle periodic hearts from bottom
setInterval(()=> {
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 40;
  spawnHeart(x, y, 16 + Math.random()*14);
}, 1600);






