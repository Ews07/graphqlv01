export async function login(username, password) {
  const credentials = btoa(`${username}:${password}`);
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    credentials: "include",
  });

  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
}
