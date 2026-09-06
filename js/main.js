// A single orchestrated moment on arrival: the hero text reveals
// line by line, as if being read aloud.

document.addEventListener("DOMContentLoaded", () => {
  const heroLines = document.querySelectorAll("#hero [data-reveal]");

  gsap.to(heroLines, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.18,
    delay: 0.2,
  });

  const otherLines = document.querySelectorAll(".section [data-reveal]");

  gsap.to(otherLines, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.15,
  });
});


// "Tilt" effect: cards subtly tilt to follow the cursor
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Mentor popup: content + gallery per person
const mentorData = {
  dawne: {
    name: "Danwe Stéphane",
    bio: "Entrepreneur, communication strategist, and community leader. Started as Campus Director of the Hult Prize at the University of Maroua before being promoted to National Co-coordinator of Hult Prize Cameroon, where he oversees the country's inter-university competitions. Trained in marketing at The ICT University, he collaborates with the '10 000 Codeurs' organization and offers free public speaking and pitching training to young people.",
    photos: ["assets/images/dawne.jpg", "assets/images/stephane.jpeg"]
  },
  jerry: {
    name: "Jerry Davis Ndjana Mengue",
    bio: "Engineer, entrepreneur, and tech community builder. Chief Operating Officer at Hinkaku, where he helped build the NKWEL app. Official organizer of GDG Yaoundé and lead of the AWS Student Builder group at Saint Jean University Institute. Former Hult Prize Campus Director, and champion of the AIDEAS 2025 competition.",
    photos: ["assets/images/jerry.jpg", "assets/images/jerry2.jpeg"]
  },
  cabrel: {
    name: "Cabrel Domfang",
    bio: "Tech evangelist and event organizer at the University of Yaoundé I. Founder of Tech Communities Day Cameroon and the ICT4D Hackathon, former GDSC Lead and vice-president of COMSAS. Served as Campus Director for the Hult Prize and has organized more than 25 major tech events in Cameroon.",
    photos: ["assets/images/cabrel.jpeg", "assets/images/cabrel2.jpeg"]
  }
};

const modal = document.getElementById("mentor-modal");
const modalGallery = document.getElementById("modal-gallery");
const modalName = document.getElementById("modal-name");
const modalBio = document.getElementById("modal-bio");

document.querySelectorAll(".mentor").forEach((btn) => {
  btn.addEventListener("click", () => {
    const data = mentorData[btn.dataset.mentor];
    modalName.textContent = data.name;
    modalBio.textContent = data.bio;
    modalGallery.innerHTML = data.photos
      .map((src) => `<img src="${src}" alt="${data.name}">`)
      .join("");
    modal.classList.add("is-open");
  });
});

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => modal.classList.remove("is-open"));
});

// Lightbox: enlarge any photo-card on click/tap
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

document.querySelectorAll(".photo-card").forEach((card) => {
  const img = card.querySelector("img");
  const caption = card.querySelector("figcaption");

  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";
    lightbox.classList.add("is-open");
  });
});

document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
  el.addEventListener("click", () => lightbox.classList.remove("is-open"));
});

// Hero particles + snowflakes
const canvas = document.getElementById("hero-particles");
const ctx = canvas.getContext("2d");
const heroSection = document.getElementById("hero");

let particles = [];
let snowflakes = [];
let mouse = { x: null, y: null, active: false };

function resizeCanvas() {
  canvas.width = heroSection.offsetWidth;
  canvas.height = heroSection.offsetHeight;
}

function createParticles() {
  particles = [];
  const count = 55;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 2.5,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 60 + 20,
    });
  }
}

function createSnowflakes() {
  snowflakes = [];
  const count = 40;
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2,
      speed: Math.random() * 0.5 + 0.3,
      sway: Math.random() * 1.2,
      swayOffset: Math.random() * Math.PI * 2,
    });
  }
}

// Lower area of the hero where the background fades to light (--paper):
// particles change color there
function colorForY(y) {
  const fadeStart = canvas.height * 0.65;
  if (y < fadeStart) return "rgba(255, 253, 248, 0.9)"; // white
  return "rgba(59, 42, 32, 0.85)"; // coffee brown
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Floating points, gently pulled toward the cursor ("gravity" effect)
  particles.forEach((p) => {
    // Base drift, always active
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.active) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const maxDist = 260; // cursor influence radius

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 0.06;
        p.x += dx * force;
        p.y += dy * force;
      }
    }

    ctx.fillStyle = colorForY(p.y);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Falling snowflakes, independent of the cursor
  snowflakes.forEach((f) => {
    f.y += f.speed;
    f.x += Math.sin(f.y * 0.02 + f.swayOffset) * f.sway * 0.3;

    if (f.y > canvas.height) {
      f.y = -10;
      f.x = Math.random() * canvas.width;
    }

    ctx.fillStyle = colorForY(f.y);
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
createSnowflakes();
animateParticles();