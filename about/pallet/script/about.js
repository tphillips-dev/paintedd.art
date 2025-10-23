document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const elements = {
    cards: document.querySelectorAll(".about-card"),
    attributes: document.querySelectorAll(".attribute"),
  };

  // Initialize with random question
  function setRandomQuestion() {}

  setRandomQuestion();

  // Trigger animations
  elements.cards.forEach((card) => {
    card.classList.add("loaded");
  });

  setTimeout(() => {
    elements.attributes.forEach((attr) => {
      attr.classList.add("loaded");
    });
  }, 300);
});
