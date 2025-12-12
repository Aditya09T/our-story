// PASSWORD
const PASSWORD = "Taniyaditya09";

// Loader → Login Screen
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("login").classList.remove("hidden");
    }, 1000);
};

// Check Password
function checkPassword() {
    const input = document.getElementById("password").value;
    const err = document.getElementById("error");

    if (input === PASSWORD) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");
    } else {
        err.textContent = "Wrong Password 💔";
    }
}

// Open Section
function openSection(key) {
    const area = document.getElementById("display-area");
    area.innerHTML = SECTIONS[key];
}
