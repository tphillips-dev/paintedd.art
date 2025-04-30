function updateInfernoCountdown() {
    const now = new Date();
    const nextBurn = new Date();

    // Set to 20:00 GMT+2 on 2025-04-23
    nextBurn.setUTCFullYear(2025, 3, 23);
    nextBurn.setUTCHours(18, 0, 0, 0);

    if (now > nextBurn) {
        const daysUntilNextWednesday = (3 + 7 - now.getUTCDay()) % 7 || 7;
        nextBurn.setDate(now.getDate() + daysUntilNextWednesday);
        nextBurn.setUTCHours(18, 0, 0, 0);

        console.log("Next burn time set to:", nextBurn.toISOString());
    }

    const diff = nextBurn - now;

    const dys = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("dys").textContent = dys.toString().padStart(2, "0");
    document.getElementById("hrs").textContent = hrs.toString().padStart(2, "0");
    document.getElementById("min").textContent = min.toString().padStart(2, "0");
    document.getElementById("sec").textContent = sec.toString().padStart(2, "0");
}

setInterval(updateInfernoCountdown, 1000);
updateInfernoCountdown();
