const PASSWORD = "Taniyaditya09";

// UI refs
const gate = document.getElementById('gate');
const pwInput = document.getElementById('pwInput');
const pwBtn = document.getElementById('pwBtn');
const pwError = document.getElementById('pwError');

const app = document.getElementById('app');
const container = document.getElementById('sectionContainer');
const nav = document.getElementById('nav');

const modal = document.getElementById('slideshowModal');
const slideImg = document.getElementById('slideImg');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const closeModal = document.getElementById('closeModal');
const playPause = document.getElementById('playPause');
const slideIndex = document.getElementById('slideIndex');

let currentSlides = []; // array of image paths for modal
let currentIndex = 0;
let autoplayId = null;

// password
function checkPassword(){
  const v = pwInput.value.trim();
  if(v === PASSWORD){
    gate.style.display = 'none';
    app.classList.remove('hidden');
    // optionally open first section automatically:
    // openSection('proposal');
  } else {
    pwError.textContent = 'Wrong password ❤️';
    setTimeout(()=> pwError.textContent = '', 2200);
  }
}
pwBtn.addEventListener('click', checkPassword);
pwInput.addEventListener('keydown', e => { if(e.key === 'Enter') checkPassword(); });

// attach nav
nav.querySelectorAll('.nav-btn').forEach(b=>{
  b.addEventListener('click', ()=> {
    const key = b.getAttribute('data-key');
    openSection(key);
    container.scrollIntoView({behavior:'smooth'});
  });
});

// render a section
function openSection(key){
  const data = SECTIONS[key];
  if(!data) return;
  container.innerHTML = ''; // clear

  // large story card
  const card = document.createElement('article');
  card.className = 'story-card';

  const h = document.createElement('h2'); h.innerText = data.title; card.appendChild(h);
  const meta = document.createElement('div'); meta.className='meta'; meta.innerText = data.meta||''; card.appendChild(meta);

  // for each story part, append paragraph then optionally an inline image
  data.storyParts.forEach((para, i) => {
    const pWrap = document.createElement('div'); pWrap.className='story-text';
    const typed = document.createElement('div'); typed.className='type';
    pWrap.appendChild(typed);
    card.appendChild(pWrap);

    // if a matching inline photo exists for this index, append it after typing
    const inlinePhoto = (data.photosInline && data.photosInline[i]) ? data.photosInline[i] : null;

    // animate typing then show inline image if present
    typeText(typed, para, 18).then(()=>{
      pWrap.style.opacity = 1;
      pWrap.style.transform = 'translateY(0)';
      if(inlinePhoto){
        const img = document.createElement('img');
        img.src = `images/${key}/${inlinePhoto}`;
        img.alt = inlinePhoto;
        img.className = 'inline-img';
        img.style.maxWidth='560px';
        img.style.margin='12px auto';
        img.style.display='block';
        img.style.borderRadius='10px';
        card.appendChild(img);
      }
    });
  });

  // append card and slideshow controls
  container.appendChild(card);

  // show slideshow gallery preview (thumbnails)
  if(data.photosForSlideshow && data.photosForSlideshow.length){
    const galleryTitle = document.createElement('h3'); galleryTitle.innerText = 'Gallery';
    galleryTitle.style.marginTop='12px';
    container.appendChild(galleryTitle);

    const grid = document.createElement('div'); grid.className='grid';
    data.photosForSlideshow.forEach((fn, idx) => {
      const img = document.createElement('img');
      img.src = `images/${key}/${fn}`;
      img.alt = fn;
      img.loading = 'lazy';
      img.style.cursor = 'pointer';
      img.addEventListener('click', ()=> openSlideshow(data.photosForSlideshow.map(x=>`images/${key}/${x}`), idx));
      grid.appendChild(img);
    });
    container.appendChild(grid);
  }

  // videos (if any)
  if(data.videos && data.videos.length){
    const vidsTitle = document.createElement('h3'); vidsTitle.innerText = 'Videos'; vidsTitle.style.marginTop='12px';
    container.appendChild(vidsTitle);
    const vgrid = document.createElement('div'); vgrid.className='grid';
    data.videos.forEach(fn=>{
      const v = document.createElement('video');
      v.src = `videos/${key}/${fn}`;
      v.controls = true; v.playsInline = true;
      v.style.borderRadius='12px';
      vgrid.appendChild(v);
    });
    container.appendChild(vgrid);
  }

  // reveal animation
  setTimeout(()=> card.classList.add('show'), 60);
}

// typing helper
function typeText(el, txt, speed = 25){
  el.textContent = '';
  return new Promise(res=>{
    let i=0;
    const iv = setInterval(()=>{
      el.textContent += txt.charAt(i);
      i++;
      if(i >= txt.length){
        clearInterval(iv);
        // remove caret shortly after
        setTimeout(()=> el.style.borderRight='0px', 300);
        res();
      }
    }, speed);
  });
}

/* ---------- Slideshow modal ---------- */
function openSlideshow(arrayOfPaths, startIndex=0){
  currentSlides = arrayOfPaths.slice();
  currentIndex = startIndex;
  slideImg.src = currentSlides[currentIndex];
  slideIndex.innerText = `${currentIndex+1} / ${currentSlides.length}`;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  stopAutoplay(); // ensure autoplay reset
}

function closeSlideshow(){
  modal.classList.add('hidden');
  modal.style.display = 'none';
  stopAutoplay();
}

function prevSlideFn(){
  if(!currentSlides.length) return;
  currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
  slideImg.src = currentSlides[currentIndex];
  slideIndex.innerText = `${currentIndex+1} / ${currentSlides.length}`;
}
function nextSlideFn(){
  if(!currentSlides.length) return;
  currentIndex = (currentIndex + 1) % currentSlides.length;
  slideImg.src = currentSlides[currentIndex];
  slideIndex.innerText = `${currentIndex+1} / ${currentSlides.length}`;
}
function startAutoplay(){
  if(autoplayId) return;
  playPause.textContent = 'Pause';
  autoplayId = setInterval(()=> nextSlideFn(), 3000);
}
function stopAutoplay(){
  if(autoplayId){ clearInterval(autoplayId); autoplayId = null; playPause.textContent = 'Play'; }
}

// modal event listeners
prevBtn && prevBtn.addEventListener('click', prevSlideFn);
nextBtn && nextBtn.addEventListener('click', nextSlideFn);
closeModal && closeModal.addEventListener('click', closeSlideshow);
playPause && playPause.addEventListener('click', ()=> {
  if(autoplayId) stopAutoplay(); else startAutoplay();
});
document.addEventListener('keydown', e => {
  if(!modal || modal.classList.contains('hidden')) return;
  if(e.key === 'ArrowLeft') prevSlideFn();
  if(e.key === 'ArrowRight') nextSlideFn();
  if(e.key === 'Escape') closeSlideshow();
});
