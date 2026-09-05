// Un seul moment orchestré à l'arrivée : le texte du hero se révèle
// ligne par ligne, comme si on te lisait à voix haute.

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


// Effet "tilt" : les cartes basculent légèrement en suivant le curseur
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

// Popup mentors : contenu + galerie par personne
const mentorData = {
  dawne: {
    name: "Danwe Stéphane",
    bio: "Entrepreneur, stratège en communication et leader associatif. A débuté comme Campus Director du Hult Prize à l'Université de Maroua avant d'être promu Co-coordinateur National de Hult Prize Cameroun, où il supervise les compétitions inter-universitaires du pays. Formé en marketing à The ICT University, il collabore avec l'organisation 10 000 Codeurs et forme gratuitement des jeunes à la prise de parole en public et au pitching.",
    photos: ["assets/images/dawne.jpg", "assets/images/dawne-2.jpg"]
  },
  jerry: {
    name: "Jerry Davis Ndjana Mengue",
    bio: "Ingénieur, entrepreneur et bâtisseur de communautés tech. Chief Operating Officer chez Hinkaku, où il a participé à la création de l'application NKWEL. Organisateur officiel du GDG Yaoundé et responsable du groupe AWS Student Builder au Cameroun. Ancien Campus Director du Hult Prize, et champion de la compétition AIDEAS 2025.",
    photos: ["assets/images/jerry.jpg", "assets/images/jerry-2.jpg"]
  },
  cabrel: {
    name: "Cabrel Domfang",
    bio: "Tech evangelist et organisateur d'événements à l'Université de Yaoundé I. Fondateur de la Tech Communities Day Cameroon et de l'ICT4D Hackathon, ancien Lead du GDSC et vice-président de la COMSAS. A été Campus Director pour le Hult Prize et a organisé plus de 25 événements technologiques majeurs au Cameroun.",
    photos: ["assets/images/cabrel.jpg", "assets/images/cabrel-2.jpg"]
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