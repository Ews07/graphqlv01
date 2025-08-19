export function showLoginError(msg) {
  document.getElementById("login-error").innerText = msg;
}

export function toggleView(isLoggedIn) {
  document.getElementById("login-section").classList.toggle("hidden", isLoggedIn);
  document.getElementById("profile-section").classList.toggle("hidden", !isLoggedIn);
}

export function setUserLogin(login) {
  document.getElementById("user-login").innerText = login;
}

export function setXP(xpTotal) {
  document.getElementById("xp-total").innerText = xpTotal;
}

export function setAudit(ratio) {
  document.getElementById("audit-ratio").innerText = ratio.toFixed(2);
}
