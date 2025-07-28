const backendUrl = import.meta.env.VITE_BACKENDURL;

document.addEventListener("submit", (e) => {
  const email = document.querySelector('input[type="email"]')?.value;
  if (email) {
    fetch(`${backendUrl}/track-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain: window.location.hostname,
        loginMethod: "email",
        credential: email,
      }),
    });
  }
});

document.addEventListener("click", (e) => {
  checkForOAuthIframes();
  const oauthProviders = {
    "accounts.google.com": "Google",
    "facebook.com/dialog": "Facebook",
    "github.com/login/oauth": "GitHub",
    "login.microsoftonline.com": "Microsoft",
  };

  const el = e.target.closest("a, button, div, iframe");
  if (!el) return;

  // Check href or data-href or onclick script
  const href =
    el.href ||
    el.getAttribute("data-href") ||
    el.getAttribute("onclick") ||
    el.getAttribute("src") ||
    "";

  // Also check text content as a fallback
  const text = el.textContent?.toLowerCase() || "";

  for (const [pattern, provider] of Object.entries(oauthProviders)) {
    if (
      href.includes(pattern) ||
      text.includes(`sign in with ${provider.toLowerCase()}`) ||
      text.includes(`continue with ${provider.toLowerCase()}`)
    ) {
      fetch(`${backendUrl}/track-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: window.location.hostname,
          loginMethod: "oauth",
          credential: provider,
        }),
      });
      break; // stop after first match
    }
  }
});

function checkForOAuthIframes() {
  const iframes = document.getElementsByTagName("iframe");

  for (const iframe of iframes) {
    const src = iframe.src || "";

    const oauthPatterns = {
      "accounts.google.com": "Google",
      "facebook.com/dialog": "Facebook",
      "github.com/login/oauth": "GitHub",
      "login.microsoftonline.com": "Microsoft",
    };

    for (const [pattern, provider] of Object.entries(oauthPatterns)) {
      if (src.includes(pattern)) {
        fetch(`${backendUrl}/track-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            domain: window.location.hostname,
            loginMethod: "oauth",
            credential: provider,
          }),
        });
        break;
      }
    }
  }
}
