export async function graphqlQuery(query, variables = {}) {
  const response = await fetch("/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error("GraphQL query failed");
  return response.json();
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
