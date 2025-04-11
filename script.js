const dialogues = [
  "Oh hello 👽! Tum wahi ho na jinke liye mujhe itna ready hona pada?",
  "Mere master ne mujhe bola tum special ho... exaggeration laga mujhe!",
  "Lekin tumhe dekhke lagta hai... thoda hi sahi, par sach bola unhone 😏",
  "Ab chalein? Countdown shuru karein?"
];

const dialogueText = document.getElementById("dialogueText");
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const countdownDisplay = document.getElementById("countdown");
const finalWish = document.getElementById("finalWish");
const rocket = document.querySelector(".rocket-container");
const alien = document.querySelector(".alien-container");
const emojiContainer = document.querySelector(".floating-emojis");

let dialogueIndex = 0;

// Typing effect for dialogues
function typeDialogue(text, i = 0, callback) {
  if (i < text.length) {
    dialogueText.innerHTML += text.charAt(i);
    setTimeout(() => typeDialogue(text, i + 1, callback), 40);
  } else {
    setTimeout(callback, 1000);
  }
}

// Play all dialogues in sequence
function playDialogues() {
  if (dialogueIndex < dialogues.length) {
    dialogueText.innerHTML = "";
    typeDialogue(dialogues[dialogueIndex], 0, () => {
      dialogueIndex++;
      playDialogues();
    });
  } else {
    shiftAlien();
  }
}

// Move alien up to make room for message
function shiftAlien() {
  alien.style.bottom = "42%"; // New position after dialogues
  setTimeout(() => {
    startButton.style.opacity = 1;
    rocket.style.transition = "bottom 1.5s ease";
    rocket.style.bottom = "-5%";
  }, 1000);
}

// Countdown Button
startButton.addEventListener("click", () => {
  startButton.style.opacity = 0;
  startCountdown();
});

// Countdown Logic
function startCountdown() {
  let count = 5;
  countdownDisplay.style.display = "block";
  const interval = setInterval(() => {
    countdownDisplay.textContent = count;
    count--;
    if (count < 0) {
      clearInterval(interval);
      countdownDisplay.style.display = "none";
      launchRocket();
    }
  }, 1000);
}

// Rocket Launch
function launchRocket() {
  rocket.style.transition = "bottom 2s ease";
  rocket.style.bottom = "80%"; // goes a bit above black line
  setTimeout(() => {
    rocket.style.display = "none";
    confettiBlast();
    finalWish.style.opacity = 1;
    setTimeout(() => {
      nextButton.style.opacity = 1;
    }, 2000);
  }, 2500);
}

// Confetti
function confettiBlast() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// Emoji Floater
function createFloatingEmojis() {
  const emojis = ["💖", "💫", "🌟", "🪐", "✨", "💕"];
  for (let i = 0; i < 25; i++) {
    const emoji = document.createElement("div");
    emoji.className = "floating-emoji";
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.animationDuration = `${4 + Math.random() * 3}s`;
    emoji.style.animationDelay = `${Math.random() * 3}s`;
    emojiContainer.appendChild(emoji);

    // Remove after float
    setTimeout(() => emoji.remove(), 8000);
  }
}

playDialogues();
createFloatingEmojis();
