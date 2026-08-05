/**
 * Documentation page behavior. Minimal and safe: fill the year, toggle the
 * mobile menu, wire copy buttons, FAQ accordions, sidebar active-link tracking,
 * and a simple section filter. Content is always visible by default; the filter
 * only hides non-matching sections while typing and restores them when cleared.
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

    // Copy buttons
    document.querySelectorAll(".copy-button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        if (!text) {
          var block = btn.closest(".code-block");
          var code = block && block.querySelector("code");
          text = code ? code.textContent : "";
        }
        navigator.clipboard.writeText(text).then(function () {
          var original = btn.textContent;
          btn.textContent = "Copied";
          btn.classList.add("success");
          setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove("success");
          }, 1600);
        });
      });
    });

    // FAQ accordions
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-question");
      if (!q) return;
      q.addEventListener("click", function () {
        item.classList.toggle("active");
      });
    });

    // Sidebar active-link tracking
    var sections = Array.prototype.slice.call(document.querySelectorAll(".doc-section"));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".sidebar-nav a"));
    function updateActive() {
      var current = "";
      var offset = 100;
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - offset) {
          current = "#" + section.id;
        }
      });
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === current);
      });
    }
    if (sections.length && navLinks.length) {
      updateActive();
      window.addEventListener("scroll", updateActive, { passive: true });
    }

    // Section filter: hides non-matching sections while typing; restores on clear.
    var search = document.getElementById("docsSearch");
    if (search) {
      search.addEventListener("input", function () {
        var q = this.value.trim().toLowerCase();
        sections.forEach(function (section) {
          if (q.length < 2) {
            section.style.display = "";
          } else {
            section.style.display = section.textContent.toLowerCase().indexOf(q) !== -1 ? "" : "none";
          }
        });
      });
    }
  });
})();
