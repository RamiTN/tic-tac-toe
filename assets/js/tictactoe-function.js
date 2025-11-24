// Show difficulty menu
function showDifficulty() {
    const difficultyElement = document.querySelector(".difficulty");
    if (difficultyElement) {
        difficultyElement.style.display = "inline-block";
    }
}

// Alert for features under construction
function NotYet() {
    window.alert(
        "The game is under construction! Thank you for visiting us. Please return later."
    );
}

// Hide difficulty menu
function cancel() {
    const difficultyElement = document.querySelector(".difficulty");
    if (difficultyElement) {
        difficultyElement.style.display = "none";
    }
}

// Play sound effect at a specific start time
function playsoundeffect() {
    const soundeffect = document.getElementById("audio");
    if (soundeffect) {
        const starttime = 4.13;
        soundeffect.currentTime = starttime;
        soundeffect.play().catch((err) => {
            console.log("Cannot play sound yet:", err);
        });
    }
}

// Play background audio with click fallback
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-audio");
    if (audio) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Autoplay failed: ", error);
                document.body.addEventListener(
                    "click",
                    () => {
                        audio.play().catch((err) => {
                            console.log("Audio still cannot play:", err);
                        });
                    },
                    { once: true }
                );
            });
        }
    }
});
