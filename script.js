const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");

menuBtn.addEventListener("click", () => navMenu.classList.toggle("show"));

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("show"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

year.textContent = new Date().getFullYear();
