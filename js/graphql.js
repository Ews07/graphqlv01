const GQL_ENDPOINT = "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql";

export async function graphqlQuery(query, variables = {}) {
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send JWT cookie
    body: JSON.stringify({ query, variables })
  });

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// Queries
export const USER_QUERY = `
  { user { id login } }
`;

export const XP_QUERY = `
  { transaction(where: { type: { _eq: "xp" }}) {
      amount createdAt
    }
  }
`;

export const AUDIT_QUERY = `
  {
    user {
      auditRatio
    }
  }
`;

export const SKILLS_QUERY = `
  {
    transaction(where: { type: { _eq: "skill" }}) {
      type amount path
    }
  }
`;
