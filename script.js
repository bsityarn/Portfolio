document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Light / Dark Theme Toggle with localStorage Persistence
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  htmlEl.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    htmlEl.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  }

  // 3. Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // 4. Interactive Project Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 5. Copy Email Button Feedback
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = "marc_lesley_quizon@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = "Copied!";
        setTimeout(() => {
          copyEmailBtn.textContent = "Copy Email";
        }, 2000);
      } catch {
        copyEmailBtn.textContent = "marc_lesley_quizon@gmail.com";
      }
    });
  }

  // 6. Scroll-Reveal Animation & Active Navigation Highlight
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});