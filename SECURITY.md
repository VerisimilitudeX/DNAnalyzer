# Security Policy

## Supported Versions

Security fixes are applied to the latest released minor version. Older releases
receive patches only when the fix is trivial to backport.

| Version      | Supported          |
|--------------|--------------------|
| 3.6.x        | :white_check_mark: |
| 3.5.x        | :white_check_mark: |
| < 3.5        | :x:                |

## Reporting a Vulnerability

Please **do not** open a public GitHub issue or Discord message for security
reports. Use one of the private channels below so we can investigate and
release a fix before the details are disclosed.

1. **Preferred — GitHub private vulnerability reporting:** open a report at
   <https://github.com/VerisimilitudeX/DNAnalyzer/security/advisories/new>.
   This creates a private advisory visible only to maintainers.
2. **Email:** send details to `help@dnanalyzer.org` with the subject line
   `SECURITY:` followed by a short summary.

Include in your report:

- A description of the vulnerability and the impact you believe it has.
- Steps to reproduce (a minimal proof-of-concept is ideal).
- The version or commit you observed the issue on.
- Any suggested mitigation, if you have one.

### What to expect

- **Acknowledgement:** within 3 business days.
- **Triage and severity assessment:** within 7 business days.
- **Fix and coordinated disclosure:** we aim to release a patch within 30 days
  for high-severity issues and 90 days for low/medium severity, depending on
  complexity. You will be credited in the advisory unless you request
  otherwise.

## Scope

This policy covers the code in this repository: the Java analyzer, REST API,
JavaFX GUI, Python Smith-Waterman module, and supporting web dashboard.
Vulnerabilities in upstream dependencies should be reported to those projects
directly; please contact us only if the issue is how we integrate the
dependency.

## Hardening measures

This project uses several automated security controls:

- **CodeQL** static analysis on every push and weekly schedule
  (`.github/workflows/codeql.yml`).
- **DeepSource** Java and Python analysis on every pull request.
- **Dependabot** weekly dependency updates for Gradle, pip, Docker, and GitHub
  Actions (`.github/dependabot.yml`).
- **OpenSSF Scorecard** weekly supply-chain health check
  (`.github/workflows/scorecard.yml`), with results published to the GitHub
  Security tab.
- **GitGuardian** secret scanning on every commit.
- **Pinned GitHub Actions** (by commit SHA) in security-sensitive workflows to
  defend against tag hijack.

## Out of scope

- Vulnerabilities that require physical access to a user's device.
- Social-engineering attacks that do not exploit a flaw in our code.
- Denial of service caused by deliberately malformed user-supplied FASTA input
  of unbounded size. Users running the REST API publicly should place it behind
  a gateway enforcing request-size and rate limits.

## Safe harbor

We will not pursue legal action against researchers who act in good faith,
follow this policy, avoid privacy violations and service degradation, and give
us a reasonable window to remediate before publishing. If a legal authority
contacts us about your research, we will advocate for you within the limits of
the law.
