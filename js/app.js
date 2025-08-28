import { login} from "./auth.js";
import { graphqlQuery, USER_QUERY, XP_QUERY, AUDIT_QUERY, SKILLS_QUERY } from "./graphql.js";
import { showLoginError, toggleView, setUserLogin, setXP, setAudit } from "./ui.js";
import { renderXPGraph, renderAuditGraph, renderSkillsGraph } from "./charts.js";

document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    await login(username, password);
    await loadProfile();
  } catch (err) {
    showLoginError(err.message);
  }
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await logout();
  toggleView(false);
});

async function loadProfile() {
  toggleView(true);

  // User
  const user = await graphqlQuery(USER_QUERY);
  setUserLogin(user.user[0].login);

  // XP
  const xp = await graphqlQuery(XP_QUERY);
  const total = xp.transaction.reduce((sum, t) => sum + t.amount, 0);
  setXP(total);
  renderXPGraph(xp.transaction.slice(0, 20)); // show 20 last

  // Audit
  const audit = await graphqlQuery(AUDIT_QUERY);
  setAudit(audit.user[0].auditRatio);
  renderAuditGraph(audit.user[0].auditRatio);

  // Skills
  const skillsRes = await graphqlQuery(SKILLS_QUERY);
  const skills = {};
  skillsRes.transaction.forEach(t => {
    const skill = t.path.split("/").pop();
    skills[skill] = (skills[skill] || 0) + t.amount;
  });
  renderSkillsGraph(skills);
}
