/**
 * Homepage behavior. Deliberately minimal: fill the year, toggle the mobile
 * menu, and load real GitHub stats. No scroll-hidden content, no gimmicks.
 * The page-load reveal is CSS-only and always ends visible.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") links.classList.remove("open");
      });
    }

    if (window.GitHubStats) window.GitHubStats.populate();
  });
})();
