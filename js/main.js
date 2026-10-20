// WebDesk — landing page interactions

const NAME = "Julie";
const GREETING = `Hi, I'm ${NAME} 👋`;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const welcome = document.getElementById("welcome");
const taskWelcome = document.getElementById("taskWelcome");
const typed = document.getElementById("typed");
const intro = document.getElementById("intro");
const toast = document.getElementById("toast");
const clock = document.getElementById("clock");

/* ---------- Typewriter greeting ---------- */

function typeGreeting(text, el, done) {
  // Array.from keeps emoji as a single character
  const chars = Array.from(text);

  if (prefersReducedMotion) {
    el.textContent = text;
    done();
    return;
  }

  let i = 0;
  const tick = () => {
    el.textContent = chars.slice(0, ++i).join("");
    if (i < chars.length) {
      setTimeout(tick, 60 + Math.random() * 60);
    } else {
      done();
    }
  };
  setTimeout(tick, 500);
}

typeGreeting(GREETING, typed, () => intro.classList.add("isVisible"));

/* ---------- Toast ---------- */

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("isVisible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("isVisible"), 2600);
}

/* ---------- Clock ---------- */

function updateClock() {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

updateClock();
setInterval(updateClock, 10_000);

/* ---------- Window controls ---------- */

function setWindowOpen(open) {
  welcome.classList.toggle("isHidden", !open);
  taskWelcome.setAttribute("aria-pressed", String(open));
}

welcome.addEventListener("click", (e) => {
  const action = e.target.dataset.action;

  if (action === "close") {
    setWindowOpen(false);
    showToast("Minimized! Click welcome.txt in the taskbar to bring it back.");
  } else if (action === "wiggle") {
    welcome.classList.remove("isWiggling");
    void welcome.offsetWidth; // restart the animation
    welcome.classList.add("isWiggling");
    showToast("Full screen is coming in v2 😅");
  }
});

taskWelcome.addEventListener("click", () => {
  setWindowOpen(welcome.classList.contains("isHidden"));
});

/* ---------- Dragging ---------- */

const handle = welcome.querySelector("[data-drag-handle]");

handle.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button")) return;

  const rect = welcome.getBoundingClientRect();
  const desktop = welcome.parentElement.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  // Switch from centered positioning to explicit coordinates
  welcome.classList.add("isDragged");
  welcome.style.left = `${rect.left - desktop.left}px`;
  welcome.style.top = `${rect.top - desktop.top}px`;
  welcome.style.bottom = "auto";

  handle.setPointerCapture(e.pointerId);

  const onMove = (ev) => {
    const maxX = desktop.width - rect.width;
    const maxY = desktop.height - handle.offsetHeight;
    const x = Math.min(Math.max(ev.clientX - desktop.left - offsetX, 0), maxX);
    const y = Math.min(Math.max(ev.clientY - desktop.top - offsetY, 0), maxY);
    welcome.style.left = `${x}px`;
    welcome.style.top = `${y}px`;
  };

  const onUp = () => {
    handle.removeEventListener("pointermove", onMove);
    handle.removeEventListener("pointerup", onUp);
    handle.removeEventListener("pointercancel", onUp);
  };

  handle.addEventListener("pointermove", onMove);
  handle.addEventListener("pointerup", onUp);
  handle.addEventListener("pointercancel", onUp);
});

/* ---------- Desktop icons ---------- */

const icons = document.querySelectorAll(".icon");

const iconMessages = {
  Projects: "📁 The Projects folder is being furnished. Come back soon!",
  "About me": "📄 about-me.txt is still being written…",
  Contact: "✉️ Contact window coming soon.",
  Trash: "🗑️ The trash is empty. I keep a tidy desk.",
};

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icons.forEach((i) => i.classList.remove("isSelected"));
    icon.classList.add("isSelected");
    showToast(iconMessages[icon.dataset.name]);
  });
});

/* ---------- Buttons ---------- */

document.getElementById("enter").addEventListener("click", () => {
  setWindowOpen(false);
  showToast("Welcome to the desktop! Try clicking the icons 👈");
});

document.getElementById("hi").addEventListener("click", () => {
  const replies = ["Hi back! 👋", "Oh hello there!", "Hey! Nice to meet you ✨", "*waves enthusiastically*"];
  showToast(replies[Math.floor(Math.random() * replies.length)]);
});
