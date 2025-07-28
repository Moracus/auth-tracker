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
  const oauthProviders = {
    "accounts.google.com": "Google",
    "facebook.com/dialog": "Facebook",
    "github.com/login/oauth": "GitHub",
    "login.microsoftonline.com": "Microsoft",
  };

  const href = e.target.closest("a")?.href || "";
  for (const [pattern, provider] of Object.entries(oauthProviders)) {
    if (href.includes(pattern)) {
      fetch("http://localhost:5000/track-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: window.location.hostname,
          loginMethod: "oauth",
          credential: provider,
        }),
      });
    }
  }
});
