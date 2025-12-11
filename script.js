const PASSWORD = "Taniyaditya09";


function check() {
const p = document.getElementById("password").value;
if (p === PASSWORD) {
document.getElementById("login").style.display = "none";
document.getElementById("content").classList.remove("hidden");
loadMemories();
loadPhotos();
loadVideos();
loadJourney();
} else {
document.getElementById("error").innerText = "Wrong password ❤️";
}
}


function openSection(id) {
document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');
}


/* Load Memories */
function loadMemories() {
fetch("data.json")
.then(res => res.json())
.then(data => {
const box = document.getElementById("memories");
box.innerHTML = "<h2>📜 Memories</h2>";
data.events.forEach(e => {
box.innerHTML += `
<div class="event">
<h3>${e.title}</h3>
<p>${e.date}</p>
<p>${e.desc}</p>
</div>`;
});
});
}


/* Photos */
function loadPhotos() {
fetch("data.json")
.then(res => res.json())
.then(data => {
const grid = document.getElementById("photo-grid");
data.photos.forEach(p => {
grid.innerHTML += `<img src="images/${p}">`;
});
});
}


/* Videos */
function loadVideos() {
fetch("data.json")
.then(res => res.json())
.then(data => {
const grid = document.getElementById("video-grid");
data.videos.forEach(v => {
grid.innerHTML += `<video controls src="videos/${v}"></video>`;
});
});
}


/* Love Journey */
function loadJourney() {
fetch("data.json")
.then(res => res.json())
.then(data => {
document.getElementById("journey-text").innerText = data.journey;
});
}
