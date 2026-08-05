/**
 * Self-hosting page behavior. Minimal: fill the year, toggle the mobile menu,
 * and wire copy buttons on code blocks. No scroll-hidden content, no gimmicks.
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
  });
})();
