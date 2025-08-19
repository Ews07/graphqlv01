// Simple XP bar graph
export function renderXPGraph(data) {
  const svg = `<svg viewBox="0 0 500 100">
    ${data.map((d, i) => {
      const x = i * 20;
      const h = d.amount / 50; // scale
      return `<rect x="${x}" y="${100-h}" width="15" height="${h}" fill="steelblue"/>`;
    }).join("")}
  </svg>`;
  document.getElementById("xp-graph").innerHTML = svg;
}

// Audit ratio pie chart
export function renderAuditGraph(ratio) {
  const pass = ratio / (ratio+1);
  const fail = 1 - pass;
  const svg = `<svg viewBox="0 0 100 100">
    <circle r="40" cx="50" cy="50" fill="tomato"
      stroke="green" stroke-dasharray="${pass*251} ${fail*251}" stroke-width="40"
      transform="rotate(-90 50 50)"/>
  </svg>`;
  document.getElementById("audit-graph").innerHTML = svg;
}

// Skills radar (star shape)
export function renderSkillsGraph(skills) {
  const keys = Object.keys(skills);
  const step = (2 * Math.PI) / keys.length;
  const radius = 40;

  const points = keys.map((key, i) => {
    const val = skills[key];
    const angle = i * step - Math.PI/2;
    const r = radius * (val/100);
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  }).join(" ");

  const svg = `<svg viewBox="0 0 100 100">
    <polygon points="${points}" fill="rgba(0,128,255,0.4)" stroke="blue"/>
  </svg>`;
  document.getElementById("skills-graph").innerHTML = svg;
}
