document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("menuPanel");

  if (!toggle || !panel) return;

  function openMenu() {
    panel.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  function closeMenu() {
    panel.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  // Hamburger <-> X
  toggle.addEventListener("click", () => {
    panel.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  // Close when a link is clicked
  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close with the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
