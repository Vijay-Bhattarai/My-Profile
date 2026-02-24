// Hamburger menu
const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");

hamburger_menu.addEventListener("click", () => {
  container.classList.toggle("active");
});

// Typewriter effect (only on home page)
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const phrases = [
    'AI Engineer (in progress)',
    'Full Stack Developer',
    'Co-Founder @ Seto Pixel',
    'React.js & Python Builder',
    'CRM & Automation Expert',
    'Digital Marketing Specialist',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      typewriterEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typewriterEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 75);
  }

  setTimeout(type, 600);
}
