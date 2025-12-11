// PASSWORD (change if needed)
const PASSWORD = "Taniyaditya09";

// UI refs
const gate = document.getElementById('gate');
const pwInput = document.getElementById('pwInput');
const pwBtn = document.getElementById('pwBtn');
const pwError = document.getElementById('pwError');

const app = document.getElementById('app');
const container = document.getElementById('sectionContainer');
const navButtons = document.querySelectorAll('.nav-btn');

// show/hide app after pw
function checkPassword(){
  const v = pwInput.value.trim();
  if(v === PASSWORD){
    gate.style.display = 'none';
    app.classList.remove('hidden');
    // optionally reveal a default section:
    // openSection('proposal');
  } else {
    pwError.textContent = 'Wrong password ❤️';
    setTimeout(()=> pwError.textContent = '', 2500);
  }
}
pwBtn.addEventListener('click', checkPassword);
pwInput.addEventListener('keydown', e => { if(e.key === 'Enter') checkPassword(); });

// nav clicks
navButtons.forEach(b => {
  b.addEventListener('click', ()=> {
    const key = b.getAttribute('data-key');
    openSection(key);
    // smooth scroll to top of section container
    container.scrollIntoView({behavior:'smooth'});
  });
});

// open and render a section
function openSection(key){
  const data = SECTIONS[key];
  if(!data) return;
  container.innerHTML = ''; // clear

  // create card
  const card = document.createElement('article');
  card.className = 'story-card';

  const h = document.createElement('h2');
  h.innerText = data.title;
  card.appendChild(h);

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.innerText = data.meta || '';
  card.appendChild(meta);

  const text = document.createElement('div');
  text.className = 'story-text';
  // We'll animate typing
  const typed = document.createElement('div');
  typed.className = 'type';
  text.appendChild(typed);
  card.appendChild(text);

  container.appendChild(card);

  // images/videos alternating inside content
  const mediaGrid = document.createElement('div');
  mediaGrid.className = 'grid';

  // photos (path images/<key>/filename)
  (data.photos||[]).forEach(fn => {
    const img = document.createElement('img');
    img.src = `images/${key}/${fn}`;
    img.alt = fn;
    img.loading = 'lazy';
    mediaGrid.appendChild(img);
  });

  // videos
  (data.videos||[]).forEach(fn => {
    const v = document.createElement('video');
    v.src = `videos/${key}/${fn}`;
    v.controls = true;
    v.playsInline = true;
    mediaGrid.appendChild(v);
  });

  // Append media below the text (you can rearrange)
  container.appendChild(mediaGrid);

  // reveal animations
  setTimeout(()=> card.classList.add('show'), 40);

  // typing effect for the story text with simple character animation
  typeText(typed, data.story || '', 20).then(()=>{
    text.classList.add('revealed');
    // remove caret after typing finish
    typed.style.borderRight = '0px';
  });

  // also attach intersection observer to reveal images on scroll
  observeImages();
}

// simple typing helper
function typeText(el, txt, speed = 25){
  el.textContent = '';
  return new Promise(res=>{
    let i=0;
    const iv = setInterval(()=>{
      el.textContent += txt.charAt(i);
      i++;
      if(i >= txt.length){
        clearInterval(iv);
        res();
      }
    }, speed);
  });
}

// reveal images/videos on scroll
function observeImages(){
  const opts = {root:null, rootMargin:'0px', threshold:0.15};
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('show');
        io.unobserve(en.target);
      }
    });
  },opts);

  document.querySelectorAll('.grid img, .grid video').forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(10px)';
    // tiny CSS transition injection
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    // observe
    io.observe(el);
    // when shown, set neutral styles via show
    el.addEventListener('load', ()=>{ /* no-op */ });
  });

  // buttons to play video muted on click for preview (optional)
  document.querySelectorAll('.grid video').forEach(v=>{
    v.addEventListener('click', ()=> {
      if(v.paused) v.play(); else v.pause();
    });
  });
}

// expose openSection (so nav btns can call externally)
window.openSection = openSection;
