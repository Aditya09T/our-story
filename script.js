// PASSWORD
const PASSWORD = "Taniyaditya09";

// PAGE LOADER
window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
  }, 1000);
};

// CHECK PASSWORD
function checkPassword() {
  const val = document.getElementById("password").value;
  const err = document.getElementById("error");

  if (val === PASSWORD) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
  } else {
    err.textContent = "Wrong Password ❤️";
  }
}

// OPEN SECTION
function openSection(key) {
  const s = SECTIONS[key];
  const out = document.getElementById("display-area");
  out.innerHTML = "";

  // Story Cards
  s.storyParts.forEach((part, i) => {
    out.innerHTML += `
      <div class="story-card">
        <p class="story-text">${part}</p>

        ${
          s.photos[i]
            ? `<img src="images/${key}/${s.photos[i]}" class="inline-img" />`
            : ""
        }
      </div>
    `;
  });
}
