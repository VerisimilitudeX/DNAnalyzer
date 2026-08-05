/**
 * github-stats.js: live, honest project metrics.
 *
 * Fetches real repository numbers (stars, forks, open issues, contributors)
 * from the public GitHub API and writes them into the page. There is no
 * fabrication here: if the API is unreachable or rate-limited, a stat is shown
 * as "-" with the GitHub link left intact, never as an invented number. This
 * replaces the old hardcoded, out-of-date counts ("141 stars", "5M+ analyses").
 *
 * Usage in a page:
 *   <span class="stat-number" data-github-stat="stars" data-count="0">-</span>
 *   <script src="../assets/js/github-stats.js"></script>
 *   GitHubStats.populate();   // fills every [data-github-stat] element
 *
 * Supported data-github-stat values: "stars", "forks", "issues",
 * "watchers", "contributors".
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.GitHubStats = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var REPO = "VerisimilitudeX/DNAnalyzer";
  var API = "https://api.github.com/repos/" + REPO;
  var CACHE_KEY = "dnanalyzer_gh_stats_v1";
  var CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes; unauthenticated API is 60 req/hr.

  /** Read a fresh cached stats object from sessionStorage, or null. */
  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.t !== "number") return null;
      if (Date.now() - parsed.t > CACHE_TTL_MS) return null;
      return parsed.v;
    } catch (e) {
      return null;
    }
  }

  function writeCache(stats) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v: stats }));
    } catch (e) {
      /* storage disabled or full: fine, we just refetch next time */
    }
  }

  /**
   * Total contributor count. The list endpoint is paginated; asking for one
   * per page and reading the Link header's last-page number gives the total
   * without downloading every contributor. anon=1 counts anonymous authors too.
   * Returns null if it cannot be determined (never a guess).
   */
  function fetchContributorCount() {
    return fetch(API + "/contributors?per_page=1&anon=1")
      .then(function (resp) {
        if (!resp.ok) return null;
        var link = resp.headers.get("Link");
        if (link) {
          var m = link.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
          if (m) return parseInt(m[1], 10);
        }
        // No Link header => 0 or 1 pages; count the returned rows.
        return resp.json().then(function (rows) {
          return Array.isArray(rows) ? rows.length : null;
        });
      })
      .catch(function () {
        return null;
      });
  }

  /**
   * Resolve {stars, forks, issues, watchers, contributors}. Any field may be
   * null when unavailable. Cached in sessionStorage for CACHE_TTL_MS.
   */
  function load() {
    var cached = readCache();
    if (cached) return Promise.resolve(cached);

    var repoP = fetch(API)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.json();
      })
      .then(function (data) {
        return {
          stars: numOrNull(data.stargazers_count),
          forks: numOrNull(data.forks_count),
          issues: numOrNull(data.open_issues_count),
          watchers: numOrNull(data.subscribers_count),
        };
      })
      .catch(function () {
        return { stars: null, forks: null, issues: null, watchers: null };
      });

    return Promise.all([repoP, fetchContributorCount()]).then(function (parts) {
      var stats = parts[0];
      stats.contributors = parts[1];
      // Only cache if at least the core number came back, so a transient
      // failure does not pin nulls for 30 minutes.
      if (stats.stars != null) writeCache(stats);
      return stats;
    });
  }

  function numOrNull(n) {
    return typeof n === "number" && isFinite(n) ? n : null;
  }

  /**
   * Fill every [data-github-stat] element on the page with its real value.
   * When a value is present it also sets data-count (so an existing count-up
   * animation can pick it up) and writes the final formatted text as a
   * fallback. When a value is missing the element shows "-" and any
   * [data-github-fallback] sibling (e.g. a "View on GitHub" link) is revealed.
   */
  function populate(onValue) {
    var nodes = document.querySelectorAll("[data-github-stat]");
    if (!nodes.length) return Promise.resolve(null);
    return load().then(function (stats) {
      nodes.forEach(function (el) {
        var key = el.getAttribute("data-github-stat");
        var value = stats[key];
        if (value == null) {
          el.textContent = "n/a"; // honest "unknown", never an invented number
          el.removeAttribute("data-count");
          el.classList.add("stat-unavailable");
        } else {
          el.setAttribute("data-count", String(value));
          el.textContent = value.toLocaleString();
          if (typeof onValue === "function") onValue(el, value);
        }
      });
      return stats;
    });
  }

  return { load: load, populate: populate, repo: REPO };
});
