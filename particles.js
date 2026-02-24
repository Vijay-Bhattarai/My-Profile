// 3D Animated Particle Background
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const PARTICLE_COUNT = 110;
  const MAX_DIST = 140;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.z = Math.random() * 400 + 50; // depth
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.vz = (Math.random() - 0.5) * 0.6;
      this.baseSize = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
      if (this.z < 50 || this.z > 450) this.vz *= -1;
    }
    get screenX() { return this.x; }
    get screenY() { return this.y; }
    get scale()   { return 400 / (400 + this.z); }
    get size()    { return this.baseSize * this.scale * 1.5; }
    get alpha()   { return 0.15 + 0.55 * this.scale; }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Mouse parallax
  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function dist(a, b) {
    const dx = a.screenX - b.screenX;
    const dy = a.screenY - b.screenY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Parallax shift based on mouse
    const shiftX = (mouseX - W / 2) * 0.015;
    const shiftY = (mouseY - H / 2) * 0.015;

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = dist(particles[i], particles[j]);
        if (d < MAX_DIST) {
          const opacity = (1 - d / MAX_DIST) * 0.18;
          const avgScale = (particles[i].scale + particles[j].scale) / 2;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(64, 196, 148, ${opacity * avgScale})`;
          ctx.lineWidth = 0.6 * avgScale;
          ctx.moveTo(particles[i].screenX + shiftX, particles[i].screenY + shiftY);
          ctx.lineTo(particles[j].screenX + shiftX, particles[j].screenY + shiftY);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.screenX + shiftX, p.screenY + shiftY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(64, 196, 148, ${p.alpha})`;
      ctx.shadowBlur = 6 * p.scale;
      ctx.shadowColor = 'rgba(64, 196, 148, 0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;
      p.update();
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
