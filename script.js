// --- Anniversary Countdown Logic ---

function startCountdown() {
    // Set the Anniversary Date (March 3rd)
    const ANNIVERSARY_DAY = 3;
    const ANNIVERSARY_MONTH = 2; // JavaScript months are 0-indexed (Jan=0, Feb=1, Mar=2)

    function updateCountdown() {
        const now = new Date();
        let nextAnniversary = new Date(now.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY);

        // If the anniversary has already passed this year, set it for next year
        if (now > nextAnniversary) {
            nextAnniversary.setFullYear(now.getFullYear() + 1);
        }

        const distance = nextAnniversary - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown");

        if (distance < 0) {
            // If it's the day, show a happy message!
            countdownElement.innerHTML = "🎉 Happy Anniversary! ❤️";
            clearInterval(countdownInterval);
        } else {
            countdownElement.innerHTML = 
                `${days} Days | ${hours} Hrs | ${minutes} Mins | ${seconds} Secs`;
        }
    }

    // Run the function once immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}
