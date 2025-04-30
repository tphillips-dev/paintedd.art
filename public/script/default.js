document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Mobile Menu Functionality
  // =====================
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".grunge-nav");

  // Initialize menu state
  if (menuToggle && nav) {
    nav.classList.remove("nav-active");
    menuToggle.classList.remove("active");

    // Toggle menu with proper propagation handling
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("nav-active");
      menuToggle.classList.toggle("active");
    });

    // Close menu on click outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("nav-active");
        menuToggle.classList.remove("active");
      }
    });
  }

  // =====================
  // Font Load Fix
  // =====================
  document.body.style.visibility = "hidden";
  const fontLoadTimeout = setTimeout(() => {
    document.body.style.visibility = "visible";
  }, 1000);

  document.fonts.ready.then(() => {
    clearTimeout(fontLoadTimeout);
    document.body.style.visibility = "visible";
  });

  // =====================
  // Smooth Scroll Functionality
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        if (nav) nav.classList.remove("nav-active");
        if (menuToggle) menuToggle.classList.remove("active");
      }
    });
  });

  // =====================
  // Scroll Indicator Logic
  // =====================
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    let lastScrollPos = 0;

    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > lastScrollPos) {
        // Scrolling down
        scrollIndicator.style.transition = "opacity 0.5s";
        scrollIndicator.style.opacity = "0";
      } else if (currentScrollPos === 0) {
        // Scrolled to the top
        scrollIndicator.style.transition = "opacity 0.5s";
        scrollIndicator.style.opacity = "1";
      }
      lastScrollPos = currentScrollPos;
    });
  }

  // =====================
  // Dynamic Content Loading
  // =====================
  fetch("public/data/content.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      // Load Manifesto
      const manifestoContainer = document.getElementById("manifesto-content");
      if (manifestoContainer && data.manifesto) {
        manifestoContainer.innerHTML = `
          <h2>${data.manifesto.title}</h2>
          <p>${data.manifesto.content}</p>
        `;
      }

      // Load Art Collections
      const artCollectionsContainer =
        document.getElementById("art-collections");
      if (artCollectionsContainer && data.artCollections) {
        artCollectionsContainer.innerHTML = data.artCollections
          .map(
            (collection) => `
          <div class="collection-card">
            <img src="${collection.image}" alt="${collection.title}" class="collection-image">
            <div class="collection-info">
              <h3>${collection.title}</h3>
              <p>${collection.description}</p>
            </div>
          </div>
        `
          )
          .join("");
      }

      // Load Stream Schedule
      const scheduleContainer = document.getElementById("stream-schedule");
      if (scheduleContainer && data.liveStreamSchedule) {
        scheduleContainer.innerHTML = data.liveStreamSchedule
          .map(
            (event) => `
          <div class="schedule-item">
            <h3>${event.title}</h3>
            <p class="event-time">${event.time} @ ${event.platform}</p>
            <p>${event.description}</p>
          </div>
        `
          )
          .join("");
      }

      // Load FAQ
      const faqContainer = document.getElementById("faq-content");
      if (faqContainer && data.faq) {
        faqContainer.innerHTML = data.faq
          .map(
            (item) => `
          <div class="faq-item">
            <div class="faq-question">${item.question}</div>
            <div class="faq-answer">${item.answer}</div>
          </div>
        `
          )
          .join("");

        // Add FAQ toggle functionality
        document.querySelectorAll(".faq-question").forEach((question) => {
          question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            answer.style.display =
              answer.style.display === "block" ? "none" : "block";
          });
        });
      }

      // Load Community Guidelines
      const guidelinesContainer = document.getElementById(
        "community-guidelines"
      );
      if (guidelinesContainer && data.communityGuidelines) {
        guidelinesContainer.innerHTML = `
          <h3>${data.communityGuidelines.title}</h3>
          <ul class="code-list">
            ${data.communityGuidelines.rules
              .map(
                (rule) => `
              <li>${rule}</li>
            `
              )
              .join("")}
          </ul>
        `;
      }

      // Load Social Links
      const socialContainer = document.getElementById("social-container");
      if (socialContainer && data.socials) {
        socialContainer.innerHTML = data.socials
          .map(
            (social) => `
          <a href="${social.url}" 
             class="social-link" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-label="${social.icon.replace("fab fa-", "")}">
            <i class="${social.icon}"></i>
          </a>
        `
          )
          .join("");
      }

      // Set SEO Content
      if (data.seo) {
        document.title = data.seo.pageTitles.home || document.title;
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.content =
            data.seo.metaDescriptions.home || metaDescription.content;
        }
      }
    })
    .catch((error) => {
      console.error("Failed to load content:", error);
    });

  // =====================
  // Fire Effects
  // =====================
  function createEmbers() {
    const embersContainer = document.getElementById("embers");
    if (!embersContainer) return;

    const emberCount = window.innerWidth > 768 ? 30 : 15;
    for (let i = 0; i < emberCount; i++) {
      const ember = document.createElement("div");
      ember.className = "ember";
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.animationDelay = `${Math.random() * 8}s`;
      ember.style.opacity = Math.random() * 0.7;
      embersContainer.appendChild(ember);
    }
  }

  function addSmokeEffect() {
    const countdownSection = document.querySelector(".urgency-section");
    if (countdownSection) {
      const smoke = document.createElement("div");
      smoke.className = "smoke-effect";
      countdownSection.appendChild(smoke);
    }
  }

  // Initialize fire effects
  createEmbers();
  addSmokeEffect();

  // Reduced motion preference
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reducedMotion) {
    document
      .querySelectorAll(".ember, .burning-canvas::before")
      .forEach((el) => {
        el.style.animation = "none";
      });
  }

  // =====================
  // Artistic Randomization
  // =====================
//   document.querySelectorAll(".nav-item").forEach((item) => {
//     const rotation = Math.random() * 10 - 5; // -5° to +5°
//     item.style.transform = `rotate(${rotation}deg)`;
//   });
});
