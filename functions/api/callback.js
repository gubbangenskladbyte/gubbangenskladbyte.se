const REDIRECT_URI = "https://gubbangenskladbyte.se/api/callback";
const CLEAR_COOKIE = "oauth_state=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/api";

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

function htmlResponse(body, status) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Set-Cookie": CLEAR_COOKIE,
    },
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = readCookie(request, "oauth_state");

  if (!code || !state || !cookieState || state !== cookieState) {
    return htmlResponse("Ogiltig eller saknad state — försök logga in igen.", 400);
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      `GitHub OAuth-fel: ${tokenData.error_description || tokenData.error || "okänt fel"}`,
      401
    );
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" }).replace(
    /'/g,
    "\\'"
  );

  const html = `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${payload}',
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;

  return htmlResponse(html, 200);
}
